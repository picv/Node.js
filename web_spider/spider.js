/**
 * Created by dllo on 17/2/22.
 */

var dateformat = require('./common/dateFormat');
var md5 = require('md5');
var base64 = require('Base64');
var http = require('http');
var querystring = require('querystring');
var request = require('request');
var fs = require('fs');
var mysql =require('mysql');

var sqlOptions={
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456',
    database:'PianKe',
    charset:'utf8'
};

//1.通过dateformat生成时间字符串
var timestamp = dateformat.format.date((new Date()).getTime(), "yyyyMMddHHmmss");
//2.拼接字符串
var string = ''+':'+timestamp;
//3.base64处理字符串----请求头中授权字符串
var Authorization = base64.btoa(string);
console.log(Authorization);

//1.拼接签名字符串
var str = '0' + '' + timestamp;
//2.md5处理字符串
var md5Str = md5(str);
//3.将md5字符串转换成大写
var sig =md5Str.toUpperCase();
console.log(sig);

//愿路径
var path = '/version5.0/headline/day.php?';
//新路径
// var newPath ='/version5.0/headline/recent.php?';

var params = {
    time:'2017-02-22',
    mode:'day',
    sig:sig
};

var newParams = {
    location: 'special',
    sig:sig
};
//将JSON对象 转换成 key=value&key=value&key=value
var param = querystring.stringify(newParams);
var options = {
    host:'www.pianke.me',
    path:newPath+param,
    method:'GET',
    headers:{
        Authorization:Authorization
    }
};

http.get(options,function (res) {
    var data = '';
    res.on('data',function (smallData) {
       data+=smallData; 
    });
    res.on('end',function () {
        //data是 buffer
        var result = JSON.parse(data);
        // console.log(result);
    // });
// });
//新
// 取值，处理数据
 var resultData = result.data;
 //遍历数组，item为每一个数组元素
 resultData.forEach(function (item) {
    console.log(item.cover);
    //获取图片数据资源,读取到内存中
    request.head(item.cover);
    //保存
    // 通过item.cover图片的url获取内存中对应的资源
     //导流，通过fs文件系统创建图片文件
    request(item.cover).pipe(fs.createWriteStream('./images/'+item.title+'.jpg'));


 });
//       var resultData = result.data;
//       var artical = resultData[2];
//       var array = artical.data;
//       array.forEach(function (art) {
//          console.log(art.cover);
//          request.head(art.cover);
//          request(art.cover).pipe(fs.createWriteStream('./image/'+art.title+'.png'));




//       });
        //------------
        var pool = mysql.createPool(sqlOptions);
        pool.getConnection(function (error,connection) {
            resultData.forEach(function (item) {
                var sql = 'insert into headLineImage(title,imagePath) values (';
                var sql1 = '\''+item.title+'\',';
                var sql2 = '\''+'/images/headLineImage/'+item.title+'.jpg'+'\')';
                var fullSQL = sql + sql1 + sql2;
                connection.query(fullSQL,function (err,res) {
                    if (!err){
                        console.log('插入成功');
                        pool.end();
                    }else {
                        console.log('失败');
                    }
                });
            });
        });
    });
});

