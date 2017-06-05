function Projectile(position, angle) {
    this.position =  position.copy();
    this.speed = 5;
    this.angle = angle;
    this.velocity = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
    this.width = 1;
    this.height = 3;
    
    
    this.update = function () {
        this.position.add(this.velocity); 
    }
    this.show = function () {
        push();
        stroke(255,255,255);
        strokeWeight(1);
        rect(this.position.x, this.position.y, this.width, this.height);
        pop();
    }
}