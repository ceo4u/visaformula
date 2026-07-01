import pg from 'pg';

let pool: pg.Pool | null = null;

export function getPool() {
  if (!pool) {
    pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
  }
  return pool;
}

export async function runMigrations() {
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
}
