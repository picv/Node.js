/**
 * Created by dllo on 17/2/16.
 */

var express = require('express');
var http = require('http');
//创建expess对象
var app = express();

// app.use(express.static('public'));

app.use('/mcbigx', express.static('public'));

//创建了一个GET服务，当访问index.html时
app.get('/index.html',function (req,res) {
    // res.writeHead(200,{'Content-Type':'text/html'});
    // res.end('Hello,world');
    //send函数，封装了res的Head和end
    // res.send('Hello,world');
});

app.post('/', function (req, res) {
    res.send('Got a POST request');
});

app.put('/user', function (req, res) {
    res.send('Got a PUT user request ');
});

var server = app.listen(3000,function () {
   var hostname = server.address().address;
    var port = server.address().port;
    console.log('Server is running at http://%s:%s',hostname,port);
});
