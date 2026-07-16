import crypto from 'crypto';
import { getPool, runMigrations } from './db';

export interface SessionInfo {
  token: string;
  userId: number;
  userType: 'seeker' | 'expert';
  expiresAt: Date;
}

export async function loginUser(email: string, password_hash: string): Promise<{ user: any; type: 'seeker' | 'expert' }> {
  await runMigrations();
  const pool = getPool();

  // 1. Check Seekers
  const seekerRes = await pool.query('SELECT * FROM seekers WHERE LOWER(email) = LOWER($1)', [email]);
  if (seekerRes.rows.length > 0) {
    const user = seekerRes.rows[0];
    if (user.password_hash === password_hash) {
      return { user, type: 'seeker' };
    } else {
      throw new Error('Incorrect password.');
    }
  }

  // 2. Check Experts
  const expertRes = await pool.query('SELECT * FROM experts WHERE LOWER(email) = LOWER($1)', [email]);
  if (expertRes.rows.length > 0) {
    const user = expertRes.rows[0];
    if (user.password_hash === password_hash) {
      return { user, type: 'expert' };
    } else {
      throw new Error('Incorrect password.');
    }
  }

  throw new Error('Email is not registered.');
}

export async function createSession(userId: number, userType: 'seeker' | 'expert'): Promise<string> {
  const pool = getPool();
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days session

  await pool.query(
    'INSERT INTO sessions (token, user_id, user_type, expires_at) VALUES ($1, $2, $3, $4)',
    [token, userId, userType, expiresAt]
  );

  return token;
}

export async function verifySession(token: string): Promise<{ user: any; type: 'seeker' | 'expert' } | null> {
  const pool = getPool();
  const sessionRes = await pool.query('SELECT * FROM sessions WHERE token = $1 AND expires_at > NOW()', [token]);
  
  if (sessionRes.rows.length === 0) return null;
  const session = sessionRes.rows[0];

  if (session.user_type === 'seeker') {
    const userRes = await pool.query('SELECT id, first_name, last_name, email, phone, passport_country FROM seekers WHERE id = $1', [session.user_id]);
    if (userRes.rows.length > 0) {
      return { user: userRes.rows[0], type: 'seeker' };
    }
  } else {
    const userRes = await pool.query('SELECT id, business_name, email, contact_number, advisor_type FROM experts WHERE id = $1', [session.user_id]);
    if (userRes.rows.length > 0) {
      return { user: userRes.rows[0], type: 'expert' };
    }
  }

  return null;
}

export async function deleteSession(token: string): Promise<void> {
  const pool = getPool();
  await pool.query('DELETE FROM sessions WHERE token = $1', [token]);
}
