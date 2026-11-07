const fs = require('fs');
const content = fs.readFileSync('client/src/components/Footer.tsx', 'utf-8');
const newContent = content.replace('  const isInView = useInView(sentinelRef, { once: true });\n\n  return (', '  return (');
fs.writeFileSync('client/src/components/Footer.tsx', newContent);
