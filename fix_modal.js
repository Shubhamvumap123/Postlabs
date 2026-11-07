const fs = require('fs');
const content = fs.readFileSync('client/src/components/JobModal.tsx', 'utf-8');
const newContent = content.replace(/interface Job {\n  _id\?: string;\n  company: string;\n  position: string;\n  status: string;\n/g, 'export interface Job {\n  _id\?: string;\n  company: string;\n  position: string;\n  status: string;\n');
fs.writeFileSync('client/src/components/JobModal.tsx', newContent);
