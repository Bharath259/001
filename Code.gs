function doGet(request) {
  return HtmlService.createTemplateFromFile('Index.html').evaluate();
}
function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function processForm(formObject){
  var url="https://docs.google.com/spreadsheets/d/1vaSaQd5wPhDfSk-YxBuhCJwjRwiMIWmsDznUvkwAaKE/edit#gid=0";
  var ss= SpreadsheetApp.openByUrl(url);
  var ws= ss.getSheetByName("Sheet1");

  ws.appendRow([
    formObject.property,
    formObject.fullAddress,
    formObject.tenantMix,
    formObject.numberOfOccupants,
    formObject.fullName,
    formObject.ageRange,
    formObject.countryOfBirth,
    formObject.employementSector,
    formObject.income,
    formObject.modeOfTransport
  ]);

  var name = formObject.fullName;
  var property = formObject.property;
  var fullAddress = formObject.fullAddress;
  var emailAddress = 'itamar@mdpm.ie';
  var subject = 'Tenant '+name+' | '+property+' | # '+fullAddress+' added to the MDPM: Ardstone Demographic Info';
  var message = 'Tenant '+name+' added with success!';
     var options = {
     cc: "alex@mdpm.ie",
  //   bcc: "bcc@example.com",
  //   replyTo: "help@example.com"
   }
  MailApp.sendEmail(emailAddress, subject, message,options);
}
