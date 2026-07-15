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
$company   = val('company');
$location  = val('location');
$reptype   = val('reptype');

/* ---- Validate ---- */
if ($name === '' || $phone === '') {
    echo json_encode(['ok' => false, 'error' => 'Name and mobile number are required.']);
    exit;
}
if ($type === 'feedback' && $email === '') {
    echo json_encode(['ok' => false, 'error' => 'Email address is required.']);
    exit;
}
if ($type === 'feedback' && $message === '') {
    echo json_encode(['ok' => false, 'error' => 'Comments are required.']);
    exit;
}
if ($type === 'agent' && ($email === '' || $message === '')) {
    echo json_encode(['ok' => false, 'error' => 'Email and profile are required.']);
    exit;
}
if ($type === 'agent' && $reptype === 'Company' && $company === '') {
    echo json_encode(['ok' => false, 'error' => 'Company name is required.']);
    exit;
}
if (($type === 'jv' || $type === 'customercell') && ($email === '' || $message === '')) {
    echo json_encode(['ok' => false, 'error' => 'Email and your message are required.']);
    exit;
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['ok' => false, 'error' => 'Please enter a valid email address.']);
    exit;
}

$isVisit        = ($type === 'visit');
$isFeedback     = ($type === 'feedback');
$isAgent        = ($type === 'agent');
$isJV           = ($type === 'jv');
$isCustomerCell = ($type === 'customercell');
if ($isVisit) {
    $subject = 'Site Visit Enquiry from Amarprakash website';
} elseif ($isFeedback) {
    $subject = 'Feedback from Amarprakash website';
} elseif ($isAgent) {
    $subject = 'Become an Agent — application from Amarprakash website';
} elseif ($isJV) {
    $subject = 'Joint Venture / Outright Sales enquiry from Amarprakash website';
} elseif ($isCustomerCell) {
    $subject = 'Customer Cell enquiry from Amarprakash website';
} else {
    $subject = 'Enquiry from Amarprakash website';
}

/* ---- Build rows ---- */
$enquiryType = $isVisit ? 'Site Visit Request' : ($isFeedback ? 'Website Feedback' : ($isAgent ? 'Agent Application' : ($isJV ? 'Joint Venture / Outright Sales' : ($isCustomerCell ? 'Customer Cell Enquiry' : 'General Enquiry'))));
$rows = [
    'Enquiry Type'      => $enquiryType,
    ($isJV ? 'Name of the Owner' : 'Full Name') => $name,
    'Mobile Number'     => $phone,
    'Email Address'     => $email !== '' ? $email : '—',
];
if ($isAgent) {
    $rows['Represents'] = $reptype !== '' ? $reptype : 'Individual';
    if ($reptype === 'Company' || $company !== '') {
        $rows['Company Name'] = $company !== '' ? $company : '—';
    }
    $rows['Location'] = $location !== '' ? $location : '—';
}
if ($isJV) {
    $dim = trim(implode('  ', array_filter([
        val('dim_n') !== '' ? 'N: ' . val('dim_n') : '',
        val('dim_s') !== '' ? 'S: ' . val('dim_s') : '',
        val('dim_e') !== '' ? 'E: ' . val('dim_e') : '',
        val('dim_w') !== '' ? 'W: ' . val('dim_w') : '',
    ])));
    $rows['Name of the Mediator'] = val('mediator') !== '' ? val('mediator') : '—';
    $rows['Property Area']        = val('parea') !== '' ? val('parea') : '—';
    $rows['Property Address']     = val('address') !== '' ? nl2br(htmlspecialchars(val('address'))) : '—';
    $rows['Sized Dimension / Ratio'] = $dim !== '' ? htmlspecialchars($dim) : '—';
    $rows['Dimension']            = val('dimension') !== '' ? val('dimension') : '—';
    $rows['Frontage']             = val('frontage') !== '' ? val('frontage') : '—';
    $rows['Road Width']           = val('roadwidth') !== '' ? val('roadwidth') : '—';
    $rows['Road Facing Direction']= val('roadface') !== '' ? val('roadface') : '—';
    $rows['Option']               = val('jvoption') !== '' ? val('jvoption') : '—';
    $rows['Expected Ratio']       = val('expratio') !== '' ? val('expratio') : '—';
    $rows['Rate Per Ground']      = val('rateperground') !== '' ? val('rateperground') : '—';
}
if ($isCustomerCell) {
    $rows['Resident Type']     = val('ctype') !== '' ? val('ctype') : '—';
    $rows['Country']           = val('country') !== '' ? val('country') : '—';
    $rows['Address']           = val('address') !== '' ? nl2br(htmlspecialchars(val('address'))) : '—';
    $rows['Location Preferred']= $location !== '' ? $location : '—';
    $rows['Project Preferred'] = $project !== '' ? $project : '—';
    $rows['Investment Range']  = val('investment_range') !== '' ? val('investment_range') : '—';
}
if (!$isFeedback && !$isAgent && !$isJV && !$isCustomerCell) {
    $rows['Interested Project'] = $project !== '' ? $project : '—';
}
if ($isVisit) {
    $rows['Preferred Visit Date']  = $visitdate !== '' ? $visitdate : '—';
    $rows['Preferred Time Window'] = $slot !== '' ? $slot : '—';
}
$msgLabel = $isFeedback ? 'Comments' : ($isAgent ? 'Profile' : ($isJV ? 'Other Comments' : ($isCustomerCell ? 'Your Enquiry' : 'Message')));
$rows[$msgLabel] = $message !== '' ? nl2br(htmlspecialchars($message)) : '—';

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

$eyebrow = $isVisit ? 'NEW SITE VISIT REQUEST' : ($isFeedback ? 'NEW WEBSITE FEEDBACK' : ($isAgent ? 'NEW AGENT APPLICATION' : ($isJV ? 'NEW JOINT VENTURE ENQUIRY' : ($isCustomerCell ? 'NEW CUSTOMER CELL ENQUIRY' : 'NEW WEBSITE ENQUIRY'))));
$intro   = $isVisit ? 'a new site visit request' : ($isFeedback ? 'a new feedback submission' : ($isAgent ? 'a new agent application' : ($isJV ? 'a new joint venture / outright sales enquiry' : ($isCustomerCell ? 'a new customer cell enquiry' : 'a new enquiry'))));

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
