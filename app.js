var canvas = document.getElementById("pinpon");
var ctx = canvas.getContext("2d");

//キャンパスの中央
var x = canvas.width / 2;
var y = canvas.height /2;

var dx = 2;
var dy = -2;

var ballRadius = 10;

var PaddleY = (canvas.height / 2) - 35;
var PaddleX = 10;
var Paddlewidth = 10;
var Paddleheight = 70;
var AIPaddleheight = 70;

var TopPress = false;
var BottomPress = false;

var AIPaddleX = 460;
var AIPaddleY = (canvas.height / 2) - 35;

//敵の台の描写
function drawAIPaddle() {
    ctx.beginPath();
    ctx.rect(AIPaddleX, AIPaddleY, Paddlewidth, AIPaddleheight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

//台の描写
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(PaddleX, PaddleY, Paddlewidth, Paddleheight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

//ボールの描写
function drawBall() {
    //ボールの描写
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
    
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall();
    drawPaddle();
    drawAIPaddle();

    //上と下の壁で反射する
    if(y + dy == ballRadius | y + dy == canvas.height - ballRadius) {
        dy = -dy;
    }
    //右の台か壁でで反射する
    else if(x + dx == canvas.width - ballRadius) {
        if(y > AIPaddleY && y < AIPaddleY + AIPaddleheight){
            dx = -dx;
        }
        //反射しなければゲームオーバー
        else {
            alert("YOU_WIN");
            document.location.reload();
        }
    }
    //ボールの座標が台の中にあり左の壁際のあたりで反射する
    else if(x + dx == ballRadius + 10) {
        if(y > PaddleY && y < PaddleY + Paddleheight){
            dx = -dx;
        }
        //反射しなければゲームオーバー
        else {
            alert("YOU_LOSE");
            document.location.reload();
        }
    }
    else if(AIPaddleY > y - 30 && AIPaddleY > 0) {
        AIPaddleY -= 2;
    }
    else if(AIPaddleY < y && AIPaddleY < 250) {
        AIPaddleY += 2;
    }

    x += dx;
    y += dy;
    //キーを押したときの反応
    if(TopPress && PaddleY > 0) {
        PaddleY -= 3;
    }
    if(BottomPress && PaddleY < canvas.height - 70) {
        PaddleY += 3;
    }
}

//イベントと追加する
//初めはfalseで後からtrueにする
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        TopPress = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        BottomPress = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        TopPress = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        BottomPress = false;
    }
}

setInterval(draw, 10);
draw();
