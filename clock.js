var WINDOW_WIDTH = 1200;
var WINDOW_HEIGHT = 600;
var RADIUS = 8;
var MARGIN_LEFT = 60;
var MARGIN_TOP = 60;
var C_TIME = 2000;
var COLOR;

function color() {
    var R = Math.floor(Math.random() * 255);
    var G = Math.floor(Math.random() * 255);
    var B = Math.floor(Math.random() * 255);
    COLOR = "rgb(" + R + "," + G + "," + B + ")";
    console.log(COLOR);

}
// const endTime = new Date();
// endTime.setTime(endTime.getTime() + 3600000); 倒计时

var balls = [];

var curShowTimeSeconds = 0;
window.onload = function() {
    WINDOW_WIDTH = document.documentElement.clientWidth;
    WINDOW_HEIGHT = document.documentElement.clientHeight;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    canvas.width = WINDOW_WIDTH;

    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();
    var num = 0;
    //render(context);
    setInterval(
        function() {
            if (num == parseInt(C_TIME / 50)) {
                render(context);
                update();
                color();
                num = 0;

            } else {
                render(context);
                update();
                num++;
                console.log(num);
            }
            // console.log(num);


        }, 50);
}

function getCurrentShowTimeSeconds() {
    // var curTime = new Date();
    // var ret = endTime.getTime() - curTime.getTime();
    // ret = Math.round(ret / 1000);
    // return ret >= 0 ? ret : 0;
    var curTime = new Date();
    var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
    return ret;
}

function update() {

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();
    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = parseInt(nextShowTimeSeconds % 60);

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = parseInt(curShowTimeSeconds % 60);
    if (nextSeconds != curSeconds) {

        if (parseInt(curHours / 10) != parseInt(nextHours / 10))
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));

        if (parseInt(curHours % 10) != parseInt(nextHours % 10))
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10));

        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10))
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));

        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10))
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));

        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10))
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));

        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10))
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10));
        curShowTimeSeconds = nextShowTimeSeconds;

    }
    updateBalls();

}

function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }

    }
    var cnt = 0;
    for (var i = 0; i < balls.length; i++)
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH)
            balls[cnt++] = balls[i];
    while (balls.length > Math.min(500, cnt))
        balls.pop();
}

function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if (digit[num][i][j] == 1) {
                var R = Math.floor(Math.random() * 255);
                var G = Math.floor(Math.random() * 255);
                var B = Math.floor(Math.random() * 255);
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + RADIUS + 1,
                    y: y + i * 2 * (RADIUS + 1) + RADIUS + 1,
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: "rgb(" + R + "," + G + "," + B + ")"
                }
                balls.push(aBall);
            }
}

function render(ctx) {


    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = parseInt(curShowTimeSeconds % 60);

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);

    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx);


    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx);

    for (var i = 0; i < balls.length; i++) {

        ctx.fillStyle = balls[i].color;
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }

}

function renderDigit(x, y, num, ctx) {
    ctx.fillStyle = COLOR;

    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if (digit[num][i][j] == 1) {
                ctx.beginPath();
                ctx.arc(x + j * 2 * (RADIUS + 1) + RADIUS + 1, y + i * 2 * (RADIUS + 1) + RADIUS + 1, RADIUS, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();
            }
}
