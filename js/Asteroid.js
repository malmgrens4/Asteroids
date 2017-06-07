var maxSize = 160;
var minSize = 10;
var maxVelocity = 2;
var minVelocity = .01;

function Asteroid(position, size) {
    this.size = size;
    this.position = position.copy();
    this.velocity = createVector();
    this.velocity.x = (getRandom() * maxVelocity) + minVelocity;
    this.velocity.y = (getRandom() * maxVelocity) + minVelocity;
    var r = getRandom();
    if (r < .25) {
        this.velocity.x *= -1;
        this.velocity.y *= -1;
    }
    if (r >= .25 && r < .5) {
        this.velocity.y *= -1
    }
    if (r >= .5 && r < .75) {
        this.velocity.x *= -1;
    }
    this.alive = true;
    this.update = function () {
        this.position.add(this.velocity);
        if (this.position.x > width) {
            this.position.x = 0;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        }
        if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y < 0) {
            this.position.y = height;
        }
        if (this.size < minSize) {
            this.alive = false;
            this.explode();
        }
    }
    this.show = function () {
        push();
        stroke(255, 255, 255);
        strokeWeight(1);
        noFill();
        ellipse(this.position.x, this.position.y, this.size);
        pop();
    }
    this.split = function () {
        
        var newSize = this.size / 2;
        var p1 = createVector(this.position.x + newSize, this.position.y);
        var p2 = createVector(this.position.x - newSize, this.position.y);
        asteroids.push(new Asteroid(this.position, newSize));
        asteroids.push(new Asteroid(this.position, newSize));
        asteroids.splice(asteroids.indexOf(this), 1);
    }
    this.checkCollision = function (projpos) {
        var d = dist(this.position.x, this.position.y, projpos.x, projpos.y);
        if (d < this.size / 2) {
            this.split();
            return true;
        }
        return false;
    }
    this.explode = function () {
        spawnSpaceParticles(this.position);
        
        killsInRow += .5;
       
        if (killsInRow >= 3) {
            slowMoBar.time += (slowLimit/10);
            consecutiveCheck = 0;
        }
    }
}

function getRandom() {
    return Math.random();
}