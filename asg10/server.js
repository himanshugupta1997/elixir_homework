/**
 * Created by himanshu on 26/7/16.
 */

var express = require('express');
var app = express();  // App is an instance of express.
var db = require('./dbhandler');

app.use('/',express.static(__dirname + '/public_html'));

app.get('/newuser',function (req,res) {
    console.log("app.get method called. New user inside ");
    db.fetch_user(function (table) {
        console.log("db fetched");

        var flag = 1;
        for(var i=0; i<table.length; i++)
        {
            if(table[i].username === req.query.username)
            {
                flag = 0;
                break;
            }
        }

        res.send({val : flag});
        if (flag === 1)
        {
           db.add_user(req.query.username);
        }
        console.log("New user function finished successfully");
    });



});

app.get('/update', function (req,res) {

    db.update(req.query.username, req.query.level);
    res.send({});
});

app.get('/login',function (req,res) {
    console.log("app.get method called. login function inside ");
     db.fetch_user(function (table) {

        console.log("db fetched");

        var flag = -1;
        console.log("table is ");
        console.log(table);
        for(var i=0; i<table.length; i++)
        {
            if(table[i].username === req.query.username)
            {
                console.log("Username Matched");
                flag = table[i].level;
                break;
            }
        }
        console.log("Sending flag: " + flag);
         res.send({val:flag});
    });



    console.log("fetch user ended successfully");
});


app.get('/leader',function (req,res) {

    db.add_score(req.query.username, req.query.score);
    res.send({});


});

app.get('/fetch_score',function (req,res) {
    console.log("fetch Score");

db.fetch_score(function (table) {
    console.log("Call back fetch todos");
    console.log("table");
    var T = [];
    for(var i = 0; i<table.length; i++)
    {
        T.push({username: table[i].username, score:table[i].Score});
    }
    res.send(T);


});

});

app.listen(3000, function () {
    console.log("Server running on port 3000");

});