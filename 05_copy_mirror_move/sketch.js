let img;
let slices = 20;
let col = 0;
let offset = 5;
let lastX=0;

function preload() {
    img = loadImage('assets/cindy-small.jpg');
}

function setup() {
    createCanvas(645, 796);
    image(img, 0, 0);
    col = int(img.width / slices);
}

function draw() {
    lastX=0;
    image(img, 0, 0);
    for (let x = 0; x < slices; x++) {
        let f=0;
        
        if(lastX< mouseX){

            f=sin(map(lastX,0,mouseX,0,HALF_PI));
        }else{
            f=sin(map(lastX,mouseX,width,HALF_PI,0));
        }
            col=(f+0.6)*int(img.width / (slices));
            push();
            translate(lastX, 0);
            scale(-1, 1);//mirror slice
            
            copy(img, lastX , 0, col , height, 0, 0, col , height);
            
            pop();
            stroke(255);
            
        lastX+=col;
    }


}