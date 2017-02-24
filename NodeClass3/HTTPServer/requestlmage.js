/**
 * Created by dllo on 17/2/15.
 */

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var queryString = require('querystring');
var zhenghe = require('./zhenghe');

var server = http.createServer();

server.on('request',function (request,response) {
    if (request.url!='/favicon.ico'){
        var urlPath = url.parse(request.url).pathname;
        var filePath = path.join(__dirname,urlPath);
        //.png .txt .mp4 .mp3
        var reg =/.+\.[A-Za-z0-9]+/g;
        if (reg.test(urlPath))
        {
            zhenghe(filePath,response);

        }else
        {
            if (urlPath=='/login')
            {
                console.log('此处登录逻辑');
                var data="";
                request.on('data',function (smallData) {
                    console.log(smallData);
                    data+=smallData;
                });
                request.on('end',function () {
                    var dic =queryString.parse(data);
                    if (dic.username=='aa'&&dic.password=='111111'){
                        response.statusCode =200;
                        response.end('登录成功');
                    }
                    response.statusCode =200;
                    response.end('账号或密码错误');
                    // console.log(dic.username);
                    // console.log(dic.password);

                });
            }
            // else {
            //     console.log('这就是一个文件夹');
            //     response.statusCode = 200;
            //     response.end('文件夹路径'+filePath);
            // }

        }
        // console.log('此处请求方法为:'+request.method);
        // console.log('此处请求端口为:'+request.port);
        // console.log('此处请求域名为:'+request.host);
        // console.log('此处请求头为:'+request.headers);

        // fs.stat(filePath,function (error,state) {
        //     if (!error&&state.isFile()){
        //         fs.createReadStream(filePath).pipe(response);
        //         response.statusCode=200;
        //     }else {
        //         response.statusCode =404;
        //         response.end('404 Not Found');
        //     }
        // });

    }else {
        response.end();
    }
});

server.listen(3001,function () {
   console.log('服务器启动成功');
});