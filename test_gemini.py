import os
import sys
from google import genai

# Fix Windows UTF-8 stdout
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

# Read API Key from environment or .env file
api_key = os.environ.get('NEXT_PUBLIC_GEMINI_API_KEY') or os.environ.get('GEMINI_API_KEY')

if not api_key and os.path.exists('.env'):
    with open('.env', 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line.startswith('NEXT_PUBLIC_GEMINI_API_KEY=') or line.startswith('GEMINI_API_KEY='):
                api_key = line.split('=', 1)[1].strip().strip('"').strip("'")
                break

if not api_key and os.path.exists('.env.local'):
    with open('.env.local', 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line.startswith('NEXT_PUBLIC_GEMINI_API_KEY=') or line.startswith('GEMINI_API_KEY='):
                api_key = line.split('=', 1)[1].strip().strip('"').strip("'")
                break

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment or .env files.")

print(f"🔑 Initializing Gemini Client with key: {api_key[:8]}...", flush=True)
client = genai.Client(api_key=api_key)

MODELS = ['gemini-3.7-flash', 'gemini-2.5-flash', 'gemini-1.5-flash']

for model_name in MODELS:
    print(f"\n🤖 Testing model: {model_name}...", flush=True)
    try:
        response = client.models.generate_content(
            model=model_name,
            contents='What is the official Danish student residence permit form code for higher studies on nyidanmark.dk? Give a concise 1-sentence answer.'
        )
        print(f"✅ SUCCESS ({model_name}):", flush=True)
        print(response.text, flush=True)
        break
    except Exception as e:
        print(f"⚠️ Failed on {model_name}: {e}", flush=True)
