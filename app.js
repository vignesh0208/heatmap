var Config = require('./config.js');
var express = require ('express');
var nunjucks  = require('nunjucks');
var port = 3000;
var app = express();
app.use('/public', express.static('public'));

var env = nunjucks.configure(['views/'], { 
    autoescape: true, 
    express: app
});

app.get('/', (req, res) => {
    res.render('index.html', {
      title: Config['SEO']['Home']['title'],
      page: 'home'
    });    
});

app.get('/about', function(req, res){
    res.render('pages/about.html', {
      title: Config['SEO']['About']['title'],
      page: 'about',
    });
});

app.listen(port, function() {
    console.log('Example app listening on port... http://localhost:'+ port +'');
});