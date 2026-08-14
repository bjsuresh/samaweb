# Bluehost PHP mail API

This folder replaces `Samaweb-nodejs/server.js` on standard Bluehost PHP hosting.

1. Build Angular with `npm run build` and upload the browser build to `public_html`.
2. Upload this folder's files to `public_html/api/`.
3. Confirm `support@supracontrols.com` exists in Bluehost and that PHP `mail()` is enabled.
4. Update the domains in `config.php` if the production hostname differs.
5. Test each website form. Failed sends are recorded in the hosting PHP error log.

The API URLs are relative (`/api/mail.php?action=...`), so no Node process, port 3000, or CORS configuration is needed in production. The endpoint validates required fields, escapes all submitted content, limits each attachment to 10 MB, and supports contact, careers, support, and demo requests.

If the domain's mail is hosted at Zoho and Bluehost `mail()` has poor deliverability, configure SPF/DKIM in DNS or replace `send_html_mail()` with PHPMailer using Zoho SMTP. Do not put the SMTP password in a public or committed file.
