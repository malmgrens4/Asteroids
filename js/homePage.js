var ship;
var duration;
var asteroids;
var score;
var spaceParticles;
var gameActive = true;
var highScore = 0;
var timeIncrement =1;
var shotCount = 0;
var slowFlag = false;
var slowBool = false;
var killsInRow = 0;
var consecutiveCheck = 0;
var slowDuration;
var slowLimit;
var slowMoBar;
function setup() {
    frameRate(60);
    slowFlag = false;
    slowBool = false;
    killsInRow = 0;
    consecutiveCheck = 0;
    angleMode();
    createCanvas(800, 600);
    duration = 1;
    score = 0;
    ship = new Ship();
    asteroids = [];
    spaceParticles = [];
    
    timeIncrement = 1;
    slowDuration = 0;
    slowLimit = 500;
    slowMoBar = new SlowMoBar(slowLimit);
    
}

function draw() {
    
    updateDisplay();
    duration+=timeIncrement;
    background(51);
    if (ship.alive) {
        ship.update();
        ship.show();
        ship.onPress();
    }
    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].update();
        asteroids[i].show();
        ship.checkCollision(asteroids[i]);
        if (!asteroids[i].alive) {
            asteroids.splice(i, 1);
        }
    }
    for (var i = 0; i < spaceParticles.length; i++) {
        spaceParticles[i].update();
        spaceParticles[i].show();
        if (!spaceParticles[i].alive) {
            spaceParticles.splice(i, 1);
        }
    }
    slowMoBar.update();
    slowMoBar.show();
    
    if(slowBool){
        frameRate(25);  
    }
    else{
        frameRate(60);
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
        if (!ship.alive) {
            setup();
            $("#new-game").html("");
        }
    }
}

function mousePressed() {
    ship.mousePress();
}

function addScore() {
    score += 10 + (10 * Math.floor(duration / 1000)) + ship.consecutive;
}

function promptNewGame() {
    timeIncrement=0;
    gameActive = false;
    $("#new-game").html("Press Enter");
    if (score > parseInt($("#high-score").text())) {
        $("#high-score").html(score);
    }
}
function updateDisplay() {
    $("#score").html(score);
    $("#consecutive").html(ship.consecutive);
    $("#duration").html(duration);
}
setInterval(spawnAsteroid, 5000);