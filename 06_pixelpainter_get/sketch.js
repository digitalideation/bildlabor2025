let img;
function preload(){
  img = loadImage('assets/Nemo.jpeg');

}
function setup() {
  img.resize(600,0);
  createCanvas(windowWidth, img.height);
  noStroke();
}

function draw() {
  image(img, 0, 0);

  // Get the color at the mouse position
  let c = img.get(mouseX, mouseY);
  strokeWeight(5);
	stroke(c);
	line(img.width, mouseY ,windowWidth,mouseY );
}