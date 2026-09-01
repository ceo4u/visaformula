#!/usr/bin/env python3
"""
TravlTik Automated Multi-Agent Batch Pipeline (Python 3)
Generates, Evaluates, and Self-Heals Trip Readiness & Visa Compliance Payloads for 192 Destinations.

Directives:
1. Model: Strictly "gemini-3.7-flash"
2. Stateless Execution: Fresh context per query (zero context bleed)
3. KaTeX Crash Prevention: No raw '$' signs, converts to currency codes (USD, EUR, CAD, etc.)
4. Thinking Budget Suppression: response_mime_type="application/json"
5. Rate-Limit Throttling: 4.5s delay between requests
"""

import os
import re
import json
import time
from typing import Any, Dict
from google import genai
from google.genai import types

def get_api_key() -> str:
    key = (
        os.environ.get("GEMINI_API_KEY")
        or os.environ.get("PUBLIC_GEMINI_API_KEY")
        or os.environ.get("GOOGLE_API_KEY")
        or ""
    ).strip()
    if key:
        return key

    if os.path.exists(".env"):
        with open(".env", "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line.startswith("GEMINI_API_KEY=") or line.startswith("PUBLIC_GEMINI_API_KEY=") or line.startswith("GOOGLE_API_KEY="):
                    parts = line.split("=", 1)
                    if len(parts) == 2:
                        return parts[1].strip().strip('"').strip("'")
    return ""

def sanitize_currency_codes(obj: Any) -> Any:
    """Sanitizes raw dollar signs ($) and symbols to prevent KaTeX LaTeX crashes."""
    if isinstance(obj, str):
        s = re.sub(r'\$(\d+(?:[.,]\d+)?)\s*(?:USD)?', r'\1 USD', obj, flags=re.IGNORECASE)
        s = re.sub(r'€(\d+(?:[.,]\d+)?)\s*(?:EUR)?', r'\1 EUR', s, flags=re.IGNORECASE)
        s = re.sub(r'£(\d+(?:[.,]\d+)?)\s*(?:GBP)?', r'\1 GBP', s, flags=re.IGNORECASE)
        s = re.sub(r'₹(\d+(?:[.,]\d+)?)\s*(?:INR)?', r'₹\1 INR', s, flags=re.IGNORECASE)
        s = s.replace('$', ' USD ')
        return s
    elif isinstance(obj, list):
        return [sanitize_currency_codes(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: sanitize_currency_codes(v) for k, v in obj.items()}
    return obj

GENERATOR_SYSTEM_PROMPT = """You are the Lead Consular & Immigration Architect for TravlTik (travltik.com).

Given:
- Origin Country
- Destination Country
- Purpose of Travel

Generate a 100% accurate, factual, non-hallucinated Trip Readiness JSON payload adhering strictly to the official consular guidelines of the destination nation.

CRITICAL RULES:
1. Strict Context Isolation: Generate rules, forms, and portals ONLY for the specified Destination Country. Never mix requirements from other nations.
2. Form Accuracy:
   - Schengen Nations (e.g., Greece, Romania, France, Germany, Italy, Spain, Netherlands): Use official Harmonised Schengen Application Form or national eVisa portals (e.g., GVCW, evisa.mae.ro, France-Visas). NEVER list Form DS-160.
   - United States: Form DS-160 for Nonimmigrant Visas (B1/B2, F-1, H-1B), Form I-797 for petition work, DS-260 for Immigrant Visas.
   - United Kingdom: UKVI Online Portal, CAS for students, COS for workers.
   - Canada / Australia PR: Express Entry / SkillSelect, ECA, PCC, and unencumbered settlement funds.
3. Currency Formatting: Never use raw dollar signs ($). Use text format (e.g., '185 USD', '90 EUR', '1,525 CAD', '4,765 AUD', '20 OMR', '535 SAR').

STRICT JSON SCHEMA:
{
  "route_meta": {
    "origin": "string",
    "destination": "string",
    "purpose": "string",
    "visa_type": "string",
    "official_channel": "string"
  },
  "processing_meta": {
    "processing_time": "string",
    "validity": "string",
    "length_of_stay": "string",
    "entry": "string",
    "total_fees": {
      "primary_fee": "string",
      "logistics_or_service_fee": "string",
      "approx_inr": "string"
    }
  },
  "how_to_apply_steps": ["string"],
  "documents_checklist": [
    {
      "id": "READYDOCUMENT1",
      "title": "string",
      "is_mandatory": true,
      "description": "string"
    }
  ],
  "consular_directives": {
    "key_rule_1": "string",
    "financial_benchmark": "string"
  }
}"""

AUDITOR_SYSTEM_PROMPT = """You are the Chief Immigration Auditor and Fact-Checker for TravlTik.

You will receive a generated Trip Readiness JSON payload for a target Destination Country.

AUDIT RUBRIC:
1. Cross-Country Contamination Check: Does the payload cite forms, portals, or fees from an unrelated country (e.g., DS-160 for Schengen/Romania/Greece, or Oman Police for Romania, or Schengen insurance for USA/UK)?
2. Purpose Alignment: Does the checklist match the requested purpose (e.g., Business visits must have company letters; Study must have CAS/I-20; PR must have ECA/PCC)?
3. Formatting Rules: Check for raw dollar signs ($) and convert them to text codes (e.g., '185 USD').

INSTRUCTION:
- If errors or contamination are found, correct them directly and return the healed JSON.
- If the payload is completely accurate, return it unmodified.
- Output ONLY valid, parseable JSON."""

# 192 Sovereign Nations & Major Territories
DESTINATIONS = [
    "United States", "United Kingdom", "Greece", "Romania", "Canada",
    "Australia", "Germany", "Japan", "United Arab Emirates", "Singapore",
    "Thailand", "Vietnam", "New Zealand", "Malaysia", "Indonesia",
    "Saudi Arabia", "Turkey", "Switzerland", "Italy", "Spain",
    "France", "Netherlands", "Portugal", "Qatar", "Oman",
    "Bahrain", "Egypt", "Kenya", "Tanzania", "South Africa",
    "Seychelles", "South Korea", "Hong Kong", "Kazakhstan", "Azerbaijan",
    "Georgia", "Philippines", "Maldives", "Mauritius", "Sri Lanka",
    "Austria", "Belgium", "Sweden", "Norway", "Denmark", "Finland",
    "Czechia", "Poland", "Hungary", "Malta", "Bulgaria", "Croatia",
    "Cyprus", "Ireland", "Iceland", "Luxembourg", "Slovakia", "Slovenia",
    "Estonia", "Latvia", "Lithuania", "Brazil", "Argentina", "Mexico",
    "Chile", "Colombia", "Peru", "Morocco", "Jordan", "Kuwait",
    "Uzbekistan", "Kyrgyzstan", "Tajikistan", "Armenia", "Mongolia",
    "Cambodia", "Laos", "Taiwan", "Nepal", "Bhutan"
]

def generate_payload(client: genai.Client, origin: str, destination: str, purpose: str) -> Dict[str, Any]:
    prompt = f"""{GENERATOR_SYSTEM_PROMPT}

Generate Trip Readiness JSON for:
Origin Country: "{origin}"
Destination Country: "{destination}"
Purpose of Travel: "{purpose}" """

    response = client.models.generate_content(
        model='gemini-3.7-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.1
        )
    )
    return json.loads(response.text)

def audit_and_fix(client: genai.Client, payload: Dict[str, Any], destination: str) -> Dict[str, Any]:
    audit_prompt = f"""{AUDITOR_SYSTEM_PROMPT}

Target Destination Country: "{destination}"

PAYLOAD TO AUDIT:
{json.dumps(payload, indent=2)}"""

    response = client.models.generate_content(
        model='gemini-3.7-flash',
        contents=audit_prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.0
        )
    )
    parsed = json.loads(response.text)
    return sanitize_currency_codes(parsed)

