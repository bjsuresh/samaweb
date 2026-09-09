<?php
declare(strict_types=1);

$config = require __DIR__ . '/config.php';

header('Content-Type: text/plain; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && in_array($origin, $config['allowed_origins'], true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail(405, 'Method not allowed');
}

$action = strtolower((string)($_GET['action'] ?? ''));
if (!in_array($action, ['support', 'contact', 'careers', 'demo'], true)) {
    fail(404, 'Unknown mail action');
}

$data = request_data();
$email = field($data, 'email', 254);
$name = field($data, 'name', 120);
if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(422, 'A valid name and email address are required');
}

$attachments = uploaded_files($config['max_file_bytes']);

switch ($action) {
    case 'support':
        $token = field($data, 'tokenId', 80);
        $product = field($data, 'product', 200);
        $description = field($data, 'description', 5000);
        if ($token === '' || $product === '' || $description === '') fail(422, 'Missing support request details');
        $teamBody = rows([
            'Token ID' => $token, 'Name' => $name,
            'Company' => field($data, 'companyname', 200),
            'Location' => field($data, 'location', 200), 'Email' => $email,
            'Mobile' => field($data, 'mobile', 40), 'Product' => $product,
        ]) . section('Description', $description);
        $teamSubject = "[Support #$token] $product";
        $userSubject = "Your Support Request Has Been Received - Supra Controls [#$token]";
        $userBody = '<p>Thank you for reaching out to us. We have received your support request and our team will get back to you within <strong>24-48 hours</strong>.</p>'
            . '<p>Your support token ID is:</p><div class="token-box">' . e($token) . '</div>'
            . section('Summary of your request', "Product: $product\nDescription: $description");
        break;

    case 'contact':
        $subject = field($data, 'subject', 200) ?: 'General Enquiry';
        $message = field($data, 'message', 5000);
        if ($message === '') fail(422, 'Message is required');
        $teamBody = rows(['Name' => $name, 'Email' => $email, 'Mobile' => field($data, 'mobile', 40), 'Subject' => $subject])
            . section('Message', $message);
        $teamSubject = "[Contact Us] $subject - from $name";
        $userSubject = "We've Received Your Message - Supra Controls";
        $userBody = '<p>Thank you for contacting Supra Controls. We have received your message and our team will get back to you within <strong>24-48 hours</strong>.</p>'
            . section('Your message summary', "Subject: $subject\nMessage: $message");
        break;

    case 'careers':
        $message = field($data, 'message', 1000) ?: 'General Application';
        $teamBody = rows(['Name' => $name, 'Email' => $email, 'Phone' => field($data, 'mobile', 40), 'Position / Note' => $message]);
        $teamSubject = '[Career Application] ' . $name . ' - ' . substr($message, 0, 50);
        $userSubject = 'Thank You for Your Application - Supra Controls';
        $userBody = '<p>Thank you for your interest in joining <strong>Supra Controls Pvt Ltd</strong>. We have received your application and our HR team will review it shortly.</p>'
            . '<p>If your profile matches our current openings, we will contact you within <strong>5-7 business days</strong>.</p>';
        break;

    default:
        $message = field($data, 'message', 5000);
        $teamBody = rows(['Name' => $name, 'Email' => $email, 'Phone' => field($data, 'phone', 40),
            'Company' => field($data, 'company', 200), 'Preferred date' => field($data, 'preferredDate', 40)]) . section('Message', $message);
        $teamSubject = "[Demo Request] $name";
        $userSubject = 'Your Demo Request Has Been Received - Supra Controls';
        $userBody = '<p>Thank you for requesting a demonstration. Our team will contact you shortly to confirm the details.</p>';
}

$teamOk = send_html_mail($config['team_email'], $teamSubject, html_wrap('New ' . ucfirst($action) . ' Submission', $teamBody), $email, $config, $attachments);
$userOk = send_html_mail($email, $userSubject, acknowledgement($name, $userBody), $config['team_email'], $config, []);

if (!$teamOk || !$userOk) {
    error_log("Mail delivery failed for action=$action team=" . (int)$teamOk . ' user=' . (int)$userOk);
    fail(500, 'Failed to send email');
}

http_response_code(200);
echo 'Email sent successfully';

function request_data(): array {
    $type = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($type, 'application/json') !== false) {
        $decoded = json_decode((string)file_get_contents('php://input'), true);
        return is_array($decoded) ? $decoded : [];
    }
    return $_POST;
}

function field(array $data, string $key, int $max): string {
    $value = trim((string)($data[$key] ?? ''));
    return mb_substr(str_replace("\0", '', $value), 0, $max);
}

