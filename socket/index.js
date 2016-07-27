/**
 * Created by himanshu on 25/7/16.
 */


var express = require('express');

var app = express();
var http = require('http');
var db = require('./dbhandler');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const socketio = require('socket.io');
const server = http.Server(app);

const io = socketio(server);  //io  server created on io.

app.use('/', express.static(__dirname+'/public_html'));


io.on('connection',function (socket) {   // different sockets  for different variables    Server runs one time.  Client side multiple

    socket.on('chat',function (data) {
        console.log(data.msg);
        io.emit('chat', data);    //emitted by io.

    });
    /*Socket.broadcast.emit()    Group chat call To everyone else  accept us th client*/
    console.log("io.on(connection)  A user is connected");


});


app.post('/load',function (req , res) {


    db.load_chat(function (rows) {

        var table = [];
        if(typeof rows == undefined || rows == null)
        {
            return;
        }
        for(var i = 0; i<rows.length; i++)
        {
            table.push({msg : rows[i].msg, username : rows[i].username, time : rows[i].time});
        }

        console.log("Sending table. Load chat successful");
        res.send(table);


    });


});

app.get('/addchat',function (req,res) {

    db.add_msg(req.query.username, req.query.msg);
    res.send({});

});


/*app.get('/adduser', function (req,res) {



});*/

server.listen(3000 , function () {

    console.log("listening on port 3000");

});
//ambiguity