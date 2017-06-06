var maxShipAcc = .04;
var maxShipVel = 3;
var accShipIncrement = .1;

function Ship() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.size = 7;
    this.angle;
    this.alive = true;
    this.consecutive = 0;
    this.projectiles = [];
    this.show = function () {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle + -55); //find out why this works
        strokeWeight(1);
        stroke(255, 255, 255);
        noFill();
        var p1x = -this.size / 2;
        var p1y = (this.size / 2) * (Math.sqrt(3));
        var p2x = 0;
        var p2y = 0;
        var p3x = this.size / 2;
        var p3y = (this.size / 2) * (Math.sqrt(3));
        
        triangle(p1x, p1y, p2x, p2y, p3x, p3y);
        pop();
    }
    this.update = function () {
        this.angle = atan2(mouseY - this.position.y, mouseX - this.position.x);
        this.velocity.add(this.acceleration);
        if (Math.abs(this.acceleration.x) > maxShipAcc || Math.abs(this.acceleration.y) > maxShipAcc) {
            this.acceleration = createVector(0, 0);
        }
        if (Math.abs(this.velocity.x) > maxShipVel) {
            if (this.velocity.x != 0) {
                var vx = this.velocity.x / Math.abs(this.velocity.x);
                this.velocity.x = maxShipVel * vx;
            }
        }
        if (Math.abs(this.velocity.y) > maxShipVel) {
            if (this.velocity.y != 0) {
                var vy = this.velocity.y / Math.abs(this.velocity.y);
                this.velocity.y = maxShipVel * vy;
            }
        }
        
        this.acceleration = createVector(0, 0);
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
        for (var i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].update();
            this.projectiles[i].show();
            if (this.projectiles[i].position.x > width || this.projectiles[i].position.x < 0 || this.projectiles[i].position.y > height || this.projectiles[i].position.y < 0) {
                this.consecutive = 0;
                killsInRow = 0;
                slowBool = false;
                this.projectiles.splice(i, 1);
            }
        }
        for (var i = 0; i < asteroids.length; i++) {
            for (var j = 0; j < this.projectiles.length; j++) {
                if (asteroids[i].checkCollision(this.projectiles[j].position)) {
                    this.consecutive += 1;
                    addScore();
                    this.projectiles.splice(j, 1);
                }
            }
        }
    }
    this.onPress = function (keyCode) {
        if (keyIsDown(87)) {
            this.acceleration.y -= accShipIncrement;
        }
        if (keyIsDown(83)) {
            this.acceleration.y += accShipIncrement;
        }
        if (keyIsDown(65)) {
            this.acceleration.x -= accShipIncrement;
        }
        if (keyIsDown(68)) {
            this.acceleration.x += accShipIncrement;
        }
        if(keyIsDown(16)){
            slowBool=true;
        }
        else{
            slowBool=false;
        }
    }
    
    this.mousePress = function () {
        this.projectiles.push(new Projectile(this.position, this.angle));
    }
    this.checkCollision = function (aspos) {
        var d = dist(aspos.position.x, aspos.position.y, this.position.x, this.position.y);
        if (d < (aspos.size / 2) + this.size / 4) {
            this.explode();
        }
    }
    this.explode = function () {
        this.alive = false;
        spawnSpaceParticles(this.position);
        this.position.x = -100;
        promptNewGame();
    }
}