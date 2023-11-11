var player;
var setCollisionRef;
var satellites = [];

export function startGame(game_player, setCollision) {
    satellites = [];
    player = game_player
    player.x = (myGameArea.canvas.width) / 2;
    player.y = (myGameArea.canvas.height) / 2;
    setCollisionRef = setCollision;
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
        this.interval = setInterval(updateGameArea, 2);
    },
    stop : function() {
        clearInterval(this.interval);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    incrementFrame: function () {
        this.frameNo += 1;
    }
}

export function Player(width, height, color, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speed_x = 0;
    this.speed_y = 0;
    //ovime postavljam pocetnu poziciju igraca u sredinu canvasa
    this.x = (myGameArea.canvas.width) / 2;
    this.y = (myGameArea.canvas.height) / 2;

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

export function Sattelite(width, height, color, x, y, speed_x, speed_y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speed_x = speed_x;
    this.speed_y = speed_y;
    this.x = x;
    this.y = y;

    this.update = function () {
        let ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGameArea.incrementFrame();

    //svakih 10 frameova se stvara novi satelit, ovime kontroliram brzinu stvaranja satelita
    if (myGameArea.frameNo % 10 === 0) { 
        var x = Math.random() > 0.5 ? -20 : myGameArea.canvas.width + 20;
        var y = Math.random() * myGameArea.canvas.height;
        // Random speed 
        var speedX = (Math.random() - 0.5) * 1.5; 
        var speedY = (Math.random() - 0.5) * 1.5;

        satellites.push(new Sattelite(10, 10, "blue", x, y, speedX, speedY));
    }

    // ovime provjeravam da li je igrac udario u satelit
    for (let i = 0; i < satellites.length; i++) {
        if (
            player.x < satellites[i].x + satellites[i].width &&
            player.x + player.width > satellites[i].x &&
            player.y < satellites[i].y + satellites[i].height &&
            player.y + player.height > satellites[i].y
        ) {
            setCollisionRef(true);
            myGameArea.stop();
        }
    }

    // osvjezavam pozicije satelita
    for (let i = 0; i < satellites.length; i++) {
        satellites[i].x += satellites[i].speed_x;
        satellites[i].y += satellites[i].speed_y;
        satellites[i].update();
    }

    player.newPos();
    player.update();
}