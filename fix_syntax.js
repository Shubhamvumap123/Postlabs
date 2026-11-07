const fs = require('fs');
const content = fs.readFileSync('client/src/pages/Dashboard.tsx', 'utf-8');
const newContent = content.replace('  }, [navigate]);', '  };');
fs.writeFileSync('client/src/pages/Dashboard.tsx', newContent);
