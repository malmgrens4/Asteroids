function BombBar(numBombs) {
    this.bombsLeft = numBombs;
    this.width = 50;
    this.height = 10;
    this.gap = 10;
    this.bombSize = 5;
    this.position = createVector(this.bombSize, 5);
    this.update = function () {
        
    }
    this.show = function () {
        push();
        fill(0,102,255);
        for(var i = 0; i < this.bombsLeft; i++ ){
            ellipse(this.position.x + (i * this.gap), this.position.y, this.bombSize, this.bombSize);
        }
        pop();
    }
}