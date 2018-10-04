var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/my_db', { useNewUrlParser: true });
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = require("./api/routers/router.js")
var users=require("./api/controller/userController")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

 app.use('/', router);
 app.use(express.static('./public'))


var socket = require('socket.io')
 var server=app.listen(5500);
 var io=socket(server);
io.on('connection', function (client) {
    console.log("system working")
    client.on('disconnect',function () {
        console.log("socket disconnected");
    })
    client.on('tobackend', function (data) {
        users.addtodb(data.userid, data.username, data.message, data.date);
        io.emit('tofrontend', data)
    })


client.on('topersonalbackend',function (data) {
    users.addtopersonaldb(data.senderid, data.message, data.date, data.receiverid,data.sendername,data.receivername);
    io.emit(data.receiverid,data)
})

})
 console.log("Listening to PORT 5500");