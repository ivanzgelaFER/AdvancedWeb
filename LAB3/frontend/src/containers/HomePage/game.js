var player;

export function startGame(game_player) {
    player = game_player
    //player = new Player(10, 10, "red", 0, 0);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.id = "canvas-container";
        this.canvas.style.width = "93vw";
        this.canvas.style.height = "80vh";
        this.context = this.canvas.getContext("2d");
        document.getElementById("home-page-container-canvas").insertBefore(this.canvas, document.div);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    stop : function() {
        clearInterval(this.interval);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export function Player(width, height, color, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speed_x = 0;
    this.speed_y = 0;
    //ovime postavljam pocetnu poziciju igraca u sredinu canvasa
    this.x = (myGameArea.canvas.width - this.width) / 2;
    this.y = (myGameArea.canvas.height - this.height) / 2;
    this.update = function () {
        let ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();
    };

    this.newPos = function () {
        if (this.x + this.speed_x > 0 && this.x + this.speed_x < myGameArea.canvas.width - this.width) {
            this.x += this.speed_x;
        }
        if (this.y + this.speed_y > 0 && this.y + this.speed_y < myGameArea.canvas.height - this.height) {
            this.y += this.speed_y;
        }
    };
}


function updateGameArea() {
    myGameArea.clear();
    player.newPos();
    player.update();
}