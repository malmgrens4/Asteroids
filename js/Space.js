
new p5();
var spaceParticles = [];
function spawnAsteroid() {
    var r = Math.random() * 4;
    r = Math.floor(r);
    var position;
    switch (r) {
    case 0:
        position = createVector(0, 0);
        break;
    case 1:
        position = createVector(width, 0);
        break;
    case 2:
        position = createVector(0, height);
        break;
    case 3:
        position = createVector(width, height);
        break;
    }
    var size = (getRandom() * (maxSize - minSize)) + minSize;
    asteroids.push(new Asteroid(position, size));
}