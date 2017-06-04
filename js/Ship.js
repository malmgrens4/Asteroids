var maxShipAcc = .04;
var maxShipVel = 3;
var accShipIncrement = .1;

function Ship() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.size = 7;
    this.angle;
    

    this.show = function () {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle + -55);//find out why this works
        //rotate(0);
        strokeWeight(1);
        stroke(255, 255, 255);
        noFill();
        var p1x = -this.size/2;
        var p1y = (this.size/2) * (Math.sqrt(3));
        var p2x = 0;
        var p2y = 0;
        var p3x = this.size/2;
        var p3y =  (this.size/2) * (Math.sqrt(3));
        
        console.log("p1 - p2" + dist(p1x, p1y, p2x, p2y));
        console.log("p2 - p3" + dist(p3x, p3y, p2x, p2y));
        console.log("p3 - p1" + dist(p1x, p1y, p3x, p3y));
        //console.log(dist(p1x, p1y, p2x, p2y));
        
        triangle(p1x, p1y, p2x, p2y, p3x, p3y);
        strokeWeight(0);
        fill(255,0,0);
        rect(p1x, p1y, 1,1);
        fill(0,255,0);
        rect(p2x, p2y, 1,1);
        fill(0,0,255);
        rect(p3x, p3y, 1,1);
        fill(255,0,255);
        rect(0,0,1,-40);
        
        pop();


    }
    
    this.update = function () {
        //console.log(Math.abs(this.velocity.x));
        
        this.angle = atan2(mouseY -  this.position.y, mouseX - this.position.x);
        
        
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


//        console.log("x:" + this.velocity.x);
//        console.log("y:" + this.velocity.y);
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

    }


    this.onPress = function (keyCode) {

        if (keyIsDown(UP_ARROW)) {
            this.acceleration.y -= accShipIncrement;
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.acceleration.y += accShipIncrement;
        }
        if (keyIsDown(LEFT_ARROW)) {
            this.acceleration.x -= accShipIncrement;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.acceleration.x += accShipIncrement;
        }

        if (keyIsDown(ENTER)) {
           
            console.log("angle: " + this.angle);
        }
    }
}