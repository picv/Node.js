/**
 * Created by dllo on 17/2/15.
 */

var fs = require('fs');
var zhenghe = function (filePath,response) {
    fs.stat(filePath,function (error,state) {
        if (!error&&state.isFile()){
            fs.createReadStream(filePath).pipe(response);
            response.statusCode=200;
        }else {
            //文件无法找到
            if (error.code =='ENOENT'){
                response.statusCode=404;
                response.end('404 not found');
            }else{
                //服务器存在问题
                response.statusCode=500;
                response.end('500 Server have error');
            }
        }
    });
};
module.exports = zhenghe;

