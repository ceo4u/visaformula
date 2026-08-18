import fs from 'fs';
import path from 'path';

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      if (!filepath.includes('node_modules') && !filepath.includes('.git') && !filepath.includes('.astro') && !filepath.includes('dist')) {
        walk(filepath, filelist);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.astro') || file.endsWith('.jsx') || file.endsWith('.html') || file.endsWith('.css')) {
      filelist.push(filepath);
    }
  }
  return filelist;
}

const files = walk('src');
let changedFiles = 0;

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  const original = content;

  // Replace font classnames with font-sans
  content = content.replace(/\bfont-sora\b/g, 'font-sans');
  content = content.replace(/\bfont-montserrat\b/g, 'font-sans');
  content = content.replace(/\bfont-poppins\b/g, 'font-sans');
  content = content.replace(/\bfont-dmsans\b/g, 'font-sans');
  content = content.replace(/\bfont-roboto\b/g, 'font-sans');

  // Replace inline styles
  content = content.replace(/fontFamily:\s*['"][^'"]*Sora[^'"]*['"]/gi, "fontFamily: `'Plus Jakarta Sans', sans-serif`");
  content = content.replace(/fontFamily:\s*['"][^'"]*Montserrat[^'"]*['"]/gi, "fontFamily: `'Plus Jakarta Sans', sans-serif`");
  content = content.replace(/fontFamily:\s*['"][^'"]*Poppins[^'"]*['"]/gi, "fontFamily: `'Plus Jakarta Sans', sans-serif`");

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    changedFiles++;
    console.log('Updated font in:', f);
  }
}
console.log('Total files updated:', changedFiles);
