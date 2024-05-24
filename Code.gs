function doGet(request) {
  return HtmlService.createTemplateFromFile('Index').evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function processForm(formObject) {
  var url = "https://docs.google.com/spreadsheets/d/1_Z--xoeNg6ePhMd_NcV4DVjBi5n4Rnx3b87yT4Pln4Q/edit#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Sheet1");
  
  ws.appendRow([
    formObject.hiring_date,
    formObject.department, // Changed 'hiring-date' to 'hiring_date'
    formObject.description,
    formObject.note,
    formObject.amount,
  ]);
}
