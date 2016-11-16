function start() {
    // 2. Initialize the JavaScript client library.
    gapi.client.init({
        'apiKey': '<API_KEY>',
        // clientId and scope are optional if auth is not required.
        //'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
        //'scope': 'https://www.googleapis.com/auth/spreadsheets.readonly',
        //'immediate': true
    }).then(function() {
        const discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
        gapi.client.load(discoveryUrl).then(function() {
            gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: '<SPREADSHEET_ID>',
                majorDimension: 'COLUMNS',  // ROWS
                range: 'Sheet1!A2:A',       // Sheet1!A2:M2
            }).then(function(response) {
                console.log(JSON.stringify(response.body));
                console.log(response);
            }, function(response) {
                console.log('Error: ' + response.result.error.message);
            });
        });
    });
}

// 1. Load the JavaScript client library.
gapi.load('client', start);