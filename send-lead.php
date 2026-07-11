<?php
/**
 * Amarprakash Developers — website lead handler
 * Sends Enquiry / Site Visit form submissions to the marketing inbox.
 */
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['ok' => false, 'error' => 'Invalid request method.']);
    exit;
}

/* ---- Config ---- */
$TO        = 'contact@amarprakash.in';
$FROM      = 'Amarprakash Website <noreply@amarprakash.in>'; // change to a valid address on your domain
$SITE_NAME = 'Amarprakash Developers';

/* ---- Collect + sanitise ---- */
function val($k) { return isset($_POST[$k]) ? trim(strip_tags($_POST[$k])) : ''; }

$type      = val('type');
$name      = val('name');
$phone     = val('phone');
$email     = val('email');
$project   = val('project');
$message   = val('message');
$visitdate = val('visitdate');
$slot      = val('slot');

/* ---- Validate ---- */
if ($name === '' || $phone === '') {
    echo json_encode(['ok' => false, 'error' => 'Name and mobile number are required.']);
    exit;
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['ok' => false, 'error' => 'Please enter a valid email address.']);
    exit;
}

$isVisit = ($type === 'visit');
$subject = $isVisit
    ? 'Site Visit Enquiry from Amarprakash website'
    : 'Enquiry from Amarprakash website';

/* ---- Build rows ---- */
$rows = [
    'Enquiry Type'      => $isVisit ? 'Site Visit Request' : 'General Enquiry',
    'Full Name'         => $name,
    'Mobile Number'     => $phone,
    'Email Address'     => $email !== '' ? $email : '—',
    'Interested Project'=> $project !== '' ? $project : '—',
];
if ($isVisit) {
    $rows['Preferred Visit Date']  = $visitdate !== '' ? $visitdate : '—';
    $rows['Preferred Time Window'] = $slot !== '' ? $slot : '—';
}
$rows['Message'] = $message !== '' ? nl2br(htmlspecialchars($message)) : '—';

$rowsHtml = '';
$i = 0;
foreach ($rows as $k => $v) {
    $bg = ($i % 2 === 0) ? '#faf7f5' : '#ffffff';
    $rowsHtml .= '<tr>'
        . '<td style="padding:12px 18px;border-bottom:1px solid #eee;font:600 14px Arial,sans-serif;color:#12243b;width:190px;background:' . $bg . ';vertical-align:top;">' . htmlspecialchars($k) . '</td>'
        . '<td style="padding:12px 18px;border-bottom:1px solid #eee;font:400 14px Arial,sans-serif;color:#333;vertical-align:top;">' . $v . '</td>'
        . '</tr>';
    $i++;
}

$eyebrow = $isVisit ? 'NEW SITE VISIT REQUEST' : 'NEW WEBSITE ENQUIRY';
$intro   = $isVisit ? 'a new site visit request' : 'a new enquiry';

$html = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;background:#f4f6f9;padding:24px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,.08);">
    <tr>
      <td style="background:linear-gradient(120deg,#f7a626,#ef4030);padding:26px 30px;">
        <div style="font:700 22px Arial,sans-serif;color:#ffffff;letter-spacing:.5px;">AMARPRAKASH DEVELOPERS</div>
        <div style="font:600 12px Arial,sans-serif;color:rgba(255,255,255,.92);letter-spacing:1.5px;margin-top:4px;">' . $eyebrow . '</div>
      </td>
    </tr>
    <tr><td style="padding:24px 30px 6px;font:400 15px Arial,sans-serif;color:#555;">You have received ' . $intro . ' from the Amarprakash Developers website:</td></tr>
    <tr><td style="padding:14px 30px 26px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:8px;overflow:hidden;">' . $rowsHtml . '</table>
    </td></tr>
    <tr><td style="background:#12243b;padding:16px 30px;font:400 12px Arial,sans-serif;color:#9fb0c2;">This email was generated automatically from the ' . $SITE_NAME . ' website. Please respond to the customer at the earliest.</td></tr>
  </table>
</body></html>';

/* ---- Headers ---- */
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-Type: text/html; charset=UTF-8' . "\r\n";
$headers .= 'From: ' . $FROM . "\r\n";
if ($email !== '') {
    $headers .= 'Reply-To: ' . $name . ' <' . $email . '>' . "\r\n";
}
$headers .= 'X-Mailer: PHP/' . phpversion() . "\r\n";

$sent = @mail($TO, $subject, $html, $headers);

echo json_encode($sent
    ? ['ok' => true]
    : ['ok' => false, 'error' => 'The message could not be sent. Please call us at 044 4000 5000.']);
