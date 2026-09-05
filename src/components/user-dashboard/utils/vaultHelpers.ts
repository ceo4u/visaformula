export function cleanShortDocRequirement(title: string, description: string): string {
  const t = (title || '').toLowerCase();
  if (t.includes('passport') && !t.includes('photo')) {
    return 'Min. 6 months validity from travel date & 2 blank visa pages.';
  }
  if (t.includes('application form') || t.includes('schengen visa application')) {
    return 'Completed & signed official visa form (GVCW / Embassy portal).';
  }
  if (t.includes('photo') || t.includes('photograph')) {
    return '2 recent color photos (35×45mm, white background, taken within 6 months).';
  }
  if (t.includes('insurance')) {
    return 'Min. €30,000 medical coverage across all Schengen countries & dates.';
  }
  if (t.includes('flight') || t.includes('ticket') || t.includes('pnr')) {
    return 'Confirmed round-trip flight booking with verifiable airline PNR.';
  }
  if (t.includes('accommodation') || t.includes('hotel')) {
    return 'Confirmed hotel vouchers or official host invitation covering full stay.';
  }
  if (t.includes('itinerary') || t.includes('cover letter')) {
    return 'Covering letter with day-by-day travel plan and cities to visit.';
  }
  if (t.includes('employment') || t.includes('occupation') || t.includes('noc')) {
    return 'Salary slips (last 3 mos) + Employer NOC letter (or Business registration).';
  }
  if (t.includes('bank') || t.includes('statement')) {
    return 'Original 3 to 6 months bank statements stamped & signed by branch.';
  }
  if (t.includes('itr') || t.includes('tax') || t.includes('income tax')) {
    return 'Last 2 financial years ITR-V acknowledgements.';
  }

  if (description) {
    const firstSentence = description.split(/(?<=[.!?])\s+|\n+/)[0] || '';
    if (firstSentence.length > 85) {
      return firstSentence.slice(0, 80).trim() + '...';
    }
    return firstSentence.trim();
  }
  return 'Mandatory consular compliance document.';
}

export function computeExpiryStatus(expiryDateStr?: string): {
  status: 'valid' | 'expiring_soon' | 'expired' | 'permanent' | 'pending';
  subtext: string;
  pillClass: string;
} {
  if (!expiryDateStr || expiryDateStr === '—' || expiryDateStr === '-') {
    return { status: 'pending', subtext: 'Upload Required', pillClass: 'text-amber-500 font-bold text-xs' };
  }
  const lower = expiryDateStr.toLowerCase();
  if (lower.includes('permanent') || lower.includes('no expiry') || lower.includes('lifetime')) {
    return { status: 'permanent', subtext: 'No Expiry', pillClass: 'text-[#00a896] font-bold text-xs' };
  }
  if (lower.includes('recent') || lower.includes('6 month') || lower.includes('bank') || lower.includes('solvency')) {
    return { status: 'valid', subtext: 'Valid for Visa', pillClass: 'text-[#00a896] font-bold text-xs' };
  }
  if (lower.includes('photo') || lower.includes('< 6 month') || lower.includes('biometric')) {
    return { status: 'valid', subtext: 'Consular Compliant', pillClass: 'text-[#00a896] font-bold text-xs' };
  }
  if (lower.includes('flight') || lower.includes('ticket') || lower.includes('itinerary') || lower.includes('confirmed itinerary')) {
    return { status: 'valid', subtext: 'Confirmed Itinerary', pillClass: 'text-[#00a896] font-bold text-xs' };
  }
  if (lower.includes('accommodation') || lower.includes('hotel') || lower.includes('stay') || lower.includes('confirmed stay')) {
    return { status: 'valid', subtext: 'Confirmed Stay', pillClass: 'text-[#00a896] font-bold text-xs' };
  }
  if (lower.includes('employment') || lower.includes('salary') || lower.includes('job') || lower.includes('active')) {
    return { status: 'valid', subtext: 'Current Employment', pillClass: 'text-[#00a896] font-bold text-xs' };
  }
  const d = new Date(expiryDateStr);
  if (isNaN(d.getTime())) {
    return { status: 'valid', subtext: 'Valid on File', pillClass: 'text-[#00a896] font-bold text-xs' };
  }
  const diffMs = d.getTime() - Date.now();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 0) {
    return { status: 'expired', subtext: 'Expired', pillClass: 'text-rose-600 font-bold text-xs' };
  }
  if (diffDays <= 60) {
    return { status: 'expiring_soon', subtext: `Expires in ${diffDays} days`, pillClass: 'text-amber-500 font-bold text-xs' };
  }
  const years = Math.floor(diffDays / 365);
  if (years >= 1) {
    return { status: 'valid', subtext: `Valid for ${years} ${years === 1 ? 'year' : 'years'}`, pillClass: 'text-[#00a896] font-bold text-xs' };
  }
  const months = Math.floor(diffDays / 30);
  return { status: 'valid', subtext: `Valid for ${months} ${months === 1 ? 'month' : 'months'}`, pillClass: 'text-[#00a896] font-bold text-xs' };
}

export function formatDatePreview(dateStr?: string, fallback: string = '—'): string {
  if (!dateStr || dateStr === '—') return fallback;
  try {
    const s = String(dateStr).trim();
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(s)) return s;
    const d = new Date(s);
    if (!isNaN(d.getTime())) {
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      return `${dd}/${mm}/${d.getFullYear()}`;
    }
    return s;
  } catch(e) {
    return fallback;
  }
}

export function formatDateOcr(dateStr?: string, fallback: string = '—'): string {
  if (!dateStr || dateStr === '—') return fallback;
  try {
    const s = String(dateStr).trim();
    const parts = s.split('/');
    if (parts.length === 3) {
      const d = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      }
    }
    const d = new Date(s);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }
    return s;
  } catch(e) {
    return fallback;
  }
}
