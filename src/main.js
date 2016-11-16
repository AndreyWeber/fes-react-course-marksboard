function start() {
    // 2. Initialize the JavaScript client library.
    gapi.client.init({
        'apiKey': '<API_KEY>'
        // clientId and scope are optional if auth is not required.
        //'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
        //'scope': 'profile',
    }).then(function() {
        // 3. Initialize and make the API request.
        return gapi.client.request({
            'path': 'https://sheets.googleapis.com/v4/spreadsheets/<SPREADSHEET_ID>/values/Sheet1!A2:M3',
        })
    }).then(function(resp) {
        console.log(resp.result);
    }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
    });
};

// 1. Load the JavaScript client library.
gapi.load('client', start);