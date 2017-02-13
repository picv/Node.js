/**
 * Created by dllo on 17/2/13.
 */

exports.sayHello = function (name) {
  console.log('写入了'+name);
};

exports.name = '张三';

module.exports = function () {
    var name ;
    this.setName = function (name) {
        this.name = name;
    };
    this.sayHello = function () {
        console.log('Hello'+ this.name);
    }
};
