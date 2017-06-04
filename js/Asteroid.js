var maxSize = 80;
var minSize = 10;
var maxVelocity = 2;
var minVelocity = .01;
function Asteroid (position) {
    
    this.size = (getRandom() * maxSize) + minSize;
    this.position = position;
    this.velocity = createVector();
    this.velocity.x = (getRandom() * maxVelocity) + minVelocity;
    this.velocity.y = (getRandom() * maxVelocity) + minVelocity;
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
        
        if(this.size < minSize){
            asteroids.splice(1, asteroids.indexOf(this));
        }

    }
    this.show = function () {
        rect(this.position.x, this.position.y, this.size, this.size);
    }
    
}
function getRandom(){
    return Math.random();
}