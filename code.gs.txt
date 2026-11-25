/**
 * Backend kecil untuk NitipdongNda! CMS.
 * Deploy sebagai Google Apps Script Web App:
 *   1. Buka https://script.google.com → New project → paste file ini.
 *   2. Isi NITIP_PASSWORD di bawah (harus sama dengan CMS_PASSWORD di cms.html).
 *   3. Deploy → New deployment → type "Web app" → Execute as "Me" →
 *      Who has access: "Anyone" → Deploy → copy URL /exec.
 *   4. Paste URL itu ke window.NITIP_API di index.html dan cms.html.
 *
 * Data disimpan di Google Sheet "NitipdongNda Store" (otomatis dibuat),
 * satu cell A1 berisi JSON. Cukup untuk skala UKM.
 */

const SHEET_NAME = "NitipdongNda Store";
const NITIP_PASSWORD = "nda2026"; // samakan dengan CMS_PASSWORD

function getSheet_() {
  // Web app tidak punya "active spreadsheet" — pakai ID yang disimpan di
  // Script Properties, dibuat sekali lalu dipakai terus.
  const props = PropertiesService.getScriptProperties();
  let ssId = props.getProperty("SS_ID");
  let ss;
  if (ssId) {
    try { ss = SpreadsheetApp.openById(ssId); } catch (e) { ss = null; }
  }
  if (!ss) {
    ss = SpreadsheetApp.create(SHEET_NAME);
    props.setProperty("SS_ID", ss.getId());
  }
  let sh = ss.getSheetByName("data");
  if (!sh) {
    sh = ss.insertSheet("data");
    sh.getRange("A1").setValue("{}");
  }
  return sh;
}

function loadData_() {
  const raw = getSheet_().getRange("A1").getValue();
  try { return JSON.parse(raw); } catch (e) { return { events: [], deletedTemplateIds: [] }; }
}

function doGet(e) {
  e = e || {};
  const action = ((e.parameter || {}).action || "").toLowerCase();
  if (action === "get") {
    const data = loadData_();
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "unknown action" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  e = e || {};
  try {
    const body = JSON.parse((e.postData || {}).contents || "{}");
    // body: { password, data }
    if (body.password !== NITIP_PASSWORD) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "password salah" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    const data = body.data;
    if (!data || !Array.isArray(data.events)) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "data tidak valid" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    getSheet_().getRange("A1").setValue(JSON.stringify(data));
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
