import pg from 'pg';

let pool: pg.Pool | null = null;
let useSSL = true;

function createPoolInstance(forceNoSSL = false) {
  if (pool) {
    try { pool.end(); } catch(e) {}
  }
  let connStr = (import.meta.env.DATABASE_URL || process.env.DATABASE_URL || '').trim();
  if (forceNoSSL || !useSSL) {
    connStr = connStr.replace('sslmode=require', 'sslmode=disable');
    pool = new pg.Pool({
      connectionString: connStr,
      ssl: false,
      max: 30,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000
    });
  } else {
    pool = new pg.Pool({
      connectionString: connStr,
      ssl: { rejectUnauthorized: false },
      max: 30,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000
    });
  }
}

export function getPool() {
  if (!pool) {
    createPoolInstance();
  }
  
  return {
    query: async (text: string, params?: any[]) => {
      let retries = 3;
      while (true) {
        try {
          return await pool!.query(text, params);
        } catch (err: any) {
          retries--;
          const isTimeoutOrConnError = 
            err.code === 'ETIMEDOUT' || 
            err.code === 'ECONNRESET' || 
            (err.message && (
              err.message.toLowerCase().includes('timeout') || 
              err.message.toLowerCase().includes('connection') ||
              err.message.toLowerCase().includes('connect')
            ));
          
          if (isTimeoutOrConnError && retries > 0) {
            console.warn(`[Neon DB] Connection timed out/lost: ${err.message}. Retrying query in 3 seconds... (${retries} retries left)`);
            await new Promise(resolve => setTimeout(resolve, 3000));
            continue;
          }

          if (err.message && (
            err.message.includes('SSL') || 
            err.message.includes('ssl') || 
            err.message.includes('support SSL') || 
            err.message.includes('SSL connection')
          )) {
            console.warn('Database does not support SSL. Retrying without SSL...');
            useSSL = false;
            createPoolInstance(true);
            return await pool!.query(text, params);
          }
          throw err;
        }
      }
    },
    end: async () => {
      if (pool) return pool.end();
    }
  } as unknown as pg.Pool;
}

let migrationsPromise: Promise<void> | null = null;

