var Config = require('./config.js');
const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
    res.render('index.html', {
        title: "Hello world",
        page: 'home'
    }); 
})
 
app.listen(3000)