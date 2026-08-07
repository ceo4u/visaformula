-- Version 3.0: AI Visa Readiness Engine & Marketplace Database Schema

-- 1. Visa Readiness Assessments Table
CREATE TABLE IF NOT EXISTS visa_readiness_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id INT REFERENCES seekers(id) ON DELETE CASCADE,
  target_country VARCHAR(100) NOT NULL,
  visa_category VARCHAR(100) NOT NULL,
  readiness_score INT CHECK (readiness_score BETWEEN 0 AND 100),
  risk_status VARCHAR(30) NOT NULL, -- 'READY', 'MODERATE_RISK', 'HIGH_RISK'
  financial_score INT,
  critical_gaps JSONB DEFAULT '[]'::jsonb,
  raw_input_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Verified Visa Experts Table
CREATE TABLE IF NOT EXISTS visa_experts (
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(255) NOT NULL,
  business_location VARCHAR(255),
  city VARCHAR(100),
  district VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  expertise_fields TEXT[], -- ARRAY['VISIT', 'WORK', 'VISA_APPEALS', 'PR']
  destination_countries TEXT[],
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Classified Ads Table
CREATE TABLE IF NOT EXISTS classified_ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expert_id INT REFERENCES visa_experts(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  category_of_ad VARCHAR(100) NOT NULL,
  destination_country VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
