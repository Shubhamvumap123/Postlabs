const fs = require('fs');

function replaceRegex(file, regex, replacement) {
  try {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
  } catch (e) {
    console.error(e);
  }
}

replaceRegex('client/src/pages/Dashboard.tsx', /import \{ useState, useEffect, useMemo \} from 'react';/, 'import { useState, useEffect, useMemo, useCallback } from \'react\';');
replaceRegex('client/src/pages/Dashboard.tsx', /const fetchJobs = async \(\) => \{/, 'const fetchJobs = useCallback(async () => {');
replaceRegex('client/src/pages/Dashboard.tsx', /  \}, \[navigate\]\);/, '  // eslint-disable-next-line react-hooks/exhaustive-deps\n  }, []);');
replaceRegex('client/src/pages/Dashboard.tsx', /  useEffect\(\(\) => \{\n    fetchJobs\(\);\n  \}, \[fetchJobs\]\);\n/, '');
