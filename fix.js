import fs from 'fs';
const file = 'client/src/pages/Dashboard.tsx';
let code = fs.readFileSync(file, 'utf-8');
if (code.includes('  }, [navigate]);')) {
  console.log('Found problematic line');
} else {
  console.log('Could not find problematic line');
}
