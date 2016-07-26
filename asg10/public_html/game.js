/**
 * Created by HIMANSHU.GUPTA on 23/07/2016.
 */

var level = localStorage.getItem('level');
level = Number(level);

var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');


Game_height = 600;
Game_width = 700;
var enemy = [
    {
        x : 100,
        y : 100,
        w : 50,
        h : 50,
        speedy : (1 * level)

    },
    {
        x : 200,
        y : 200,
        w : 50,
        h : 50,
        speedy : (2 * level)

    },
    {
        x : 300,
        y : 400,
        w : 50,
        h : 50,
        speedy : (2.5 * level)

    },
    {
        x : 400,
        y : 500,
        w : 50,
        h : 50,
        speedy : (1 * level)

    }
];

var sprites = {

};

sprites.player = new Image();
sprites.player.src = "assets/pika.png";
sprites.goal = new Image();
sprites.goal.src = "assets/ball.png"
sprites.enemy = [];
sprites.enemy[0] = new Image()
sprites.enemy[0].src = "assets/bulbasaur.png";
sprites.enemy[1] = new Image()
sprites.enemy[1].src = "assets/charizad.png";
sprites.enemy[2] = new Image()
sprites.enemy[2].src = "assets/drowsy.png";
sprites.enemy[3] = new Image()
sprites.enemy[3].src = "assets/gengar.png";


var gameover = false;
var player = {
    x : 10,
    y : Game_height/2,
    w : 50,
    h : 50,
    speedx: 2,
    ismoving : false
};
function UpdateScore() {
    var s = Math.floor((player.x-10)/10);
    s = s*level;
    document.getElementById('score').innerHTML = "Score: " + s;

}

var goal =
{
    x : Game_width-50,
    y : Game_height/2,
    w : 50,
    h : 50
};

function iscolliding(rect1, rect2) {
    var first = Math.abs(rect1.x-rect2.x)<=Math.max(rect1.w,rect2.w);
    var second = Math.abs(rect1.y-rect2.y)<=Math.max(rect1.h,rect2.h);
   // console.log("first is " + first +  " and second is"+ second);
    if (first&&second)
    {
     //   console.log("Ohh Yess");
        return true;
    }
    else
        return false;
}

canvas.addEventListener("mousedown",function () {
    player.ismoving = true;

});
canvas.addEventListener("mouseup",function () {
    player.ismoving = false;

});
canvas.addEventListener("touchstart",function () {
    player.ismoving = true;

});
canvas.addEventListener("touchstop",function () {
    player.ismoving = false;

})

var update = function () {

   // console .log("Update");

    enemy.forEach(function (element,index) {
        if(iscolliding(player,element))
        {

            alert("Game Over");
            gameover = true;
            $.get('/leader',{score : level*Math.floor((player.x-10)/10) , username : localStorage.getItem('username')}, function (data, status) {

                console.log("leaderboard Published");
          //      localStorage.clear();
                window.location.href = "leader.html";


            });

        }

    });
    if (iscolliding(player,goal))
    {
        alert("You Won");
        gameover = true;
        $.get('/leader',{score : level*Math.floor((player.x-10)/10), username : localStorage.getItem('username')}, function (data, status) {

            console.log("leaderboard Published");
//            localStorage.clear();


            $.get('/update',{username : localStorage.getItem('username'), level:level+1} ,function (data, status) {
                window.location.href = "leader.html";

            });




        });


    }

    enemy.forEach(function (element,index) {
        {

            element.y+=element.speedy;
            if (element.y>=Game_height-50||element.y<=0)
            {
                element.speedy = -1 * element.speedy;
            }
        }

    })
    if (player.ismoving)
    {
        player.x = player.x + player.speedx;
    }
    UpdateScore();


}

var draw = function () {
   // console.log("Draw");
    ctx.clearRect(0,0,Game_width,Game_height);
    ctx.fillStyle = "rgb(0,200,0)";

    enemy.forEach(function (element, index) {
        ctx.drawImage(sprites.enemy[index],element.x, element.y, element.w, element.h);

    });

    ctx.fillStyle  = "rgb(100,0,0)";
    //ctx.fillRect(player.x, player.y, player.w, player.h);
    ctx.drawImage(sprites.player,player.x, player.y, player.w, player.h);
    ctx.fillStyle  = "purple";
    //ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
    ctx.drawImage(sprites.goal,goal.x, goal.y, goal.w, goal.h);


}

var render = function () {
   // console.log("Render");
    draw();
    update();
    if (gameover==false)
        window.requestAnimationFrame(render);

}
render();