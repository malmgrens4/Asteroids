var numParticlesSpawn = 10;
var nx;
var ny;
var maxPartVel = 1.2;
var minPartVel = .2;
var partSize = 1;
var lifespan = 100;

function SpaceParticle(position) {
    this.position = position.copy();
    var vx = getRandom() * ((maxPartVel - minPartVel) + minPartVel);
    var vy = getRandom() * ((maxPartVel - minPartVel) + minPartVel);
    var r = getRandom();
    if (r < .25) {
        vx *= -1;
        vy *= -1;
    }
    if (r >= .25 && r < .5) {
        vy *= -1
    }
    if (r >= .5 && r < .75) {
        vx *= -1;
    }
    this.velocity = (createVector(vx, vy));
    this.lifespan = lifespan;
    this.alive = true;
    this.update = function () {
        this.lifespan--;
        this.position.add(this.velocity);
        if (this.lifespan <= 0) {
            this.alive = false;
        }
        
    }
    this.show = function () {
        push();
        colorMode(RGB, 255, 255, 255, 1);
        stroke(255, 255, 255, this.lifespan / lifespan);
        if (!ship.alive) {
            stroke(getRandom() * 255, getRandom() * 255, getRandom() * 255, this.lifespan / lifespan);
        }
        strokeWeight(1);
        noFill();
        ellipse(this.position.x, this.position.y, partSize, partSize);
        pop();
    }
}

function spawnSpaceParticles(position) {
    for (var i = 0; i < numParticlesSpawn; i++) {
        nx = position.x + (Math.random());
        ny = position.y + (Math.random());
        spaceParticles.push(new SpaceParticle(createVector(nx, ny)));
    }
}