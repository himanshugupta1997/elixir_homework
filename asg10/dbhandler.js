/**
 * Created by himanshu on 26/7/16.
 */
var mysql = require('mysql');
var  connection = {};
const createConnection = function () {
    console.log("Create Connection Function Called");
    connection = mysql.createConnection(
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

    fetch_user : function (cb) {
        console.log("Fetch user function called");
        var con = createConnection();
        con.connect();
        //SELECT * FROM practice;
        var table = [];
        con.query('SELECT * FROM Pokemon',function (err, rows, fields) {
            if (err)
            {

            }

            else if (typeof rows == undefined || typeof rows == 'undefined' || rows == null)
            {

            }
            else
            {

                console.log("query done without err");
                console.log("rows are");
                console.log(rows);
                for (var i = 0; i<rows.length; i++)
                {
                    console.log("For loop runnin for i" + i);
                    table.push({ username : rows[i].username,
                                 level : rows[i].Level});
                }
            }
            cb(table);
        });
        con.end();
    },

    add_user : function (name) {
        var con = createConnection();
        con.connect();
        //INSERT INTO Pokemon Values(name,0)
        con.query('INSERT INTO Pokemon VALUES("' + name + '",0)', function (err,rows,fields) {

            if (err) {
                console.log("error found");
            }

        } );

    },
    add_score : function (username , score) {
        console.log("add Score function called");

        con = createConnection();
        con.connect();
        con.query('INSERT INTO leaderboard VALUES("' + username+ '",' + score + ')', function (err,rows,fields) {

            if(err)
            {
                console.log("error");
            }
            
        });
        con.end();

    },
    fetch_score : function (cb) {
        console.log("fetch Score function Callled");
        var con = createConnection();
        con.connect();
        con.query('SELECT * FROM leaderboard ORDER BY Score DESC ', function (err,rows,fields) {

            if(err)
            {
                console.log("error");
                return;
            }
            cb(rows);



        });

        con.end();

    },
    
    update : function (username,level) {
        console.log("Update function called");
        var con = createConnection();
        con.connect();
        con.query('DELETE FROM Pokemon where username=' + '"' + username + '"', function (err,rows,fields) {

            if (err)
            {
                console.log("Error");
            }
            var l = Number(level) + 1;

            con.query('INSERT INTO Pokemon VALUES("' + username + '",'+ l+')', function (err,rows,fields) {

                if (err) {
                    console.log("error found");
                }

            } );



        });
        
    }

};