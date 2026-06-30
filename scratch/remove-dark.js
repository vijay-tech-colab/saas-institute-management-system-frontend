const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  // Replace dark:[a-zA-Z0-9/-]+ with empty string, taking care of multiple spaces
  content = content.replace(/dark:[a-zA-Z0-9/-]+\s?/g, '');
  content = content.replace(/\s+/g, ' ').replace(/ "\}/g, '"}').replace(/ \`/g, '`');
  // Just a simpler regex that handles spaces better:
  // actually, let's just do content = content.replace(/\s*dark:[a-zA-Z0-9/-]+\s*/g, ' ');
  // To avoid breaking line breaks or tabs:
  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;
      content = content.replace(/dark:[a-zA-Z0-9/-]+/g, '');
      // Clean up multiple spaces inside class names
      content = content.replace(/className=(["'])(.*?)\1/g, (match, quote, inner) => {
        return `className=${quote}${inner.replace(/\s+/g, ' ').trim()}${quote}`;
      });
      content = content.replace(/className=\{`(.*?)`\}/g, (match, inner) => {
        return `className={\`${inner.replace(/  +/g, ' ').trim()}\`}`;
      });
      if (original !== content) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir('src/features/support-tickets');