export async function runMigrations() {
  if (migrationsPromise) {
    return migrationsPromise;
  }
  
  migrationsPromise = (async () => {
    const p = getPool();
    
    // 1. Seekers Table
  await p.query(`
    CREATE TABLE IF NOT EXISTS seekers (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      passport_country VARCHAR(100),
      goals TEXT,
      destinations TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await p.query(`
    ALTER TABLE seekers ADD COLUMN IF NOT EXISTS looking_for VARCHAR(100);
    ALTER TABLE seekers ADD COLUMN IF NOT EXISTS address TEXT;
    ALTER TABLE seekers ADD COLUMN IF NOT EXISTS area VARCHAR(255);
    ALTER TABLE seekers ADD COLUMN IF NOT EXISTS city VARCHAR(100);
    ALTER TABLE seekers ADD COLUMN IF NOT EXISTS state VARCHAR(100);
    ALTER TABLE seekers ADD COLUMN IF NOT EXISTS zip_code VARCHAR(50);
    ALTER TABLE seekers ADD COLUMN IF NOT EXISTS current_visa_status VARCHAR(100);
  `);

  // 2. Experts Table
  await p.query(`
    CREATE TABLE IF NOT EXISTS experts (
      id SERIAL PRIMARY KEY,
      business_name VARCHAR(150),
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      contact_number VARCHAR(50),
      advisor_type VARCHAR(100),
      about_me TEXT,
      portfolio_link VARCHAR(255),
      office_address TEXT,
      gov_registration_number VARCHAR(150),
      license_document_url VARCHAR(255),
      expertise_tags TEXT,
      countries_expertise TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  // Add profile_photo column if not exists
  await p.query(`ALTER TABLE experts ADD COLUMN IF NOT EXISTS profile_photo TEXT;`);
  await p.query(`ALTER TABLE experts ADD COLUMN IF NOT EXISTS city VARCHAR(150);`);
  await p.query(`ALTER TABLE experts ADD COLUMN IF NOT EXISTS state VARCHAR(150);`);
  await p.query(`ALTER TABLE experts ADD COLUMN IF NOT EXISTS country VARCHAR(150);`);


  // 3. Sessions Table
  await p.query(`
    CREATE TABLE IF NOT EXISTS sessions (
      token VARCHAR(255) PRIMARY KEY,
      user_id INTEGER NOT NULL,
      user_type VARCHAR(20) NOT NULL, -- 'seeker' or 'expert'
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      expires_at TIMESTAMP NOT NULL
    );
  `);

  // 4. Bookings Table
  await p.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      seeker_id INTEGER NOT NULL,
      expert_id INTEGER NOT NULL,
      booking_date TIMESTAMP NOT NULL,
      status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
      details TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 5. Documents Table
  await p.query(`
    CREATE TABLE IF NOT EXISTS documents (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      user_type VARCHAR(20) NOT NULL,
      label VARCHAR(255) NOT NULL,
      status VARCHAR(50) DEFAULT 'required', -- 'required', 'uploaded', 'verified'
      file_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 6. Email Verifications Table
  await p.query(`
    CREATE TABLE IF NOT EXISTS email_verifications (
      email VARCHAR(255) PRIMARY KEY,
      otp_hash VARCHAR(255) NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      attempts INTEGER DEFAULT 0,
      verified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  // Add resend tracking columns if they don't exist
  await p.query(`ALTER TABLE email_verifications ADD COLUMN IF NOT EXISTS resend_count INTEGER DEFAULT 0;`);
  await p.query(`ALTER TABLE email_verifications ADD COLUMN IF NOT EXISTS last_resend_at TIMESTAMP;`);

  // 7. Email Logs Table — track every email sent for analytics
  await p.query(`
    CREATE TABLE IF NOT EXISTS email_logs (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      type VARCHAR(50) NOT NULL,
      status VARCHAR(20) NOT NULL,
      provider VARCHAR(30) DEFAULT 'resend',
      provider_id VARCHAR(255),
      error_message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  // Index for fast lookups by email
  await p.query(`CREATE INDEX IF NOT EXISTS idx_email_logs_email ON email_logs (email);`);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_email_logs_type ON email_logs (type);`);

  // 8. Password Resets Table
  await p.query(`
    CREATE TABLE IF NOT EXISTS password_resets (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      token_hash VARCHAR(255) NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      used BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_password_resets_email ON password_resets (email);`);

  // 9. Ads Table
  await p.query(`
    CREATE TABLE IF NOT EXISTS ads (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      cover_photo TEXT,
      description TEXT NOT NULL,
      expert_email VARCHAR(255),
      status VARCHAR(50) DEFAULT 'under_verification',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_ads_category ON ads (category);`);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_ads_expert_email ON ads (expert_email);`);

  // 10. Ad Click Analytics Table
  await p.query(`
    CREATE TABLE IF NOT EXISTS ad_click_analytics (
      id SERIAL PRIMARY KEY,
      ad_id VARCHAR(255),
      ad_title VARCHAR(255) NOT NULL,
      ad_type VARCHAR(50) NOT NULL,
      category VARCHAR(100),
      destination VARCHAR(100),
      target_url TEXT,
      user_email VARCHAR(255),
      user_name VARCHAR(255),
      user_role VARCHAR(50),
      device VARCHAR(50),
      page_url TEXT,
      ip_address VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_ad_click_ad_type ON ad_click_analytics (ad_type);`);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_ad_click_user_email ON ad_click_analytics (user_email);`);

  // 11. Self Applications Table
  await p.query(`
    CREATE TABLE IF NOT EXISTS self_applications (
      id SERIAL PRIMARY KEY,
      visa_type VARCHAR(150),
      destination_country VARCHAR(150),
      travel_date VARCHAR(50),
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      dob VARCHAR(50),
      passport_number VARCHAR(100),
      passport_expiry VARCHAR(50),
      nationality VARCHAR(100),
      email VARCHAR(255),
      mobile_number VARCHAR(50),
      selected_services TEXT,
      total_amount NUMERIC(10,2),
      payment_status VARCHAR(50) DEFAULT 'submitted',
      payment_id VARCHAR(255),
      status VARCHAR(50) DEFAULT 'in_progress',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_self_app_email ON self_applications (email);`);
  })();
  return migrationsPromise;
}

