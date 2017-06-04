var asteroids = [];
function spawnAsteroid() {
    var r = math.random() * 4;
    var position;
    //removes thisers
    switch (r) {
    case 0:
        this.position = createVector(0, 0);
    case 1:
        this.position = createVector(width, 0);
    case 2:
        this.position = createVector(0, height);
    case 3:
        this.position = createVector(width, height);
    }
    asteroids.push(new Asteroid(this))
}