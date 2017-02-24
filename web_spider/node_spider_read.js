/**
 * Created by dllo on 17/2/23.
 */

var md5 = require('md5');
var base64 = require('base64');
var dateFormat = require('./common/dateFormat');
var http = require('http');
var fs = require('fs');
var querysting = require('querystring');
var mysql = require('mysql');
var request = require('request');

var mysqlOption = {
  host:'localhost',
    port:3306,
    user:'root',
    password:'123456',
    database:'PianKe',
    charset:'utf8'
};
var pool = mysql.createPool(mysqlOption);


//授权
//1.获取对应时间
var timetemp = dateFormat.format.date((new Date()).getTime(),"yyyyMMddHHmmss");
//2.获取授权字符串完整
var string = ''+':'+timetemp;
//3.转换Base64
var Authorization = base64.btoa(string);
console.log(Authorization);
//签名sign
//1.生成字符串
var signStr = '0'+''+timetemp;
//2.通过1生成的字符串，生成MD5字符串
var md5Str = md5(signStr);
//3.转换大写
var sign =md5Str.toUpperCase();
console.log(sign);

//拼接请求路径
//1. 生成路径
var version = '/version5.0';
var path = version + '/headline/day.php?';
//2.生成参数
var params ={
    time:'2017-02-23',
    mode:'day',
    sig:sign
};
//3.参数转字符串
var param = querysting.stringify(params);
var httpOptions = {
  host:'www.pianke.me',
    path:path+param,//根据路径和参数，生成最终路径
    method:'GET',
    headers:{
        Authorization:Authorization//授权
    }
};
//发送http请求
http.get(httpOptions,function (res) {
    console.log(httpOptions);
    //获取数据
    var data = '';
   res.on('data',function (smallData) {
        //拼接数据
        data+=smallData;
   }) ;
   //数据拼接完成
   res.on('end',function () {
        var resultData = JSON.parse(data);
        console.log(resultData);
        var article = resultData.data[2];
        var articleArray = article.data;
        pool.getConnection(function (err,connection) {
            articleArray.forEach(function (art) {
                var insertObj = {
                    read_title:art.title,
                    read_imagePath:'/images/headReadImage/'+art.title+'.jpg',
                    read_summary:art.summary,
                    read_author:art.detail.userinfo.uname,
                    read_views:art.detail.views,
                    read_likes:art.detail.likes,
                    read_comments:art.detail.comments
                };
                var sql = 'insert into headRead SET ?';
                connection.query(sql,insertObj,function (art) {
                    if(!err){
                        console.log('插入成功');
                        pool.end();
                    }else {
                        console.log('插入失败');
                    }
                });
                console.log(art.cover);
                console.log(art.detail.userinfo.uname);
                // request.head(art.cover);
                // request(art.cover).pipe(fs.createWriteStream('./images/headArticle/'+art.title+'.jpg'));
            });
        });


   });
});

