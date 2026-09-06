## 2025-04-11 - [Input Length Limits Missing]
**Vulnerability:** User inputs (names, emails, messages, tasks) lacked `maxLength` boundaries in the HTML.
**Learning:** Missing input constraints can lead to overly large payloads, potentially causing client-side DoS or performance issues when saving to `localStorage` or submitting forms.
**Prevention:** Always enforce reasonable `maxLength` attributes on user-facing inputs to provide a first line of defense.
