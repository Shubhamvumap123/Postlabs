import fs from 'fs';
const code = fs.readFileSync('client/src/pages/Dashboard.tsx', 'utf-8');
const lines = code.split('\n');
console.log(lines[48]);
