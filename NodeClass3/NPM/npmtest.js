/**
 * Created by dllo on 17/2/15.
 */

var moment = require('moment');
var http = require('http');

http.createServer(function (req,res) {
    setInterval(function () {
        var time = moment().format('MMMM Do YYYY, h:mm:ss a');
        // moment().format('llll');
        console.log(time);
        res.end(time);
    },1000);
}).listen(3000);

