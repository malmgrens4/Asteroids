var ship;

function setup(){
    angleMode();
    createCanvas(400, 400);
    ship = new Ship();
}

function draw(){
    background(51);
    ship.update();
    ship.show();
    ship.onPress();
}



