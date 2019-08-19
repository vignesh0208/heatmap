var Config = require('./config.js');
var express = require ('express');
var nunjucks  = require('nunjucks');
var geoip = require('geoip-lite');
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

var ip = "207.97.227.239";
var geo = geoip.lookup(ip);
// console.log(geo)
// console.log(infoValue)
// console.log(infoValue.CPUS[0].model)
// console.log(infoValue.network.wlx502b73d46835[0].address)

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