
var domBtn = document.querySelector("#startBtn");
var domCanvas = document.getElementById("snake");
var CTX = domCanvas.getContext("2d");


domCanvas.width = 400;
domCanvas.height = 400;
const W = domCanvas.width;
const H = domCanvas.height;
const cells = 20;
const cellSize = 20;

class Segment {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = W/cells;
        this.color = 'white';
    }
    draw() {
        CTX.fillStyle = this.color;
        // CTX.shadowBlur = 20;
        // CTX.shadowColor = "rgba(255,255,255,.3 )";
        CTX.fillRect(this.x, this.y,this.size, this.size);
    }
    clear() {
        CTX.clearRect(this.x, this.y, this.size, this.size);
    }
    setPostion(x, y) {
        this.x = x;
        this.y = y;
    }
}

var KEY = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowLeft: false,
    ArrowDown: false,
    resetState() {
        this.ArrowUp = false;
        this.ArrowRight = false;
        this.ArrowLeft = false;
        this.ArrowDown = false;
    },
    listen() {
        addEventListener("keydown", (e) => {
            this.resetState()
            this[e.key] = true;
            console.log(this);
        })
    },
};

class Snake {
    constructor() {
        const seg = new Segment(220, 200);
        const seg1 = new Segment(200, 200);
        const seg2 = new Segment(180, 200);
        this.segments = [seg, seg1, seg2];
        this.direction = 'ArrowRight';
    }
    draw() {
        this.segments.map((seg, index) => {
            seg.draw();
        })
    }
    move() {
        this.segments.map((seg) => {
            seg.clear();
        })
        for(var i=this.segments.length-1; i>0; i--) {
            this.segments[i].setPostion(this.segments[i-1].x, this.segments[i-1].y)
        }
        const x = this.segments[0].x;
        const y = this.segments[0].y;
        if(this.direction === "ArrowRight") this.segments[0].x = x+20;
        if(this.direction === "ArrowLeft") this.segments[0].x = x-20;
        if(this.direction === "ArrowUp") this.segments[0].y = y-20;
        if(this.direction === "ArrowDown")  this.segments[0].y = y + 20
        this.draw();
        console.log(this.segments);
    }
    listen() {
        addEventListener("keydown", (e) => {
            this.direction = e.key;
        })
    }
}

class Food {
    constructor() {
        this.x = ~~(Math.random() * cells) * cells;
        this.y = ~~(Math.random() * cells) * cells;
        this.color = `hsl(${~~(Math.random() * 360)},100%,50%)`;
        this.size = cellSize;
    }
    draw() {
        CTX.fillStyle = `hsl(${~~(Math.random() * 360)},100%,50%)`;
        // CTX.shadowBlur = 20;
        // CTX.shadowColor = "rgba(255,255,255,.3 )";
        CTX.fillRect(this.x, this.y,this.size, this.size);
    }
    spawn() {
        this.x = ~~(Math.random() * cells) * cells;
        this.y = ~~(Math.random() * cells) * cells;
        this.draw();
    }
}

class Game {
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
    }
    start() {
        this.snake.draw();
        this.food.draw();
        this.snake.listen();
    }
    draw() {
        CTX.lineWidth = 1.1;
        CTX.strokeStyle = "#232332";
        CTX.shadowBlur = 0;
        for (let i = 1; i < cells; i++) {
            let f = (W / cells) * i;
            CTX.beginPath();
            CTX.moveTo(f, 0);
            CTX.lineTo(f, H);
            CTX.stroke();
            CTX.beginPath();
            CTX.moveTo(0, f);
            CTX.lineTo(W, f);
            CTX.stroke();
            CTX.closePath();
        }
    }
    update() {
        setInterval(() => {
            this.draw();
            if(this.snake.segments[0].x === this.food.x && this.snake.segments[0].y === this.food.y) {
                const seg = new Segment();
                this.snake.segments.push(seg);
                this.food.spawn();
            }
            this.snake.move();
            // console.log(this.snake.segments);
            // this.snake.draw();
            
        }, 300)
    }
}


const game = new Game();
game.draw();
game.start();
domBtn.addEventListener('click', () => {
    game.update();
})