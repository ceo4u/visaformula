import os
import sys
import json
import time
import psycopg2
from psycopg2.extras import Json
from google import genai
from google.genai import types

# Fix Windows console UTF-8 output
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

# Load .env if present
def load_env():
    try:
        env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
        if os.path.exists(env_path):
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        k, v = line.split("=", 1)
                        k = k.strip()
                        v = v.strip().strip('"').strip("'")
                        if k not in os.environ:
                            os.environ[k] = v
    except Exception as e:
        print(f"Notice: env loader {e}")

load_env()

# 1. Initialize Clients
api_key = (
    os.environ.get("GEMINI_API_KEY") or 
    os.environ.get("NEXT_PUBLIC_GEMINI_API_KEY") or 
    os.environ.get("PUBLIC_GEMINI_API_KEY") or 
    os.environ.get("GOOGLE_API_KEY")
)
if not api_key:
    raise ValueError("GEMINI_API_KEY / NEXT_PUBLIC_GEMINI_API_KEY is not set in environment or .env file.")

client = genai.Client(api_key=api_key)
DATABASE_URL = os.environ.get("DATABASE_URL")

# 2. Configure Origin and Destination Hubs
ORIGINS = ["India", "United States", "United Kingdom", "Canada", "Australia", "Germany", "United Arab Emirates"]
DESTINATIONS = [
    "United States", "India", "United Kingdom", "Greece", "Romania", 
    "Ethiopia", "Germany", "Canada", "Australia", "Japan", "United Arab Emirates"
]
PURPOSES = [
    "Tourism / Vacation", 
    "Higher Studies", 
    "Employment / Work", 
    "Permanent Residency (PR) / Immigration", 
    "Business Visit"
]

def sanitize_currency(text: str) -> str:
    """Replaces raw dollar signs to prevent KaTeX rendering crashes"""
    # Clean code blocks if present
    cleaned = text.strip()
    if cleaned.startswith("```json"):
        cleaned = cleaned[7:]
    elif cleaned.startswith("```"):
        cleaned = cleaned[3:]
    if cleaned.endswith("```"):
        cleaned = cleaned[:-3]
    cleaned = cleaned.strip()

    # Sanitize currency symbols to avoid LaTeX dollar math parsing
    return cleaned.replace("$$", "USD ").replace("$", "USD ")

def generate_grounded_payload(origin: str, destination: str, purpose: str) -> dict:
    """Agent 1: Live Web-Search Grounded Data Extraction"""
    prompt = f"""
    Search official immigration and consular sources in real-time:
    - Origin Passport Country: {origin}
    - Destination Country: {destination}
    - Purpose of Travel: {purpose}

    MANDATORY SEARCH & EXTRACTION DIRECTIVES:
    1. Search the official consular / visa portal of {destination} for {origin} passport holders.
    2. Determine the exact regime: 100% Online eVisa, Visa on Arrival, Schengen Visa, In-Person Consular Sticker, or Visa-Free.
    3. If eVisa (e.g. Ethiopia, Vietnam): NEVER include in-person VAC appointments or biometric fingerprinting. Provide the official URL (e.g., evisa.gov.et).
    4. If Schengen (e.g. Greece, Romania): Enforce Harmonised Schengen Form, 90/180 rule, 90 EUR fee, and 30,000 EUR medical insurance.
    5. If USA: Enforce Form DS-160 (or DS-260 for PR / I-797 for Work), 185 USD / 205 USD MRV fee, and 2-stage appointment rules.
    6. Ensure currency formatting NEVER contains raw '$' symbols (write 'USD', 'EUR', 'CAD', etc.).

    Return STRICT JSON matching this schema:
    {{
      "route_meta": {{
        "origin": "{origin}",
        "destination": "{destination}",
        "purpose": "{purpose}",
        "visa_type": "string",
        "official_channel": "string"
      }},
      "processing_meta": {{
        "processing_time": "string",
        "validity": "string",
        "length_of_stay": "string",
        "entry": "string",
        "total_fees": {{
          "consular_fee": "string",
          "service_fee": "string",
          "approx_inr": "string"
        }}
      }},
      "how_to_apply_steps": ["string"],
      "documents_checklist": [
        {{
          "id": "READYDOCUMENT1",
          "title": "string",
          "is_mandatory": true,
          "description": "string"
        }}
      ],
      "consular_directives": {{
        "statutory_rule": "string",
        "financial_benchmark": "string"
      }}
    }}
    """

    response = client.models.generate_content(
        model="gemini-3.7-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.1,
            tools=[{"google_search": {}}]
        )
    )
    return json.loads(sanitize_currency(response.text))

