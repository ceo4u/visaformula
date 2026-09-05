import { dashboardDestinationOptions, dashboardPassportOptions } from './constants';

export function normalizeCountryName(val: string): string {
  const s = (val || '').toLowerCase().trim();
  if (!s) return 'United States';
  if ((s.includes('unit') && s.includes('state')) || s === 'us' || s === 'usa' || s.includes('america') || s === 'american') return 'United States';
  if (s.includes('emirate') || s.includes('uae') || s.includes('dubai') || s.includes('abu dhabi') || s.includes('emirati')) return 'United Arab Emirates';
  if (s.includes('india') || s === 'in' || s.includes('indian')) return 'India';
  if (s.includes('kingdom') || s === 'uk' || s.includes('britain') || s.includes('british') || s.includes('england')) return 'United Kingdom';
  if (s.includes('canada') || s.includes('canadian')) return 'Canada';
  if (s.includes('australia') || s.includes('australian')) return 'Australia';
  if (s.includes('germany') || s.includes('german') || s.includes('deutschland')) return 'Germany';
  if (s.includes('nepal') || s.includes('nepalese') || s.includes('nepali')) return 'Nepal';
  if (s.includes('bangladesh') || s.includes('bangladeshi')) return 'Bangladesh';
  if (s.includes('sri lanka') || s.includes('sri lankan')) return 'Sri Lanka';
  if (s.includes('philippine') || s.includes('filipino')) return 'Philippines';
  if (s.includes('nigeria') || s.includes('nigerian')) return 'Nigeria';
  if (s.includes('pakistan') || s.includes('pakistani')) return 'Pakistan';
  if (s.includes('france') || s.includes('french')) return 'France';
  if (s.includes('new zealand') || s.includes('kiwi')) return 'New Zealand';
  if (s.includes('ireland') || s.includes('irish')) return 'Ireland';
  if (s.includes('singapore') || s.includes('singaporean')) return 'Singapore';
  if (s.includes('japan') || s.includes('japanese')) return 'Japan';
  if (s.includes('jordan') || s.includes('jordanian')) return 'Jordan';
  return val;
}

export function getFlagEmoji(countryName: string): string {
  if (!countryName) return '🌍';
  const clean = countryName.toLowerCase().trim();
  const dest = dashboardDestinationOptions.find(d => 
    d.value.toLowerCase() === clean || 
    d.label.toLowerCase().includes(clean) || 
    clean.includes(d.value.toLowerCase())
  );
  if (dest?.flag) return dest.flag;
  const pass = dashboardPassportOptions.find(p => 
    p.value.toLowerCase() === clean || 
    p.label.toLowerCase().includes(clean) || 
    clean.includes(p.value.toLowerCase())
  );
  if (pass?.flag) return pass.flag;

  const map: Record<string, string> = {
    'india': '🇮🇳', 'united states': '🇺🇸', 'usa': '🇺🇸', 'united kingdom': '🇬🇧', 'uk': '🇬🇧',
    'canada': '🇨🇦', 'australia': '🇦🇺', 'germany': '🇩🇪', 'france': '🇫🇷', 'italy': '🇮🇹',
    'spain': '🇪🇸', 'greece': '🇬🇷', 'netherlands': '🇳🇱', 'switzerland': '🇨🇭', 'japan': '🇯🇵',
    'singapore': '🇸🇬', 'united arab emirates': '🇦🇪', 'uae': '🇦🇪', 'dubai': '🇦🇪',
    'saudi arabia': '🇸🇦', 'qatar': '🇶🇦', 'thailand': '🇹🇭', 'malaysia': '🇲🇾', 'indonesia': '🇮🇩',
    'vietnam': '🇻🇳', 'turkey': '🇹🇷', 'china': '🇨🇳', 'south korea': '🇰🇷', 'new zealand': '🇳🇿',
    'ireland': '🇮🇪', 'russia': '🇷🇺', 'brazil': '🇧🇷', 'south africa': '🇿🇦', 'egypt': '🇪🇬',
    'mexico': '🇲🇽', 'portugal': '🇵🇹', 'austria': '🇦🇹', 'belgium': '🇧🇪', 'sweden': '🇸🇪',
    'norway': '🇳🇴', 'denmark': '🇩🇰', 'finland': '🇫🇮', 'poland': '🇵🇱', 'czech republic': '🇨🇿',
    'hungary': '🇭🇺'
  };
  for (const [key, flag] of Object.entries(map)) {
    if (clean.includes(key)) return flag;
  }
  return '🌍';
}

