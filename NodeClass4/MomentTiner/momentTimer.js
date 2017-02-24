/**
 * Created by dllo on 17/2/16.
 */

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var server = http.createServer();

server.on('request',function (req,res) {
  var filePath = url.parse(req.url).pathname;
  var fullPath = path.join(__dirname,filePath);
  fs.stat(fullPath,function (err,tat) {
     if (!err)
     {
         fs.createReadStream(fullPath).pipe(res);
         res.statusCode=200;
     }else
     {
         res.statusCode=404;
         res.end('404 not found ');
     }
  });
});

server.listen(3000);