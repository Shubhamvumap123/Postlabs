const fs = require('fs');
const content = fs.readFileSync('client/src/context/AuthContext.tsx', 'utf-8');
const newContent = content.replace(/interface JwtPayload {\n  user: User;\n}\n\n/g, '');
fs.writeFileSync('client/src/context/AuthContext.tsx', newContent);
