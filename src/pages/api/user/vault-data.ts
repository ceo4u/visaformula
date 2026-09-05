// src/pages/api/user/vault-data.ts
import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';
import { verifySession } from '../../../backend/auth';

export const prerender = false;

async function resolveUserFromRequest(request: Request, url: URL): Promise<{ email: string; userId: number; userType: string } | null> {
  const cookieHeader = request.headers.get('Cookie') || '';
  const match = cookieHeader.match(/(?:travltik_sid|travltik_sid)=([^;]+)/);
  const token = match ? match[1] : '';

  if (token) {
    try {
      const auth = await verifySession(token);
      if (auth && auth.user) {
        return {
          email: (auth.user.email || '').toLowerCase().trim(),
          userId: auth.user.id || 0,
          userType: auth.type
        };
      }
    } catch (e) {}
  }

  // Fallback to query param or header
  const emailParam = url.searchParams.get('email') || request.headers.get('X-User-Email') || '';
  const cleanEmail = emailParam.toLowerCase().trim();
  if (cleanEmail) {
    return {
      email: cleanEmail,
      userId: 0,
      userType: 'seeker'
    };
  }

  return null;
}

export const GET: APIRoute = async ({ request, url }) => {
  try {
    await runMigrations();
    const user = await resolveUserFromRequest(request, url);
    if (!user || !user.email) {
      return new Response(JSON.stringify({ success: false, message: 'Authentication required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const pool = getPool();
    const email = user.email;

    // 1. Fetch from documents table
    const docsQuery = await pool.query(
      `SELECT * FROM documents 
       WHERE LOWER(user_email) = $1 OR (user_id = $2 AND $2 > 0)
       ORDER BY created_at DESC`,
      [email, user.userId]
    );

    // 2. Fetch from user_journey_checklists (for journey data, active_applications, and uploaded_documents)
    const journeyQuery = await pool.query(
      `SELECT id, user_email, destination, passport_country, purpose, visa_type, 
              uploaded_documents, active_applications, updated_at
       FROM user_journey_checklists 
       WHERE LOWER(user_email) = $1 LIMIT 1`,
      [email]
    );

    // 3. Fetch self applications
    const selfAppQuery = await pool.query(
      `SELECT id, visa_type, destination_country, travel_date, status, created_at,
              passport_number, passport_expiry
       FROM self_applications 
       WHERE LOWER(email) = $1 
       ORDER BY created_at DESC LIMIT 10`,
      [email]
    );

    // Compile documents list
    const compiledDocsMap: Record<string, any> = {};

    // A. Add documents from user_journey_checklists.uploaded_documents first
    if (journeyQuery.rows.length > 0) {
      try {
        const rawUploaded = journeyQuery.rows[0].uploaded_documents;
        const parsed = typeof rawUploaded === 'string' ? JSON.parse(rawUploaded || '{}') : rawUploaded;
        if (parsed && typeof parsed === 'object') {
          Object.entries(parsed).forEach(([k, d]: [string, any]) => {
            if (d && (d.title || d.label || d.fileData || d.docNumber || d.isUploaded || d.isRealUpload)) {
              compiledDocsMap[k] = {
                id: d.id || k,
                reqKey: d.reqKey || k,
                title: d.title || d.label || k,
                label: d.label || d.title || k,
                type: d.type || 'other',
                isUploaded: true,
                isRealUpload: true,
                docNumber: d.docNumber || d.ocrData?.documentNumber || d.ocrData?.docNumber || '',
                holderName: d.holderName || d.ocrData?.fullName || '',
                country: d.country || d.ocrData?.nationality || 'India',
                issuer: d.issuer || 'Official Record',
                expiryDate: d.expiryDate || d.ocrData?.expiryDate || 'Permanent',
                expirySubtext: d.expirySubtext || 'Valid',
                status: d.status || 'verified',
                scannedMethod: d.scannedMethod || 'OCR Scanned',
                uploadedAt: d.uploadedAt || 'Recently',
                size: d.size || '1.8 MB',
                fileData: d.fileData || null,
                ocrData: d.ocrData || null,
                summary: d.summary || d.subDetails || ''
              };
            }
          });
        }
      } catch (e) {}
    }

    // B. Merge rows from SQL documents table
    docsQuery.rows.forEach((row: any) => {
      const docKey = row.req_key || `doc_${row.id}`;
      let parsedOcr = null;
      try {
        parsedOcr = row.ocr_data ? JSON.parse(row.ocr_data) : null;
      } catch (e) {}

      compiledDocsMap[docKey] = {
        id: `db_doc_${row.id}`,
        sqlId: row.id,
        reqKey: row.req_key || docKey,
        title: row.label,
        label: row.file_name || row.label,
        type: row.document_type || 'other',
        isUploaded: true,
        isRealUpload: true,
        docNumber: row.doc_number || parsedOcr?.documentNumber || parsedOcr?.docNumber || '',
        holderName: row.holder_name || parsedOcr?.fullName || '',
        country: parsedOcr?.nationality || 'India',
        issuer: row.notes || 'Official Record',
        expiryDate: row.expiry_date || parsedOcr?.expiryDate || 'Permanent',
        expirySubtext: 'Valid',
        status: row.status || 'verified',
        scannedMethod: 'OCR Scanned',
        uploadedAt: row.created_at ? new Date(row.created_at).toLocaleDateString('en-GB') : 'Recently',
        size: row.file_size || '1.8 MB',
        fileData: row.file_data || row.file_url || null,
        ocrData: parsedOcr,
        summary: row.notes || ''
      };
    });

    const documentsList = Object.values(compiledDocsMap);

    // Compile active applications list
    let applicationsList: any[] = [];
    if (journeyQuery.rows.length > 0) {
      try {
        const rawApps = journeyQuery.rows[0].active_applications;
        if (rawApps) {
          const parsed = typeof rawApps === 'string' ? JSON.parse(rawApps) : rawApps;
          if (Array.isArray(parsed)) {
            applicationsList = parsed;
          }
        }
      } catch (e) {}
    }

    // Append any self applications if not present
    selfAppQuery.rows.forEach((sa: any) => {
      const saTracking = `TT-SA-2026-${sa.id}`;
      if (!applicationsList.some((a: any) => a.trackingId === saTracking || a.id === `sa-${sa.id}`)) {
        const dest = sa.destination_country || 'Global';
        applicationsList.push({
          id: `sa-${sa.id}`,
          customName: `${dest} ${sa.visa_type || 'Visa'}`,
          trackingId: saTracking,
          destination: dest,
          visaType: sa.visa_type ? `${sa.visa_type} Visa` : 'Self-Filing Visa',
          purpose: 'tourism',
          passport: 'India',
          status: sa.status === 'in_progress' ? 'Application Under Review' : (sa.status || 'Active Application'),
          stage: 'Consular Processing In Progress',
          progress: 45,
          documentsCount: documentsList.length || 1,
          submittedAt: sa.created_at ? new Date(sa.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently',
          targetDate: '10-15 Working Days'
        });
      }
    });

    return new Response(JSON.stringify({
      success: true,
      email,
      userId: user.userId,
      documents: documentsList,
      applications: applicationsList
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('API /api/user/vault-data GET error:', err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request, url }) => {
  try {
    await runMigrations();
    const body = await request.json();
    const { action, document, applications, email: bodyEmail } = body;

    const authUser = await resolveUserFromRequest(request, url);
    const email = (authUser?.email || bodyEmail || '').toLowerCase().trim();

    if (!email) {
      return new Response(JSON.stringify({ success: false, message: 'User email is required to persist data.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const pool = getPool();

    // ── 1. SAVE DOCUMENT ACTION ──
    if (action === 'save_document' && document) {
      const docKey = document.reqKey || document.id || `doc_${Date.now()}`;
      const title = document.title || document.label || 'Document';
      const docType = document.type || 'other';
      const docNumber = document.docNumber || document.ocrData?.documentNumber || document.ocrData?.docNumber || '';
      const holderName = document.holderName || document.ocrData?.fullName || '';
      const expiryDate = document.expiryDate || document.ocrData?.expiryDate || 'Permanent';
      const size = document.size || '1.8 MB';
      const ocrDataStr = document.ocrData ? JSON.stringify(document.ocrData) : null;
      // Cap fileData to avoid exceeding payload limits if massive
      const fileData = document.fileData && document.fileData.length < 5 * 1024 * 1024 ? document.fileData : null;
      const notes = document.summary || document.subDetails || '';

      // A. Insert/Update in documents table
      const existingDoc = await pool.query(
        `SELECT id FROM documents WHERE LOWER(user_email) = $1 AND (req_key = $2 OR label = $3) LIMIT 1`,
        [email, docKey, title]
      );

      if (existingDoc.rows.length > 0) {
        await pool.query(
          `UPDATE documents SET
             file_name = $1,
             file_size = $2,
             document_type = $3,
             doc_number = $4,
             holder_name = $5,
             expiry_date = $6,
             ocr_data = $7,
             file_data = COALESCE($8, file_data),
             notes = $9,
             status = 'verified'
           WHERE id = $10`,
          [document.label || title, size, docType, docNumber, holderName, expiryDate, ocrDataStr, fileData, notes, existingDoc.rows[0].id]
        );
      } else {
        await pool.query(
          `INSERT INTO documents (
             user_id, user_type, label, status, document_type, file_name,
             file_size, notes, user_email, ocr_data, expiry_date, doc_number, req_key, holder_name, file_data
           ) VALUES (
             $1, 'seeker', $2, 'verified', $3, $4,
             $5, $6, $7, $8, $9, $10, $11, $12, $13
           )`,
          [
            authUser?.userId || 0,
            title,
            docType,
            document.label || title,
            size,
            notes,
            email,
            ocrDataStr,
            expiryDate,
            docNumber,
            docKey,
            holderName,
            fileData
          ]
        );
      }

      // B. Sync with user_journey_checklists.uploaded_documents
      const jRes = await pool.query(`SELECT uploaded_documents FROM user_journey_checklists WHERE LOWER(user_email) = $1 LIMIT 1`, [email]);
      let currentUploaded: Record<string, any> = {};
      if (jRes.rows.length > 0) {
        try {
          const raw = jRes.rows[0].uploaded_documents;
          currentUploaded = typeof raw === 'string' ? JSON.parse(raw || '{}') : (raw || {});
        } catch (e) {}
      }

      // Store cleaned document object without excessive raw fileData in JSON blob
      currentUploaded[docKey] = {
        ...document,
        reqKey: docKey,
        isUploaded: true,
        isRealUpload: true,
        status: 'verified',
        fileData: fileData ? fileData.slice(0, 50000) : null // Store thumbnail/snippet in JSON
      };

      await pool.query(
        `INSERT INTO user_journey_checklists (user_email, uploaded_documents, updated_at)
         VALUES ($1, $2, CURRENT_TIMESTAMP)
         ON CONFLICT (user_email) DO UPDATE SET
           uploaded_documents = EXCLUDED.uploaded_documents,
           updated_at = CURRENT_TIMESTAMP`,
        [email, JSON.stringify(currentUploaded)]
      );

      // C. If passport details, sync with seekers profile
      if (docType === 'passport' || docKey.includes('passport')) {
        if (holderName || document.country || document.ocrData?.dob) {
          await pool.query(
            `UPDATE seekers SET 
               passport_country = COALESCE($1, passport_country),
               date_of_birth = COALESCE($2, date_of_birth)
             WHERE LOWER(email) = $3`,
            [document.country || null, document.ocrData?.dob || null, email]
          );
        }
      }

      return new Response(JSON.stringify({ success: true, message: 'Document saved to account in Neon DB!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // ── 2. SAVE APPLICATIONS ACTION ──
    if (action === 'save_applications' && Array.isArray(applications)) {
      await pool.query(
        `INSERT INTO user_journey_checklists (user_email, active_applications, updated_at)
         VALUES ($1, $2, CURRENT_TIMESTAMP)
         ON CONFLICT (user_email) DO UPDATE SET
           active_applications = EXCLUDED.active_applications,
           updated_at = CURRENT_TIMESTAMP`,
        [email, JSON.stringify(applications)]
      );

      return new Response(JSON.stringify({ success: true, message: 'Applications saved to account in Neon DB!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // ── 3. DELETE DOCUMENT ACTION ──
    if (action === 'delete_document' && body.docKey) {
      const docKey = body.docKey;
      await pool.query(
        `DELETE FROM documents WHERE LOWER(user_email) = $1 AND (req_key = $2 OR label = $2)`,
        [email, docKey]
      );

      const jRes = await pool.query(`SELECT uploaded_documents FROM user_journey_checklists WHERE LOWER(user_email) = $1 LIMIT 1`, [email]);
      if (jRes.rows.length > 0) {
        try {
          const raw = jRes.rows[0].uploaded_documents;
          const currentUploaded = typeof raw === 'string' ? JSON.parse(raw || '{}') : (raw || {});
          delete currentUploaded[docKey];
          await pool.query(
            `UPDATE user_journey_checklists SET uploaded_documents = $1, updated_at = CURRENT_TIMESTAMP WHERE LOWER(user_email) = $2`,
            [JSON.stringify(currentUploaded), email]
          );
        } catch (e) {}
      }

      return new Response(JSON.stringify({ success: true, message: 'Document removed from account.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: false, message: 'Unknown action' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('API /api/user/vault-data POST error:', err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
