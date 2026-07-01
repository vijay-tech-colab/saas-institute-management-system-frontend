const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function walk(dir) {
    let results = [];
    const list = await readdir(dir);
    for (const file of list) {
        const filePath = path.resolve(dir, file);
        const fileStat = await stat(filePath);
        if (fileStat && fileStat.isDirectory()) {
            results = results.concat(await walk(filePath));
        } else if (filePath.endsWith('.tsx')) {
            results.push(filePath);
        }
    }
    return results;
}

async function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it has a table and an empty state
    if (!content.includes('isTableLoading') || !content.includes('length === 0')) return;
    
    const emptyStateRegex = /\{!isTableLoading\s*&&\s*([\w.]+)\.length\s*===\s*0\s*&&\s*\([\s\S]*?<([A-Z]\w+)\s+className="[^"]*w-10\s+h-10[^"]*"[\s\S]*?<p[^>]*>([^<]+)<\/p>([\s\S]*?)(?:<p[^>]*>([^<]+)<\/p>)?[\s\S]*?<\/div>\s*\)\}/g;
    
    let match = emptyStateRegex.exec(content);
    if (!match) return;

    const arrayName = match[1];
    const iconName = match[2];
    const title = match[3];
    const rawDescMatch = match[5];
    const description = rawDescMatch ? rawDescMatch.trim() : `No ${title.toLowerCase()} found.`;
    
    console.log(`Processing ${filePath}...`);
    
    // Remove old empty state
    content = content.replace(match[0], '');
    
    // Replace the mapping branch
    // Usually it looks like:
    // {isTableLoading ? ( ... ) : ( \n array.map(
    // We want to change to:
    // {isTableLoading ? ( ... ) : array.length > 0 ? ( \n array.map(
    
    const mapRegex = /\)\s*:\s*\(\s*([\w.]+)\.map\(/;
    if (mapRegex.test(content)) {
        content = content.replace(mapRegex, `) : ${arrayName}.length > 0 ? (\n                $1.map(`);
        
        // Find </tbody> and insert the new empty state right before it
        const tbodyEndRegex = /\)\}\s*<\/tbody>/;
        if (tbodyEndRegex.test(content)) {
            const emptyStateComponent = `) : (
                <tr>
                  <td colSpan={10} className="p-8">
                    <EmptyState 
                      icon={${iconName}}
                      title="${title}"
                      description="${description}"
                    />
                  </td>
                </tr>
              )}
            </tbody>`;
            content = content.replace(tbodyEndRegex, emptyStateComponent);
            
            // Add import if missing
            if (!content.includes("EmptyState")) {
                content = content.replace(/import { Checkbox } from "[^"]+";/, `import { Checkbox } from "@/components/ui/checkbox";\nimport { EmptyState } from '@/components/ui/empty-state';`);
            }
            if (!content.includes("EmptyState")) { // Fallback if Checkbox isn't there
                 content = `import { EmptyState } from '@/components/ui/empty-state';\n` + content;
            }

            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
}

async function main() {
    const files = await walk(path.join(__dirname, 'src', 'features'));
    for (const file of files) {
        try {
            await processFile(file);
        } catch (e) {
            console.error(`Error processing ${file}:`, e);
        }
    }
}

main();
