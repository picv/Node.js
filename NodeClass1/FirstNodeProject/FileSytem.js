/**
 * Created by dllo on 17/2/10.
 */

//获取文件系统模块
var fileSystem = require('fs');
//文件系统模块读入文件
//参数1 要读入的文件路径
//参数2 选项，文本的编码格式
//参数3 回调函数
// console.log('读文件前');
// //异步执行,非阻塞
// fileSystem.readFile('./1.txt','utf-8',function (err,date) {
//     console.log(data);
//     console.log('读文件中');
// });
// console.log('读文件后');

// console.log('读前');
// //同步执行，阻塞执行
// var data = fileSystem.readFileSync('./1.txt','utf-8');
// console.log(data);
// console.log('读后');

var string='lalalaal';
fileSystem.writeFile('./1.txt',string,'utf-8',function (err,data) {
    console.log('成功');
});

var say = require('./SayHello');
say.sayHello(say.name);



