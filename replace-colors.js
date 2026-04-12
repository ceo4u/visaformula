const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('.next') && !fullPath.includes('.git')) {
                replaceInDir(fullPath);
            }
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;

            // Replaces
            if (content.includes('#c41200')) {
                content = content.replace(/#c41200/g, '#0ea5e9'); // Light blue
                changed = true;
            }
            if (content.includes('#a00f00')) {
                content = content.replace(/#a00f00/g, '#0284c7'); // Darker blue
                changed = true;
            }
            if (content.includes('bg-red-50')) {
                content = content.replace(/bg-red-50/g, 'bg-sky-50');
                changed = true;
            }
            if (content.includes('border-red-200')) {
                content = content.replace(/border-red-200/g, 'border-sky-200');
                changed = true;
            }
            if (content.includes('text-red-700')) {
                content = content.replace(/text-red-700/g, 'text-sky-700');
                changed = true;
            }

            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

replaceInDir(path.join(__dirname, 'app'));
replaceInDir(path.join(__dirname, 'components'));
replaceInDir(__dirname);
