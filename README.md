# Project 'fes-react-course-marksboard'
Marks board application for Front-end Science ReactJS course.

## Working application version
Working version of the application can be found [here](https://andreyweber.github.io/fes-react-course-marksboard-demo/#/totalscore?ssname=react2+hw)

## Multi-spreadsheets support
Application supports referring multiple Google spreadsheet markboards of the same predefined structure. It means that students of each particular Front-end Science ReactJS course thread can refer their own Google spreadsheet marksboard via single application instance.
To refer particular Google spreadsheet from the application:
1. Spreadsheet should be added to the application [configuration file](#application-configuration-file)
2. Spreadsheet name should be provided as [URL-parameter](#application-url-parameter)

### Application configuration file
Application configuration file named **config.js** is placed on the `/static/config.js` path relatevely to the root of the application. Configuration file have next structure:
```javascript
var APP_CONFIG = {
    commonCredentials: {
        apiKey:         '<google_api_key>',
        clientId:       '<google_client_id>',
        discoveryUrl:   'https://sheets.googleapis.com/$discovery/rest?version=v4',
        scope:          'https://www.googleapis.com/auth/spreadsheets.readonly'
    },
    availableSpreadsheets: [{
        id:     '<google_spreadsheet_id_0>',
        name:   '<google_spreadsheet_name_0>'
    }, {
        id:     '<google_spreadsheet_id_1>',
        name:   '<google_spreadsheet_name_2>'
    },
    /* ... */
    {
        id:     '<google_spreadsheet_id_N>',
        name:   '<google_spreadsheet_name_N>'
    }]
};
```
Parameters in `<>` braces should be substitued with concrete values. Pay attention to `availableSpreadsheets` section, where should be provided a list of all available for the application Google spreadsheets
* **id** &ndash; particular Google spreadsheet id (hash-code).
* **name** &ndash; alpha-numeric Google spreadsheet name which will be used as application URL-parameter

### Application URL-parameter
At the moment application accepts single URL-based parameter named `ssname`, which is stands for _Spreadsheet Name_.
Examples:
* `?ssname=react2+hw`
* `?ssname=react3%20home%20works`

Parameter `ssname` **must be** specified before login to the application. After login it is not required to pass parameter between application pages, because it will be stored in the browser local storage.

## GitHub pages pre-deploy steps
Specific steps required to deploy application of GitHub pages:
1. Change paths to images in the next ***.less** files:
* **Login.less** file:
```css
background: url("https://[github_login].github.io/[repo_name]/static/img/login_bg.png") no-repeat;
```
Example:
```css
background: url("https://andreyweber.github.io/fes-react-course-marksboard-demo/static/img/login_bg.png") no-repeat;
```
* **TotalScore.less** file:
```css
url("https://[github_login].github.io/[repo_name]/static/img/main_bg.png") no-repeat @total-score-bg-color;
```
* **Lessons.less** file:
```css
url("https://[github_login].github.io/[repo_name]/static/img/lessons_bg.png") no-repeat @default-bg-color;
```
2. **index.html** file &ndash; add `https://[github_login].github.io/[repo_name]` prefix to the **bundle.js**, **config.js** and **favicon.png** paths
3. **NavigationBar.jsx** component file &ndash; add `/[repo_name]/#/` to paths
4. **main.jsx** file &ndash; substitute _browserHistory_ with _hashHistory_

## Useful Links
1. [Google API Client Libraries > JavaScript (Beta)](https://developers.google.com/api-client-library/javascript/start/start-js)
2. [Google API Client Libraries > JavaScript (Beta) > Methods and Classes](https://developers.google.com/api-client-library/javascript/features/batch)
3. [Best practices for securely using API keys](https://support.google.com/cloud/answer/6310037)
4. [Google Sheets API](https://developers.google.com/sheets/reference/rest/)
5. [Google Sheets API > JavaScript Quickstart](https://developers.google.com/sheets/quickstart/js)
6. [Google Sheets API > Samples > Basic Reading](https://developers.google.com/sheets/samples/reading)
7. [Google Spreadsheet ID explanation](https://developers.google.com/sheets/guides/concepts#spreadsheet_id)
8. [Google Developers Console](https://console.developers.google.com)
9. [Using OAuth 2.0 for Server to Server Applications](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) 
