var ship;

function setup(){
    angleMode();
    createCanvas(800, 800);
    ship = new Ship();
}

function draw(){
    background(51);
    ship.update();
    ship.show();
    ship.onPress();
}



