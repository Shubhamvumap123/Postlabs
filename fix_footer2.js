const fs = require('fs');
let content = fs.readFileSync('client/src/components/Footer.tsx', 'utf-8');
content = content.replace('import { useEffect, useRef, useState } from "react";', 'import { useEffect, useRef } from "react";');
fs.writeFileSync('client/src/components/Footer.tsx', content);
