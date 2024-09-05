var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var rad = Math.min(innerWidth, innerHeight) / 2;

var mouse = {
    x: undefined,
    y: undefined,
    prevMx: undefined,
    prevMy: undefined,
    pressed: false
}

var colorArray = [
    '#F2E7DC',
    '#F2E7DC90',
    '#F2E7DC80',
    '#F2E7DC70',
    '#F2E7DC60',
    '#F2E7DC50',
    '#F2E7DC40',
    '#F2E7DC30',
    '#F2E7DC20',
    '#F2E7DC10'
]

window.addEventListener('mousedown', (event) => {
    mouse.pressed = true;
})

window.addEventListener('mouseup', (event) => {
    mouse.pressed = false;
})

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
        //console.log(mouse);
    })

window.addEventListener('resize',
    function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        init();
    })

function Circle(x, y, dx, dy, oxs, oys, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.oxs = oxs;
    this.oys = oys;
    this.color = color;

    this.xcPos = Math.round(Math.random() * 360);
    this.ycPos = Math.round(Math.random() * 360);

    this.draw = function () {
        c.beginPath();
        c.rect(this.x, this.y, this.xs, this.ys);
        c.fillStyle = color;
        c.fill();
    }

    this.update = function () {
        var ddx = 0, ddy = 0;
        /*
        //bordercoll.
        if (this.x > innerWidth + this.xs) {
            this.x = 0;
        }
        if (this.y > innerHeight + this.ys) {
            this.y = 0;
        }
        if (this.x < 0 - this.xs) {
            this.x = innerWidth;
        }
        if (this.y < 0 - this.ys) {
            this.y = innerHeight;
        }
        */

        if (mouse.x > mouse.prevMx || mouse.x < mouse.prevMx) {
            ddx = -(mouse.x - mouse.prevMx) * 0.002;
        }
        if (mouse.y > mouse.prevMy || mouse.y < mouse.prevMy) {
            ddy = -(mouse.y - mouse.prevMy) * 0.002;
        }

        this.xcPos += ddx * this.dx;
        this.ycPos += ddy * this.dy;

        this.x = innerWidth / 2 + 1 * (rad * 2 * Math.tan((-Math.PI / 2) + (this.xcPos) * Math.PI / 180));
        this.y = innerHeight / 2 + 1 * (rad * 2 * Math.tan((-Math.PI / 2) + (this.ycPos) * Math.PI / 180));

        this.xs = 1 + this.oxs + this.oxs * Math.abs(innerWidth / 2 - this.x) / 1000;
        this.ys = 1 + this.oys + this.oys * Math.abs(innerHeight / 2 - this.y) / 1000;

        this.draw();

        if (!mouse.pressed) {
            mouse.prevMx = mouse.x;
            mouse.prevMy = mouse.y;
        }
    }
}

var circleArray = [];

function init() {
    circleArray = [];
    var paramSize = 0.5;

    for (var i = 0; i < 2; ++i) {
        for (var n = 10; n > 1; n *= 0.9995) {
            var
                oxs = Math.round(Math.random() * paramSize * n),
                oys = oxs,
                x = Math.round(Math.random() * innerWidth / 2),
                y = Math.round(Math.random() * innerWidth / 2),
                dx = n,
                dy = n,
                color = colorArray[10 - n];

            circleArray.push(new Circle(x, y, dx, dy, oxs, oys, color));
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; ++i) {
        circleArray[i].update();
    }
}

init();
animate();