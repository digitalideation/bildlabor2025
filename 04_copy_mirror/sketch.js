let img;
let slices = 20;//how many slices
let col = 0;//width of a slice, gets calculated in setup


function preload() {
    img = loadImage('assets/felsen.jpg');
}

function setup() {
    let cvn=createCanvas(645, 796);
    cvn.parent("sktech5")
    image(img, 0, 0);
    col = int(img.width / slices);

    angleMode(DEGREES);
}

function draw() {

   
    for (let x = 0; x < slices; x++) {


        push();
        translate(x * col, 0);
        scale(-1, 1);//mirror slice
        //copy slice from original image and display it mirrored
        copy(img, x * col, 0, col, height, 0, 0, col, height);

        pop();

    }


}