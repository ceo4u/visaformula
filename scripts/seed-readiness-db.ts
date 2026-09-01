// scripts/seed-readiness-db.ts
/**
 * TravlTik Database Seeder & Fast-Lookup Cache Initializer.
 * Seeds verified readiness payloads into Neon PostgreSQL for 0ms latency and 0 API token cost.
 */

import fs from 'fs';
import path from 'path';
import { getPool, runMigrations } from '../src/backend/db';
import { getVerifiedOfficialData } from '../src/pages/api/visa/ai-requirements';
import { ALL_COUNTRIES } from '../src/data/countries';
import { sanitizeCurrencyCodes } from '../src/lib/country-matching';

async function seedDatabase() {
  console.log('--- INITIALIZING DATABASE MIGRATIONS & SCHEMA ---');
  await runMigrations();
  const pool = getPool();

  const origin = 'India';
  const purpose = 'Tourism / Vacation';
  const dataDir = path.join(process.cwd(), 'verified_readiness_data');

  let seededFilesCount = 0;
  let seededBuiltinCount = 0;

  // 1. Seed from ./verified_readiness_data JSON files if existing
  if (fs.existsSync(dataDir)) {
    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
    console.log(`\n📁 Found ${files.length} verified JSON files in ./verified_readiness_data/`);

    for (const file of files) {
      try {
        const filePath = path.join(dataDir, file);
        const rawContent = fs.readFileSync(filePath, 'utf8');
        const payload = sanitizeCurrencyCodes(JSON.parse(rawContent));

        const destination = payload.route_meta?.destination || payload.destination_country || file.replace('.json', '');
        const destinationSlug = file.replace('.json', '');
        const visaType = payload.route_meta?.visa_type || payload.visa_type || 'Standard Visa';
        const officialChannel = payload.route_meta?.official_channel || payload.official_source_name || 'Official Consular Portal';

        await pool.query(
          `INSERT INTO verified_readiness_payloads 
            (origin, destination, destination_slug, route_key, purpose, visa_type, official_channel, payload_json, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
           ON CONFLICT (origin, destination, purpose)
           DO UPDATE SET 
             route_key = EXCLUDED.route_key,
             destination_slug = EXCLUDED.destination_slug,
             visa_type = EXCLUDED.visa_type,
             official_channel = EXCLUDED.official_channel,
             payload_json = EXCLUDED.payload_json,
             updated_at = NOW()`,
          [origin, destination, destinationSlug, `india_to_${destinationSlug}_${purpose.toLowerCase().split(/\s+/)[0]}`, purpose, visaType, officialChannel, JSON.stringify(payload)]
        );

        seededFilesCount++;
      } catch (err: any) {
        console.error(`❌ Error seeding ${file}:`, err.message);
      }
    }
  }

  // 2. Seed verified built-in consular knowledge base for key destinations and purposes
  console.log('\n🏛️ Seeding built-in verified consular dataset into database across core travel purposes...');
  const CORE_PURPOSES = [
    'Tourism / Vacation',
    'Higher Studies',
    'Employment / Work',
    'Permanent Residency (PR) / Immigration',
    'Business Visit'
  ];

  for (const country of ALL_COUNTRIES) {
    if (country.name.toLowerCase() === 'india') continue;

    for (const purp of CORE_PURPOSES) {
      try {
        const destination = country.name;
        const destinationSlug = destination.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
        const routeKey = `india_to_${destinationSlug}_${purp.toLowerCase().split(/\s+/)[0]}`;
        const verified = sanitizeCurrencyCodes(getVerifiedOfficialData(origin, destination, purp));

        await pool.query(
          `INSERT INTO verified_readiness_payloads 
            (origin, destination, destination_slug, route_key, purpose, visa_type, official_channel, payload_json, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
           ON CONFLICT (origin, destination, purpose)
           DO UPDATE SET 
             route_key = EXCLUDED.route_key,
             destination_slug = EXCLUDED.destination_slug,
             visa_type = EXCLUDED.visa_type,
             official_channel = EXCLUDED.official_channel,
             payload_json = EXCLUDED.payload_json,
             updated_at = NOW()`,
          [
            origin,
            destination,
            destinationSlug,
            routeKey,
            purp,
            verified.visa_type || 'Standard Entry Visa',
            verified.official_source_name || 'Embassy / Consulate',
            JSON.stringify(verified)
          ]
        );

        seededBuiltinCount++;
      } catch (err: any) {
        console.error(`❌ Error seeding ${country.name} (${purp}):`, err.message);
      }
    }
  }

  console.log('\n======================================================');
  console.log(`✅ DATABASE SEED COMPLETE:`);
  console.log(`   - Seeded from JSON files: ${seededFilesCount}`);
  console.log(`   - Seeded from built-in consular data: ${seededBuiltinCount}`);
  console.log('🚀 Runtime APIs will now fetch from PostgreSQL in ~0ms with zero token cost.');
  console.log('======================================================\n');
  process.exit(0);
}

seedDatabase().catch((err) => {
  console.error('Fatal database seed error:', err);
  process.exit(1);
});
