var ship;
var duration = 1;
var asteroids = [];
function setup() {
    angleMode();
    createCanvas(800, 800);
    ship = new Ship();
    setInterval(spawnAsteroid, 1000);
}

function draw() {
    duration++;
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
        if(!asteroids[i].alive){
            asteroids.splice(i, 1);
        }
    }
}

function mousePressed () {
    ship.mousePress ();
}