const fs = require('fs');
const path = require('path');

const journalPath = path.join('.jules', 'palette.md');
const today = new Date().toISOString().split('T')[0];

const newEntry = `## ${today} - Navigation Link Accessibility
**Learning:** Using responsive utility classes (like \`hidden sm:inline\`) to visually hide link text on mobile devices creates accessibility issues where screen readers only see icon-only links without accessible names.
**Action:** When hiding text inside interactive elements (buttons/links) responsively, always explicitly define an \`aria-label\` on the parent element and add \`aria-hidden="true"\` to purely decorative child icons.

`;

if (!fs.existsSync(path.dirname(journalPath))) {
  fs.mkdirSync(path.dirname(journalPath), { recursive: true });
}

fs.appendFileSync(journalPath, newEntry);
console.log('Successfully updated palette journal.');
