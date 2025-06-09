let img;
let pixSize = 10;
let slider;

function setup() {
  createCanvas(600, 600);
  img = loadImage("assets/plakatwand.jpg");
  noStroke();

 // important: start with 1 (not with zero)
  slider = createSlider(1, 500, 500);
  slider.position(10, 20);
  slider.size(280);
}

function draw() {
  background(255);
	
  pixSize = slider.value();
  for (let i = 0; i < img.width; i = i + pixSize) {
    for (let k = 0; k < img.height; k = k + pixSize) {
      // Copy th color of the pixel.
      let c = img.get(i, k);

      fill(c);

      // Display rect of the image.
      rect(i, k, pixSize, pixSize);
    }
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas('canvas', 'png');
}