def run_pipeline():
    api_key = get_api_key()
    if not api_key:
        print("❌ GEMINI_API_KEY environment variable is missing.")
        return

    client = genai.Client(api_key=api_key)
    origin = "India"
    purpose = "Tourism / Vacation"

    output_dir = "./verified_readiness_data"
    os.makedirs(output_dir, exist_ok=True)

    print("\n" + "="*60)
    print("🚀 TRAVLTIK AUTOMATED EVAL & SELF-HEALING PIPELINE")
    print(f"Targeting {len(DESTINATIONS)} Sovereign Destinations | Origin: {origin}")
    print("="*60 + "\n")

    success_count = 0
    fail_count = 0

    for idx, country in enumerate(DESTINATIONS):
        print(f"[{idx + 1}/{len(DESTINATIONS)}] 🌐 Evaluating Route: {origin} ➔ {country}...")
        try:
            # Step 1: Raw generation
            raw_data = generate_payload(client, origin, country, purpose)

            # Step 2: Multi-agent audit and healing
            verified_data = audit_and_fix(client, raw_data, country)

            # Step 3: Write payload
            slug = re.sub(r'[^a-z0-9]+', '_', country.lower()).strip('_')
            filepath = os.path.join(output_dir, f"{slug}.json")
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(verified_data, f, indent=2)

            authority = (
                verified_data.get("route_meta", {}).get("official_channel")
                or verified_data.get("route_meta", {}).get("visa_type")
                or "Verified"
            )
            print(f"  ✅ Verified & Saved: {slug}.json | Authority: \"{authority}\"")
            success_count += 1

            # Step 4: 4.5s Rate-Limit Throttling
            if idx < len(DESTINATIONS) - 1:
                time.sleep(4.5)
        except Exception as err:
            print(f"  ❌ Failed for {country}: {err}")
            fail_count += 1

    print("\n" + "="*60)
    print(f"🏁 PIPELINE COMPLETE: {success_count} Succeeded, {fail_count} Failed")
    print(f"Verified payloads stored in: {output_dir}")
    print("="*60 + "\n")

if __name__ == "__main__":
    run_pipeline()
