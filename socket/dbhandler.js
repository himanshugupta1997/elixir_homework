/**
 * Created by himanshu on 27/7/16.
 */

var mysql = require('mysql');


const createConnection = function () {
    console.log("Create Connection Function Called");
    var  connection = mysql.createConnection(
        {
            host     : 'localhost',
            user     : 'himanshu',
            // password : 'secret',
            database : 'practice'
        }
    );
    console.log("Create Connection Function ended");
    return connection;
};

module.exports = {

    load_chat : function (cb) {
        console.log("load chat function called");
        var con = createConnection();
        con.connect();
        con.query('SELECT * FROM chat', function (err,rows,fields) {
            if(err)
            {
                console.log("Error");
                return;
            }

            cb(rows);

        });

    },

    add_msg : function (username , msg) {

        var con = createConnection();
        console.log("Add message function called");
        con.connect();
        var time = new Date();
        var t= time.getTime();
        t = t%10000000;
        con.query('INSERT INTO chat VALUES("' + username + '", "' + msg + '",' + t + ')', function (err,rows,fields) {

            if(err)
            {
                console.log("Error Found");
                return;
            }

            console.log("Added messages");


        } );

    },

    /*add_user : function (username) {

        var con = createConnection();
        con.connect();
        con.query('Select * from ut where username = ' + username, function (err, rows, fields) {
            if (err)
            {
                con.query('INSERT INTO ut VALUES')
            }

        })
    }*/

};