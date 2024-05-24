const { google } = require('googleapis');
const keys = require('./keys.json');

const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('Connected!');
    gsrun(client);
  }
});

async function gsrun(cl) {
  const gsapi = google.sheets({ version: 'v4', auth: cl });
  const opt = {
    // Replace with your actual spreadsheet ID
    spreadsheetId: 'https://docs.google.com/spreadsheets/d/1vaSaQd5wPhDfSk-YxBuhCJwjRwiMIWmsDznUvkwAaKE/edit#gid=0', 
    range: 'Sheet1!A2:F2'
  };

  let data = await gsapi.spreadsheets.values.get(opt);
  let dataArray = data.data.values;
  let newDataArray = dataArray.map(function(r) {
    return r.map(function(e) {
      return parseInt(e);
    });
  });

  console.log(newDataArray);
}
