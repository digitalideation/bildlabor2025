//1. Load Image
let bild;

let zahl;
zahl=0;
//0
zahl = zahl + 1; //0+1
//1

function preload(){
  bild=loadImage("assets/cindy-small.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  image(bild,0,0);

  frameRate(10);
}

function draw() {
   
   //image(bild, mouseX, mouseY, mouseX, bild.height);
   
  let distanz = random(-100, 100);
  let x = random(0, width);
   copy(x, 0, 50, height, x+distanz, distanz, 50, height);

   
   // ellipse(mouseX, mouseY, 50,50);
 
  // 2. Display the image 

  // 3. Copy parts  of the image to the canvas -- use function get() and mouseX, mouseY

  // 4. add some randomness


}


// 5. add a save function