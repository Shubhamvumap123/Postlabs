import fs from 'fs';

const memoryPath = '.jules/bolt.md';
let memoryContent = '';

if (fs.existsSync(memoryPath)) {
  memoryContent = fs.readFileSync(memoryPath, 'utf8');
}

if (!memoryContent.includes('Inverted Image Loading Strategies Anti-Pattern')) {
  const entry = `\n## 2024-05-18 - Inverted Image Loading Strategies Anti-Pattern
**Learning:** Found a systemic anti-pattern where critical above-the-fold images (Header logo, Hero down arrow) were intentionally deferred using \`loading="lazy"\`, actively delaying the Largest Contentful Paint (LCP) and worsening initial render times. Conversely, deeply nested below-the-fold images (e.g., in the Footer, PrivacySection, CardSection) were missing lazy loading entirely, bloating the initial payload.
**Action:** Always eagerly load above-the-fold critical images (use \`fetchPriority="high"\` where appropriate) and explicitly apply \`loading="lazy"\` to all below-the-fold images. Never apply \`loading="lazy"\` to LCP elements.\n`;
  fs.appendFileSync(memoryPath, entry);
}
