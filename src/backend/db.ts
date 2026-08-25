import pg from 'pg';

let pool: pg.Pool | null = null;
let useSSL = true;

const DEFAULT_DATABASE_URL = 'postgresql://neondb_owner:npg_U4qJKmCVdn5t@ep-long-recipe-aolj8kyf.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

function createPoolInstance(forceNoSSL = false) {
  if (pool) {
    try { pool.end(); } catch(e) {}
  }
  let connStr = (import.meta?.env?.DATABASE_URL as string || process.env.DATABASE_URL || DEFAULT_DATABASE_URL).trim();
  if (!connStr) {
    connStr = DEFAULT_DATABASE_URL;
  }
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
  await p.query(`ALTER TABLE experts ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;`);
  await p.query(`ALTER TABLE experts ADD COLUMN IF NOT EXISTS verification_status VARCHAR(50) DEFAULT 'pending';`);


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
      seeker_id INTEGER DEFAULT 0,
      expert_id INTEGER DEFAULT 0,
      seeker_name VARCHAR(100),
      seeker_email VARCHAR(255),
      seeker_phone VARCHAR(50),
      expert_name VARCHAR(100),
      expert_email VARCHAR(255),
      visa_category VARCHAR(100),
      booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
      details TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await p.query(`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS seeker_name VARCHAR(100);`);
  await p.query(`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS seeker_email VARCHAR(255);`);
  await p.query(`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS seeker_phone VARCHAR(50);`);
  await p.query(`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS expert_name VARCHAR(100);`);
  await p.query(`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS expert_email VARCHAR(255);`);
  await p.query(`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS visa_category VARCHAR(100);`);
  await p.query(`ALTER TABLE bookings ALTER COLUMN seeker_id DROP NOT NULL;`);
  await p.query(`ALTER TABLE bookings ALTER COLUMN expert_id DROP NOT NULL;`);
  await p.query(`ALTER TABLE bookings ALTER COLUMN seeker_id SET DEFAULT 0;`);
  await p.query(`ALTER TABLE bookings ALTER COLUMN expert_id SET DEFAULT 0;`);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_bookings_expert_email ON bookings (expert_email);`);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_bookings_seeker_email ON bookings (seeker_email);`);

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
  await p.query(`ALTER TABLE documents ADD COLUMN IF NOT EXISTS document_type VARCHAR(100);`);
  await p.query(`ALTER TABLE documents ADD COLUMN IF NOT EXISTS file_name VARCHAR(255);`);
  await p.query(`ALTER TABLE documents ADD COLUMN IF NOT EXISTS file_size VARCHAR(50);`);
  await p.query(`ALTER TABLE documents ADD COLUMN IF NOT EXISTS mime_type VARCHAR(100);`);
  await p.query(`ALTER TABLE documents ADD COLUMN IF NOT EXISTS notes TEXT;`);

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

  // 12. Document & Expert Verification Enhancements (Non-destructive)
  await p.query(`ALTER TABLE experts ADD COLUMN IF NOT EXISTS verification_tier VARCHAR(50) DEFAULT 'email_verified';`);
  await p.query(`ALTER TABLE experts ADD COLUMN IF NOT EXISTS business_doc_url TEXT;`);
  await p.query(`ALTER TABLE experts ADD COLUMN IF NOT EXISTS identity_doc_url TEXT;`);
  await p.query(`ALTER TABLE experts ADD COLUMN IF NOT EXISTS hourly_rate NUMERIC(10,2) DEFAULT 49.00;`);
  await p.query(`ALTER TABLE documents ADD COLUMN IF NOT EXISTS document_type VARCHAR(50);`);
  await p.query(`ALTER TABLE documents ADD COLUMN IF NOT EXISTS file_name VARCHAR(255);`);
  await p.query(`ALTER TABLE documents ADD COLUMN IF NOT EXISTS file_size VARCHAR(50);`);
  await p.query(`ALTER TABLE documents ADD COLUMN IF NOT EXISTS mime_type VARCHAR(100);`);
  await p.query(`ALTER TABLE documents ADD COLUMN IF NOT EXISTS notes TEXT;`);

  // 13. Visa Quick Evaluations Table (Dedicated table - never pollutes bookings)
  await p.query(`
    CREATE TABLE IF NOT EXISTS visa_evaluations (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(150) NOT NULL,
      email VARCHAR(255),
      phone VARCHAR(50) NOT NULL,
      destination_country VARCHAR(100) NOT NULL,
      visa_type VARCHAR(100) NOT NULL,
      age_range VARCHAR(50),
      education_level VARCHAR(100),
      work_experience VARCHAR(50),
      english_test VARCHAR(50),
      english_score VARCHAR(50),
      budget VARCHAR(50),
      status VARCHAR(50) DEFAULT 'new',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_visa_eval_dest ON visa_evaluations (destination_country);`);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_visa_eval_phone ON visa_evaluations (phone);`);

  // 14. Quotes & Provider Leads Table (Supports matching & routing)
  await p.query(`
    CREATE TABLE IF NOT EXISTS quotes (
      id SERIAL PRIMARY KEY,
      seeker_id INTEGER DEFAULT 0,
      seeker_name VARCHAR(150),
      seeker_email VARCHAR(255) NOT NULL,
      seeker_phone VARCHAR(50),
      expert_id INTEGER DEFAULT 0,
      expert_name VARCHAR(150),
      expert_email VARCHAR(255),
      destination_country VARCHAR(100) NOT NULL,
      visa_category VARCHAR(100) NOT NULL,
      specific_pathway VARCHAR(150),
      budget_range VARCHAR(100),
      preferred_channel VARCHAR(50) DEFAULT 'email',
      preferred_time VARCHAR(100),
      message TEXT NOT NULL,
      status VARCHAR(50) DEFAULT 'new',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_quotes_seeker_email ON quotes (seeker_email);`);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_quotes_expert_id ON quotes (expert_id);`);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_quotes_dest_visa ON quotes (destination_country, visa_category);`);

  // 15. Reviews & Ratings Table
  await p.query(`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      expert_id INTEGER NOT NULL,
      expert_name VARCHAR(150),
      seeker_id INTEGER DEFAULT 0,
      seeker_name VARCHAR(150) NOT NULL,
      seeker_email VARCHAR(255) NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      feedback TEXT NOT NULL,
      tags TEXT,
      is_verified_transaction BOOLEAN DEFAULT FALSE,
      booking_id INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_reviews_expert_id ON reviews (expert_id);`);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_reviews_seeker_email ON reviews (seeker_email);`);

  // 16. Dispute & Fraud Reports Table
  await p.query(`
    CREATE TABLE IF NOT EXISTS reports (
      id SERIAL PRIMARY KEY,
      reporter_email VARCHAR(255) NOT NULL,
      reporter_name VARCHAR(150),
      reporter_role VARCHAR(50) DEFAULT 'seeker',
      target_type VARCHAR(50) NOT NULL,
      target_id VARCHAR(255),
      target_name VARCHAR(150),
      reason VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      evidence_url TEXT,
      status VARCHAR(50) DEFAULT 'Open',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_reports_status ON reports (status);`);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_reports_reporter_email ON reports (reporter_email);`);

  // 17. Payment Orders Table
  await p.query(`
    CREATE TABLE IF NOT EXISTS payment_orders (
      id SERIAL PRIMARY KEY,
      order_id VARCHAR(255) UNIQUE NOT NULL,
      booking_id INTEGER NOT NULL,
      amount NUMERIC(10,2) NOT NULL,
      currency VARCHAR(10) DEFAULT 'INR',
      provider VARCHAR(50) DEFAULT 'razorpay',
      status VARCHAR(50) DEFAULT 'created',
      payment_id VARCHAR(255),
      signature VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_payment_orders_booking ON payment_orders (booking_id);`);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_payment_orders_order_id ON payment_orders (order_id);`);

  // 18. User Journey Checklists Table (Flow 1 Parental Security Engine)
  await p.query(`
    CREATE TABLE IF NOT EXISTS user_journey_checklists (
      id SERIAL PRIMARY KEY,
      user_id INTEGER DEFAULT 0,
      user_email VARCHAR(255) NOT NULL,
      passport_country VARCHAR(100),
      destination VARCHAR(100),
      purpose VARCHAR(100),
      visa_type VARCHAR(150),
      visa_grant_date VARCHAR(50),
      visa_expiry_date VARCHAR(50),
      visa_conditions TEXT,
      completed_steps TEXT,
      airport_pickup_flight_no VARCHAR(100),
      airport_pickup_confirmed BOOLEAN DEFAULT FALSE,
      transit_checked BOOLEAN DEFAULT FALSE,
      housing_status VARCHAR(50) DEFAULT 'exploring',
      peer_network_joined BOOLEAN DEFAULT FALSE,
      forex_ordered BOOLEAN DEFAULT FALSE,
      customs_checklist TEXT,
      settlement_checklist TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await p.query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_user_journey_email ON user_journey_checklists (user_email);`);

  // ── CHANNEL PARTNER TABLES ──
  await p.query(`
    CREATE TABLE IF NOT EXISTS channel_partners (
      id SERIAL PRIMARY KEY,
      company_name VARCHAR(200) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      contact_person VARCHAR(150),
      phone VARCHAR(50),
      country VARCHAR(100) DEFAULT 'United States',
      tier VARCHAR(50) DEFAULT 'platinum',
      role VARCHAR(50) DEFAULT 'country_partner',
      status VARCHAR(50) DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await p.query(`
    CREATE TABLE IF NOT EXISTS state_partners (
      id SERIAL PRIMARY KEY,
      country_partner_id INTEGER NOT NULL REFERENCES channel_partners(id) ON DELETE CASCADE,
      partner_name VARCHAR(200) NOT NULL,
      company_name VARCHAR(200),
      operating_state VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      status VARCHAR(50) DEFAULT 'pending_hq_approval',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_state_partners_cp ON state_partners (country_partner_id);`);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_state_partners_status ON state_partners (status);`);
  await p.query(`
    CREATE TABLE IF NOT EXISTS referral_consultants (
      id SERIAL PRIMARY KEY,
      country_partner_id INTEGER NOT NULL REFERENCES channel_partners(id) ON DELETE CASCADE,
      state_partner_id INTEGER REFERENCES state_partners(id) ON DELETE SET NULL,
      consultant_name VARCHAR(200) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      region VARCHAR(100),
      speciality VARCHAR(100),
      status VARCHAR(50) DEFAULT 'pending_workflow',
      revenue NUMERIC(10,2) DEFAULT 0,
      commission NUMERIC(10,2) DEFAULT 0,
      leads_count INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_ref_cons_cp ON referral_consultants (country_partner_id);`);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_ref_cons_status ON referral_consultants (status);`);
  await p.query(`
    CREATE TABLE IF NOT EXISTS partner_sessions (
      token VARCHAR(255) PRIMARY KEY,
      partner_id INTEGER NOT NULL REFERENCES channel_partners(id) ON DELETE CASCADE,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await p.query(`CREATE INDEX IF NOT EXISTS idx_partner_sessions_token ON partner_sessions (token);`);

  await p.query(`
    ALTER TABLE channel_partners ADD COLUMN IF NOT EXISTS tax_id VARCHAR(100);
    ALTER TABLE channel_partners ADD COLUMN IF NOT EXISTS business_address TEXT;
    ALTER TABLE channel_partners ADD COLUMN IF NOT EXISTS logo_url TEXT;
    ALTER TABLE channel_partners ADD COLUMN IF NOT EXISTS invite_code VARCHAR(50) DEFAULT 'CP-USA-001';
    ALTER TABLE channel_partners ADD COLUMN IF NOT EXISTS require_manual_approval BOOLEAN DEFAULT true;
    ALTER TABLE channel_partners ADD COLUMN IF NOT EXISTS bank_name VARCHAR(100);
    ALTER TABLE channel_partners ADD COLUMN IF NOT EXISTS account_number VARCHAR(100);
    ALTER TABLE channel_partners ADD COLUMN IF NOT EXISTS swift_ifsc VARCHAR(50);
    ALTER TABLE channel_partners ADD COLUMN IF NOT EXISTS account_holder VARCHAR(150);
    ALTER TABLE channel_partners ADD COLUMN IF NOT EXISTS payout_frequency VARCHAR(50) DEFAULT 'monthly';
    ALTER TABLE channel_partners ADD COLUMN IF NOT EXISTS notify_email_leads BOOLEAN DEFAULT true;
    ALTER TABLE channel_partners ADD COLUMN IF NOT EXISTS notify_whatsapp_leads BOOLEAN DEFAULT false;
    ALTER TABLE channel_partners ADD COLUMN IF NOT EXISTS notify_payouts BOOLEAN DEFAULT true;

    ALTER TABLE state_partners ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
    ALTER TABLE state_partners ADD COLUMN IF NOT EXISTS contact_person VARCHAR(150);
    ALTER TABLE referral_consultants ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
    ALTER TABLE state_partners ALTER COLUMN country_partner_id DROP NOT NULL;
    ALTER TABLE referral_consultants ALTER COLUMN country_partner_id DROP NOT NULL;

    CREATE TABLE IF NOT EXISTS partner_team_members (
      id SERIAL PRIMARY KEY,
      partner_id INTEGER NOT NULL REFERENCES channel_partners(id) ON DELETE CASCADE,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'Manager',
      status VARCHAR(50) DEFAULT 'Active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_partner_team_pid ON partner_team_members (partner_id);

    -- ── COMMUNITY & CHAT HUB TABLES ──
    CREATE TABLE IF NOT EXISTS community_channels (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(100) UNIQUE NOT NULL,
      name VARCHAR(150) NOT NULL,
      category VARCHAR(100) NOT NULL,
      icon VARCHAR(50) DEFAULT 'hash',
      unread_count INT DEFAULT 0,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS chat_messages (
      id SERIAL PRIMARY KEY,
      channel_slug VARCHAR(100) NOT NULL,
      user_id VARCHAR(100),
      sender_name VARCHAR(150) NOT NULL,
      sender_avatar VARCHAR(255),
      is_verified_senior BOOLEAN DEFAULT false,
      content TEXT NOT NULL,
      reactions JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_chat_msg_channel ON chat_messages (channel_slug);

    CREATE TABLE IF NOT EXISTS verified_seniors (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      avatar_url VARCHAR(255),
      university VARCHAR(200) NOT NULL,
      status VARCHAR(50) DEFAULT 'Online',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    DELETE FROM verified_seniors a USING verified_seniors b WHERE a.id > b.id AND a.name = b.name;
    CREATE UNIQUE INDEX IF NOT EXISTS idx_seniors_name ON verified_seniors (name);

    CREATE TABLE IF NOT EXISTS pinned_resources (
      id SERIAL PRIMARY KEY,
      channel_slug VARCHAR(100) DEFAULT 'russia-mbbs-2026',
      title VARCHAR(200) NOT NULL,
      file_size VARCHAR(50) NOT NULL,
      file_type VARCHAR(50) DEFAULT 'pdf',
      download_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Seed default channels if empty
    INSERT INTO community_channels (slug, name, category, icon, unread_count, description)
    VALUES 
      ('russia-mbbs-2026', 'russia-mbbs-2026', 'MBBS Abroad Guide', 'graduation-cap', 3, 'Official hub for 2026 Russia MBBS Aspirants & Seniors'),
      ('delhi-to-moscow-flights', 'delhi-to-moscow-flights', 'Travel & Accommodation', 'plane', 0, 'Group flights, transit visas, baggage allowance discussions'),
      ('dorm-sharing', 'dorm-sharing', 'Travel & Accommodation', 'home', 0, 'Find flatmates, university hostel room reviews & booking'),
      ('visa-approval-tracker', 'visa-approval-tracker', 'Visa & Documentation', 'file-check', 1, 'Live Embassy queue updates & VFS passport tracking'),
      ('ielts-prep-hub', 'ielts-prep-hub', 'General Announcements', 'book-open', 0, 'Mock tests, speaking partners, and score improvement tips'),
      ('campus-life-moscow', 'campus-life-moscow', 'Student Life', 'coffee', 0, 'Indian mess food, winter clothing guides, and weekend events'),
      ('random-lounge', 'random-lounge', 'Off-Topic', 'smile', 0, 'Casual chats, gaming, memes, and community meetups')
    ON CONFLICT (slug) DO NOTHING;

    -- Seed verified seniors if empty
    INSERT INTO verified_seniors (name, avatar_url, university, status)
    VALUES
      ('Arjun Patel', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'Moscow State University (4th Year)', 'Online'),
      ('Neha Reddy', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', 'Kazan Federal University (3rd Year)', 'Online'),
      ('Vikram Joshi', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 'Sechenov First MSMU (5th Year)', 'Online'),
      ('Simran Kaur', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', 'Pavlov First St. Petersburg (2nd Year)', 'Online'),
      ('Aditya Kumar', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', 'Bashkir State Medical University (Intern)', 'Online')
    ON CONFLICT (name) DO NOTHING;

    -- Seed pinned resources if empty
    INSERT INTO pinned_resources (channel_slug, title, file_size, file_type, download_url)
    VALUES
      ('russia-mbbs-2026', 'Russia MBBS Admission Process 2026.pdf', '2.4 MB', 'pdf', '#'),
      ('russia-mbbs-2026', 'Moscow State University Hostel Guide.pdf', '1.8 MB', 'pdf', '#'),
      ('russia-mbbs-2026', 'VFS Russia Student Visa Checklist.pdf', '1.2 MB', 'pdf', '#')
    ON CONFLICT DO NOTHING;

    -- Seed starter messages for russia-mbbs-2026 if empty
    INSERT INTO chat_messages (channel_slug, user_id, sender_name, sender_avatar, is_verified_senior, content, reactions, created_at)
    SELECT 'russia-mbbs-2026', 'user-arjun', 'Arjun Patel', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', true, 'Hey everyone! 👋 Admissions for Moscow State University and Sechenov 2026 batch are officially open. Check the pinned resources for the certified apostille checklist.', '[{"emoji":"❤️","count":12},{"emoji":"👍","count":8},{"emoji":"👋","count":6}]'::jsonb, NOW() - INTERVAL '45 minutes'
    WHERE NOT EXISTS (SELECT 1 FROM chat_messages WHERE channel_slug = 'russia-mbbs-2026');

    INSERT INTO chat_messages (channel_slug, user_id, sender_name, sender_avatar, is_verified_senior, content, reactions, created_at)
    SELECT 'russia-mbbs-2026', 'user-neha', 'Neha Reddy', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', true, 'Also make sure your NEET qualification certificate is ready before VFS appointment. Feel free to drop questions here regarding hostel fees & winter prep! ❄️', '[{"emoji":"💯","count":9},{"emoji":"🔥","count":5}]'::jsonb, NOW() - INTERVAL '30 minutes'
    WHERE NOT EXISTS (SELECT 1 FROM chat_messages WHERE channel_slug = 'russia-mbbs-2026' AND user_id = 'user-neha');
  `);
  })();
  return migrationsPromise;
}