function uploaded_files(int $maxBytes): array {
    if (empty($_FILES['attachments'])) return [];
    $f = $_FILES['attachments'];
    $names = is_array($f['name']) ? $f['name'] : [$f['name']];
    $tmp = is_array($f['tmp_name']) ? $f['tmp_name'] : [$f['tmp_name']];
    $sizes = is_array($f['size']) ? $f['size'] : [$f['size']];
    $errors = is_array($f['error']) ? $f['error'] : [$f['error']];
    $result = [];
    foreach ($names as $i => $name) {
        if ($errors[$i] !== UPLOAD_ERR_OK) fail(422, 'An attachment could not be uploaded');
        if ($sizes[$i] > $maxBytes) fail(413, 'An attachment is too large');
        $result[] = ['name' => basename((string)$name), 'tmp' => $tmp[$i]];
    }
    return $result;
}

function send_html_mail(string $to, string $subject, string $html, string $replyTo, array $config, array $attachments): bool {
    $boundary = '=_supra_' . bin2hex(random_bytes(12));
    $headers = [
        'MIME-Version: 1.0',
        'From: ' . encode_header($config['from_name']) . ' <' . $config['from_email'] . '>',
        'Reply-To: ' . clean_header($replyTo),
    ];
    if (!$attachments) {
        $headers[] = 'Content-Type: text/html; charset=UTF-8';
        return mail($to, encode_header($subject), $html, implode("\r\n", $headers));
    }
    $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';
    $body = "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($html));
    foreach ($attachments as $file) {
        $content = file_get_contents($file['tmp']);
        if ($content === false) continue;
        $safeName = str_replace(['"', "\r", "\n"], '', $file['name']);
        $body .= "--$boundary\r\nContent-Type: application/octet-stream; name=\"$safeName\"\r\nContent-Disposition: attachment; filename=\"$safeName\"\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($content));
    }
    $body .= "--$boundary--\r\n";
    return mail($to, encode_header($subject), $body, implode("\r\n", $headers));
}

function html_wrap(string $title, string $content): string {
    return '<!doctype html><html><head><meta charset="utf-8"><style>' . styles() . '</style></head><body><div class="container"><div class="header"><h1>' . e($title) . '</h1><p>Supra Controls Pvt Ltd - Automated Notification</p></div><div class="body">' . $content . '</div><div class="footer">This is an automated email. Reply directly to respond to the sender.</div></div></body></html>';
}
function acknowledgement(string $name, string $content): string {
    return '<!doctype html><html><head><meta charset="utf-8"><style>' . styles() . '.token-box{background:#f0f6ff;border:1px solid #c5d9f2;border-radius:6px;padding:14px 20px;margin:18px 0;font-size:18px;font-weight:bold;text-align:center}</style></head><body><div class="container"><div class="header"><h1>Supra Controls</h1></div><div class="body"><p>Hi <strong>' . e($name) . '</strong>,</p>' . $content . '<p>Warm regards,<br><strong>Supra Controls Support Team</strong></p></div><div class="footer">&copy; Supra Controls Pvt Ltd. All rights reserved.</div></div></body></html>';
}
function styles(): string { return 'body{font-family:Arial,sans-serif;background:#f4f6f8;margin:0;padding:0}.container{max-width:600px;margin:30px auto;background:#fff;border-radius:8px;overflow:hidden}.header{background:#0d2a3d;padding:24px 32px}.header h1{color:#f60;margin:0;font-size:21px}.header p{color:#ccc}.body{padding:24px 32px}.body p{line-height:1.6}table{width:100%;border-collapse:collapse}td{padding:8px 0;border-bottom:1px solid #eee;vertical-align:top}.label{width:160px;font-weight:bold;color:#555}.section-title{font-size:13px;font-weight:bold;color:#0d2a3d;text-transform:uppercase;margin:18px 0 6px;border-bottom:2px solid #f60;padding-bottom:4px}.footer{background:#f4f6f8;padding:14px 32px;font-size:11px;color:#888;text-align:center}'; }
function rows(array $values): string { $out = '<table>'; foreach ($values as $label => $value) $out .= '<tr><td class="label">' . e((string)$label) . '</td><td>' . nl2br(e((string)$value)) . '</td></tr>'; return $out . '</table>'; }
function section(string $title, string $value): string { return '<div class="section-title">' . e($title) . '</div><p>' . nl2br(e($value ?: '-')) . '</p>'; }
function e(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function clean_header(string $value): string { return str_replace(["\r", "\n"], '', $value); }
function encode_header(string $value): string { return '=?UTF-8?B?' . base64_encode(clean_header($value)) . '?='; }
function fail(int $status, string $message): never { http_response_code($status); echo $message; exit; }
