# Project 'fes-react-course-marksboard'
Marks board application for Front-end Science ReactJS course.

## Working application version
Working version of the application can be found [here](https://andreyweber.github.io/fes-react-course-marksboard-demo/#/totalscore?ssname=react2+hw)

## Multi-spreadsheets support
Application supports referring multiple Google spreadsheet markboards of the same predefined structure. It means that students of a particular Front-end Science ReactJS course thread can refer to their own Google spreadsheet marksboard via single application instance.
To refer particular Google spreadsheet from the application:
1. It should be added to the application [configuration file](#application-configuration-file)
2. Its name should be provided as [URL-parameter](#application-url-parameter(s))

### Application configuration file

### Application URL-parameter(s)

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
2. **index.html** file &ndash; add `https://[github_login].github.io/[repo_name]` prefix to the paths inside **bundle.js** and **config.js** files
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
