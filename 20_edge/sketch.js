//https://codepen.io/taylorcoffelt/pen/eYNZvZ
//simple edge detection without weighting
//for more complex
let threshold = 30;
let scalFact = 3;
let newImg;
let steps=3;

function preload() {
  img = loadImage("IMG_7410.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  pixelDensity(1);
 // image(img, 0, 0);

  img.resize(img.width / scalFact, 0);
  newImg = createGraphics(img.width, img.height);
}
function draw() {
  detectEdge();

  noLoop();
}

function detectEdge() {
  img.loadPixels();
  newImg.loadPixels();

  for (let i = 0; i < img.pixels.length; i += 4) {
    // Color data is stored [r,g,b,a][r,g,b,a]
    let c = color(
      img.pixels[i],
      img.pixels[i + 1],
      img.pixels[i + 2],
      img.pixels[i + 3]
    );
    let b = brightness(c);

    // Get the values of the surrounding pixels
    //left, right, top,bottom
    let neighbours = new Array(
      i - 4,
      i + 4,
      i - img.width * 4,
      i + img.width * 4
    );

    compareBrightness(i, b, neighbours);
  }
}

function compareBrightness(me, b, neighbours) {
  let diff = 0;
  for (let n = 0; n < neighbours.length; n++) {
    if (neighbours[n] > 0 && neighbours[n] < img.pixels.length - 1) {
      let i = neighbours[n];
      let c = color(
        img.pixels[i],
        img.pixels[i + 1],
        img.pixels[i + 2],
        img.pixels[i + 3]
      );
      let neighbourBrightness = brightness(c);
      diff += abs(b - neighbourBrightness);

    }
  }
  if (diff > threshold) {
    

    let newR = closestStep(100, steps, diff);
   //console.log(newR)

    let newClr = color(newR, 0, 0);
    plotPoint(me, newClr);
  }
}

function plotPoint(index, c) {
  let x = (index / 4) % img.width;
  let y = (index / 4 - x) / img.width;

  noStroke();
  fill(c)
  //push();
  //translate(width / 2, 0);
  //point(x*scalFact, y*scalFact);
  rect(x * scalFact, y * scalFact, scalFact, scalFact)
  //pop();
}


// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(max, steps, value) {
  return round(steps * value / 255) * floor(255 / steps);
}