def audit_and_heal_payload(payload: dict, origin: str, destination: str, purpose: str) -> dict:
    """Agent 2: Independent Consular Auditor with Auto-Heal Engine"""
    audit_prompt = f"""
    Act as the Chief Immigration Auditor. Audit and verify this payload for:
    Route: {origin} -> {destination} ({purpose})

    PAYLOAD:
    {json.dumps(payload)}

    AUDIT CHECKS:
    1. Cross-Country Contamination: Are forms or portals from other nations present (e.g., DS-160 for European countries, Oman police data for Romania)?
    2. Regime Integrity: If eVisa, verify there are NO physical VAC biometrics. If Schengen, verify 90 EUR fee and 30,000 EUR insurance.
    3. Currency Safety: Confirm there are NO raw '$' signs.

    TASK:
    - If errors are present, fix them using verified consular rules and return the corrected JSON.
    - If 100% accurate, return the clean JSON.
    - Output ONLY valid JSON matching the same schema.
    """

    response = client.models.generate_content(
        model="gemini-3.7-flash",
        contents=audit_prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.0,
            tools=[{"google_search": {}}]
        )
    )
    return json.loads(sanitize_currency(response.text))

def save_to_neon(origin: str, destination: str, purpose: str, payload: dict):
    """Persists validated payload to PostgreSQL with UPSERT"""
    if not DATABASE_URL:
        print("Notice: DATABASE_URL not provided; skipping database upsert.")
        return

    route_key = f"{origin.lower().replace(' ', '_')}_to_{destination.lower().replace(' ', '_')}_{purpose.lower().split()[0]}"
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()

    query = """
    INSERT INTO verified_readiness_payloads (
        origin, destination, route_key, purpose, visa_type, official_channel, payload_json, updated_at
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, NOW())
    ON CONFLICT (origin, destination, purpose) DO UPDATE SET
        route_key = EXCLUDED.route_key,
        visa_type = EXCLUDED.visa_type,
        official_channel = EXCLUDED.official_channel,
        payload_json = EXCLUDED.payload_json,
        updated_at = NOW();
    """

    cur.execute(query, (
        origin,
        destination,
        route_key,
        purpose,
        payload.get("route_meta", {}).get("visa_type", "Standard Visa"),
        payload.get("route_meta", {}).get("official_channel", "Official Consular Mission"),
        Json(payload)
    ))
    conn.commit()
    cur.close()
    conn.close()

def run_matrix_pipeline():
    os.makedirs("./verified_readiness_matrix", exist_ok=True)
    print("🚀 Starting Bilateral Visa Compliance Matrix Pipeline (Gemini 3.7 Flash + Live Grounding)...", flush=True)

    success_count = 0
    total_pairs = 0

    for origin in ORIGINS:
        for destination in DESTINATIONS:
            if origin == destination:
                continue

            for purpose in PURPOSES:
                total_pairs += 1
                route_key = f"{origin.lower().replace(' ', '_')}_to_{destination.lower().replace(' ', '_')}_{purpose.lower().split()[0]}"
                local_file = f"./verified_readiness_matrix/{route_key}.json"

                print(f"\n🔄 [{total_pairs}] Processing Route: {origin} -> {destination} ({purpose})...", flush=True)
                try:
                    # 1. Search-Grounded Generation
                    raw_payload = generate_grounded_payload(origin, destination, purpose)
                    
                    # 2. Independent Audit & Auto-Heal
                    verified_payload = audit_and_heal_payload(raw_payload, origin, destination, purpose)

                    # 3. Local File Cache
                    with open(local_file, "w", encoding="utf-8") as f:
                        json.dump(verified_payload, f, indent=2)

                    # 4. PostgreSQL Database Upsert
                    save_to_neon(origin, destination, purpose, verified_payload)

                    print(f"✅ Verified & Saved to DB: {route_key}", flush=True)
                    success_count += 1
                    time.sleep(4.5)  # Safe rate limit throttle (15 RPM)

                except Exception as err:
                    print(f"❌ Error on route {route_key}: {err}", flush=True)
                    time.sleep(4.5)

    print(f"\n🎉 MATRIX PIPELINE RUN FINISHED: {success_count}/{total_pairs} routes successfully verified and synced!", flush=True)

if __name__ == "__main__":
    run_matrix_pipeline()
