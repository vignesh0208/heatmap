var Config = require('./config.js');
var express = require ('express');
var nunjucks  = require('nunjucks');
var { google } = require('googleapis');
const browser = require('browser-detect');
var port = 3000;
var app = express();
app.use('/public', express.static('public'));

var env = nunjucks.configure(['views/'], { 
    autoescape: true, 
    express: app
});

var OS = require('os');

var infoValue = {
  "hostName": OS.hostname(),
  "Type": OS.type(),
  "Platform": OS.platform(),
  "Arch": OS.arch(),
  "Release": OS.release(),
  "upTime": OS.uptime(),
  "loadAVG": OS.loadavg(),
  "totalMEM": OS.totalmem(),
  "freeMEM": OS.freemem(),
  "CPUS": OS.cpus(),
  "network": OS.networkInterfaces()
};

const key = require('./API-Demo-4da662c9dc4a-1.json');
const scopes = 'https://www.googleapis.com/auth/analytics.readonly';
const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes);
const view_id = '200520670';

// const reporting = google.analyticsreporting('v4');

// let getReports = async function (reports) {
//   await jwt.authorize();
//   let request = {
//       'headers': {'Content-Type': 'application/json'}, 'auth': jwt, 'resource': reports
//   };
//   return await reporting.reports.batchGet(request);
// };

// let by_day_report = {
//   'reportRequests': [
//       {
//           'viewId': view_id,
//           'dateRanges': [{'startDate': '2019-08-01', 'endDate': 'today'}],
//           'metrics': [{'expression': 'ga:pageviews'}],
//           'dimensions': [{'name': 'ga:pagePath'}],
//       }
//   ]
// };

// getReports(by_day_report)
//   .then(response => console.log(response.data.reports[0].data.rows[0].metrics))
//   .catch(e => console.log(e));

// process.env.GOOGLE_APPLICATION_CREDENTIALS = './API-Demo-4da662c9dc4a-1.json'

async function getData() {
  const defaults = {
    'auth': jwt,
    'ids': 'ga:' + view_id,
  }
  const response = await jwt.authorize()
  const result = await google.analytics('v3').data.ga.get({
    ...defaults,
    'start-date': '30daysAgo',
    'end-date': 'today',
    'dimensions': 'ga:pagePath',
    'metrics': 'ga:pageviews'
  })
  console.log(result.data.rows)
}

getData()



app.get('/', (req, res) => {
  const result = browser(req.headers['user-agent']);
  res.render('index.html', {
    title: Config['SEO']['Home']['title'],
    page: 'home',
    info: infoValue,
    browserValue: result
  });    
});

app.get('/heatmap', function(req, res){
  res.render('heatmap.html', {
    title: Config['SEO']['Heatmap']['title'],
    page: 'heatmap',
  });
});

app.get('/mousemove', function(req, res){
  res.render('mouse-move-map.html', {
    title: Config['SEO']['MouseMove']['title'],
    page: 'mousemove',
  });
});

app.get('/googleanalytics', function(req, res){
  res.render('google-analytics.html', {
    title: Config['SEO']['Google']['title'],
    page: 'googleanalytics',
  });
});

app.listen(port, function() {
  console.log('Example app listening on port... http://localhost:'+ port +'');
});