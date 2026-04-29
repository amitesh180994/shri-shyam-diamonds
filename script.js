const API_URL = "https://script.google.com/macros/s/AKfycbyqZiF-G-D8XO-_G0_t_n4qQ8TR33f2LPB7NnqRVuVc/dev";

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var code = e.parameter.code;

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim().toUpperCase() == String(code).trim().toUpperCase()) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "found",
        product: data[i][1],
        diamond: data[i][2],
        gold: data[i][3],
        colour: data[i][4],
        clarity: data[i][5],
        date: data[i][6],
        image: data[i][7]
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: "not_found"
  })).setMimeType(ContentService.MimeType.JSON);
}
