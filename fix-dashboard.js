import fs from 'fs';
let code = fs.readFileSync('client/src/pages/Dashboard.tsx', 'utf-8');
code = code.replace("  const fetchJobs = async () => {", "  const fetchJobs = useCallback(async () => {");
code = code.replace("import { useState, useEffect, useMemo } from 'react';", "import { useState, useEffect, useMemo, useCallback } from 'react';");
fs.writeFileSync('client/src/pages/Dashboard.tsx', code);
