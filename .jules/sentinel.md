## 2025-05-18 - Input Length Limits (DoS Mitigation)
**Vulnerability:** Missing input length bounds on user forms
**Learning:** Application inputs without length limits expose the app to Denial of Service via massive payloads, exhausting client and potential server resources.
**Prevention:** Always add explicit `maxLength` limits to `<input>` and `<textarea>` components as a baseline defense-in-depth measure.
