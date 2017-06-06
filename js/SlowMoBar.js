function SlowMoBar (time) {
    this.time = time;
    this.width = 50;
    this.height = 10;
    this.position = createVector(width - this.width, 0, this.width, this.height);
    this.update = function () {
        if(slowBool){
            this.time-=timeIncrement * 4;
        }
        else{
            if(this.time < slowLimit){
                this.time+=timeIncrement/3;
            }
            if(this.time >= slowLimit){
                this.time = slowLimit;
            }
            
        }
        if(this.time <= 0 ){
            slowBool = false;
            this.time=0;
        }
    }
    this.show = function () {
        push();
        fill(255,140,0);
        rect(this.position.x - 5, this.position.y, this.width * (this.time/slowLimit), this.height);
        pop();
    }
}