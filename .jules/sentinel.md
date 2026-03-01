## 2024-05-18 - [Fix Missing noopener on Target Blank links]
**Vulnerability:** External links were found using `target="_blank"` without corresponding `rel="noopener noreferrer"` attributes.
**Learning:** This repo lacked consistent `noopener noreferrer` attributes on external links, making it susceptible to reverse tabnabbing. This is a common React vulnerability.
**Prevention:** Ensure all `target="_blank"` links have `rel="noopener noreferrer"`.
