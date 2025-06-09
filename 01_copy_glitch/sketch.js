let img;

function preload() {
  img = loadImage('assets/plakatwand.jpg');
}

function setup() {
  createCanvas(1024, 780);
  image(img, 0, 0);
}

function draw() {
  let x1 = floor(random(width));
  let y1 = floor(random(height));
  

  let x2 = round(x1 + random(-7, 7));
  let y2 = round(y1 + random(-5, 5));

  let w = floor(random(10, 40));
  

  copy(img, x1, 0, w, height, x2,y2, w, height )
  
}