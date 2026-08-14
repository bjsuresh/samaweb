<?php
declare(strict_types=1);

// Keep this file outside public_html when possible and update the require path
// in mail.php. Never commit real mailbox passwords to source control.
return [
    'from_email' => 'support@supracontrols.com',
    'from_name'  => 'Supra Controls No-Reply',
    'team_email' => 'support@supracontrols.com',
    'max_file_bytes' => 10 * 1024 * 1024,
    'allowed_origins' => [
        'https://www.supracontrols.com',
        'https://supracontrols.com',
    ],
];
