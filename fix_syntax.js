const fs = require('fs');
const content = fs.readFileSync('client/src/pages/Dashboard.tsx', 'utf8');
const lines = content.split('\n');
const navigateLine = lines.findIndex(l => l.includes('}, [navigate]);'));
if (navigateLine !== -1) {
  lines[navigateLine] = '  }, [navigate]);';
}
const useMemoLine = lines.findIndex(l => l.includes('import { useState, useEffect, useMemo } from \'react\';'));
if (useMemoLine !== -1) {
    lines[useMemoLine] = 'import { useState, useEffect, useMemo, useCallback } from \'react\';';
}
const fetchJobsStart = lines.findIndex(l => l.includes('const fetchJobs = async () => {'));
if (fetchJobsStart !== -1) {
    lines[fetchJobsStart] = '  const fetchJobs = useCallback(async () => {';
}

fs.writeFileSync('client/src/pages/Dashboard.tsx', lines.join('\n'));
