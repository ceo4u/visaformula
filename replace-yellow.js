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
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;

            // Replaces for Star components
            if (content.includes('text-[#0ea5e9]') && content.includes('<Star')) {
                // If it's a star, change to yellow
                content = content.replace(/className=\"([^\"]*)text-\[\#0ea5e9\]([^\"]*)\"/g, (match, p1, p2) => {
                    return `className="${p1}text-yellow-500${p2}"`;
                });
                changed = true;
            }

            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated Yellow: ${fullPath}`);
            }
        }
    }
}

replaceInDir(path.join(__dirname, 'app'));
replaceInDir(path.join(__dirname, 'components'));
