/**
 * Created by himanshu on 25/7/16.
 */


var socket = io();  //Connected to this server only.

$(function () {



    var username = prompt("Enter username to chat");
    while(username === "")
    {
        username = prompt("Enter username to chat");
    }

/*    $.get('/adduser', {username : username} ,function (data,status) {

    });*/

    $.post('/load',function (data , status) {

        if(typeof  data == undefined || data == null || data.length == 0)
        {
            return;
        }
        console.log("data received is ");
        console.log(data);
        for(var i = 0; i<data.length; i++)
        {
            $('#chatbox').prepend("<span style='color: purple'>" + data[i].username  + " :</span> "  + data[i].msg + '<br>' );


        }


    });


    $('#submitchat').click(function () {

        if($('#chatmessage').val() == "")
        {
            alert("Null string cannot be sent");
            return;
        }


        socket.emit('chat',{msg : $('#chatmessage').val(), username : username} ); // Any name


        $.get('/addchat', {username : username , msg:$('#chatmessage').val()},   function () {

        });
        $('#chatmessage').val("");



    });




    socket.on('chat',function (data) {
        $('#chatbox').prepend("<span style='color: purple'>" + data.username  + ":</span>  "  + data.msg + '<br>' );

    })

});