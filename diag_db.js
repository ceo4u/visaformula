import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_U4qJKmCVdn5t@ep-long-recipe-aolj8kyf.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

const TARGET_NAMES = ['risingat sports', 'chaitanya n', 'travel & play', 'travelandplay', 'akash co', 'lellwyn edwin', 'travel play'];

pool.query(`
  SELECT 
    id,
    business_name,
    CONCAT(LEFT(email, 3), '***@', SPLIT_PART(email, '@', 2)) as email_masked,
    advisor_type,
    about_me,
    office_address,
    expertise_tags,
    countries_expertise,
    profile_photo IS NOT NULL as has_photo,
    created_at,
    CASE 
      WHEN business_name IS NOT NULL AND business_name != '' 
        AND advisor_type IS NOT NULL AND advisor_type != ''
      THEN 'complete'
      ELSE 'incomplete'
    END as profile_status
  FROM experts
  ORDER BY created_at DESC
`).then(r => {
  console.log('\n=== DB DIAGNOSTIC REPORT ===');
  console.log('Total experts in DB:', r.rows.length);
  console.log('');
  
  const targets = ['risingat sports', 'chaitanya n', 'travelandplay', 'travel & play', 'akash co', 'lellwyn edwin', 'travel play'];
  
  r.rows.forEach((row, i) => {
    const nameLC = (row.business_name || '').toLowerCase();
    const isTarget = targets.some(t => nameLC.includes(t) || t.includes(nameLC));
    const marker = isTarget ? '*** TARGET ***' : '';
    
    console.log(`[${i+1}] ID=${row.id} ${marker}`);
    console.log(`     name: "${row.business_name}"`);
    console.log(`     email: ${row.email_masked}`);
    console.log(`     role: ${row.advisor_type}`);
    console.log(`     profile_status: ${row.profile_status}`);
    console.log(`     has_photo: ${row.has_photo}`);
    console.log(`     about_me: "${(row.about_me || '').substring(0, 50)}"`);
    console.log(`     expertise_tags: ${row.expertise_tags}`);
    console.log(`     countries_expertise: ${row.countries_expertise}`);
    console.log('');
  });
  
  console.log('=== TARGET EXPERT STATUS ===');
  const targetNames = ['risingat sports', 'chaitanya n', 'travelandplayltd', 'akash co', 'lellwyn edwin', 'travel play'];
  targetNames.forEach(t => {
    const found = r.rows.find(row => (row.business_name || '').toLowerCase().includes(t) || t.includes((row.business_name || '').toLowerCase()));
    if (found) {
      console.log(`✅ "${found.business_name}" → ID=${found.id}, profile=${found.profile_status}, email=${found.email_masked}`);
    } else {
      console.log(`❌ "${t}" → NOT FOUND IN DB`);
    }
  });
  
  pool.end();
}).catch(e => { console.error('DB ERROR:', e.message); pool.end(); });
