var player;
var setCollisionRef;
var asteroids = [];

export function startGame(game_player, setCollision) {
    asteroids = [];
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
        this.canvas.style.height = "75vh";
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
        //ovime stvaram sjenu oko igraca
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
        ctx.fillRect(- 1, - 1, this.width + 2, this.height + 2);
        ctx.restore();

        //ovime stvaram igraca
        ctx.save();
        ctx.translate(this.x, this.y);

        //ovime stvaram okvir igraca
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, this.width, this.height);

        //ovime stvaram tijelo igraca
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

export function Asteroid(width, height, color, x, y, speed_x, speed_y, type) {
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
        //ovime stvaram sjenu oko asteroida
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect((this.width / -2) - 1, (this.height / -2) - 1, this.width + 2, this.height + 2);
        ctx.restore();

        //ovime stvaram asteroid
        ctx.save();
        ctx.translate(this.x, this.y);

        //ovime stvaram okvir asteroida
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 1;
        ctx.strokeRect(this.width / -2, this.height / -2, this.width, this.height);

        //ovime stvaram tijelo asteroida
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
}

function playCollisionSound() {
    var collisionSound = document.getElementById("collisionSound");
    collisionSound.play();
}

function updateGameArea() {
    myGameArea.clear();
    myGameArea.incrementFrame();
    
    //predefinirano ucestalost pojavljivanje asteroida
    //svakih 10 frameova se stvara novi asteroid, ovime kontroliram brzinu stvaranja asteroida
    if (myGameArea.frameNo % 10 === 0) {
        //slucajne brzine asteroida
        var x = Math.random() > 0.5 ? -20 : myGameArea.canvas.width + 20;
        var y = Math.random() * myGameArea.canvas.height;
        // slucajne brzine asteroida 
        var speedX = (Math.random() - 0.5) * 1.5; 
        var speedY = (Math.random() - 0.5) * 1.5;
        // slucajna boja asteroida - nijanse sive boje
        const grayValue = Math.floor(Math.random() * 101) + 50;
        const grayColor = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
        asteroids.push(new Asteroid(10, 10, grayColor, x, y, speedX, speedY));
    }

    // ovime provjeravam da li je igrac udario u asteroid
    for (let i = 0; i < asteroids.length; i++) {
        if (
            player.x < asteroids[i].x + asteroids[i].width &&
            player.x + player.width > asteroids[i].x &&
            player.y < asteroids[i].y + asteroids[i].height &&
            player.y + player.height > asteroids[i].y
        ) {
            //ako se dogodio sudar generira se zvuk i prekida se igra
            playCollisionSound();
            setCollisionRef(true);
            myGameArea.stop();
        }
    }

    // osvjezavam pozicije asteroida
    for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].x += asteroids[i].speed_x;
        asteroids[i].y += asteroids[i].speed_y;
        asteroids[i].update();
    }

    player.newPos();
    player.update();
}