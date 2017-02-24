/**
 * Created by dllo on 17/2/15.
 */

//获取系统HTTP服务
var http = require('http');
//获取系统URL服务
var url = require('url');
//获取系统PATH服务
var path = require('path');
//获取文件系统操作服务
var fs = require('fs');
//通过http服务创建server对象
var server =http.createServer();

//添加request事件
server.on('request',function (request,response) {
    //判断是否是浏览器图标访问
    if (request.url!=='/favicon.ico')
    {
        //通过系统url库解析url，获取pathname
        var pathName= url.parse(request.url).pathname;
        //通过__dirname与上面获取的pathname生成新的文件路径
        var filePath = path.join(__dirname,pathName);
        //通过fa判断路径是否存在
        fs.stat(filePath,function (error,state) {
            //如果没有error，说明文件路径存在
            if (!error){
                console.log('文件存在');
                response.writeHead(200);
                //将文件路径读入内存，导入response
                //pipe过程中会自动生成response.end
                fs.createReadStream(filePath.pipe(response));
            }
            else
            {
                console.log('文件不存在，服务器有问题');
                response.writeHead(200);
                response.end('Hello,This is a server');
            }
        });
        // console.log(filePath);
        // console.log(request.url);

    }
   else{
        response.end();
    }
});

server.listen(3000,function () {
    console.log('服务器启动成功');
});