export function getCountryCode(countryName: string): string {
  if (!countryName) return 'un';
  const c = countryName.toLowerCase().trim();
  if (c.includes('india') || c === 'in' || c === 'indian') return 'in';
  if (c.includes('mauritius') || c === 'mu') return 'mu';
  if (c.includes('maldives') || c === 'mv') return 'mv';
  if (c.includes('thailand') || c === 'th' || c === 'thai') return 'th';
  if (c.includes('malaysia') || c === 'my') return 'my';
  if (c.includes('sri lanka') || c === 'lk') return 'lk';
  if (c.includes('nepal') || c === 'np') return 'np';
  if (c.includes('bhutan') || c === 'bt') return 'bt';
  if (c.includes('indonesia') || c.includes('bali') || c === 'id') return 'id';
  if (c.includes('vietnam') || c === 'vn') return 'vn';
  if (c.includes('united kingdom') || c.includes('uk') || c.includes('england') || c.includes('britain')) return 'gb';
  if (c.includes('united states') || c.includes('usa') || c.includes('us') || c.includes('america')) return 'us';
  if (c.includes('greece') || c === 'gr' || c === 'greek') return 'gr';
  if (c.includes('uae') || c.includes('dubai') || c.includes('emirates') || c.includes('united arab')) return 'ae';
  if (c.includes('canada') || c === 'ca') return 'ca';
  if (c.includes('australia') || c === 'au') return 'au';
  if (c.includes('germany') || c === 'de') return 'de';
  if (c.includes('france') || c === 'fr') return 'fr';
  if (c.includes('italy') || c === 'it') return 'it';
  if (c.includes('spain') || c === 'es') return 'es';
  if (c.includes('singapore') || c === 'sg') return 'sg';
  if (c.includes('japan') || c === 'jp') return 'jp';
  if (c.includes('switzerland') || c === 'ch') return 'ch';
  if (c.includes('netherlands') || c === 'nl') return 'nl';
  if (c.includes('austria') || c === 'at') return 'at';
  if (c.includes('portugal') || c === 'pt') return 'pt';
  if (c.includes('new zealand') || c === 'nz') return 'nz';
  if (c.includes('schengen') || c.includes('europe') || c === 'eu') return 'eu';
  if (c.includes('turkey') || c.includes('turkiye') || c === 'tr') return 'tr';
  if (c.includes('china') || c === 'cn') return 'cn';
  if (c.includes('russia') || c === 'ru') return 'ru';
  if (c.includes('south korea') || c === 'kr') return 'kr';
  if (c.includes('saudi') || c === 'sa') return 'sa';
  if (c.includes('qatar') || c === 'qa') return 'qa';
  if (c.includes('oman') || c === 'om') return 'om';
  if (c.includes('kuwait') || c === 'kw') return 'kw';
  if (c.includes('bahrain') || c === 'bh') return 'bh';
  if (c.includes('egypt') || c === 'eg') return 'eg';
  if (c.includes('kenya') || c === 'ke') return 'ke';
  if (c.includes('south africa') || c === 'za') return 'za';
  if (c.includes('brazil') || c === 'br') return 'br';
  if (c.includes('mexico') || c === 'mx') return 'mx';
  if (c.includes('ireland') || c === 'ie') return 'ie';
  if (c.includes('philippines') || c === 'ph') return 'ph';
  if (c.includes('georgia') || c === 'ge') return 'ge';
  if (c.includes('kazakhstan') || c === 'kz') return 'kz';
  return 'un';
}
