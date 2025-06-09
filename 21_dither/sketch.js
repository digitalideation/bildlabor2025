/* 
Hanna Zuellig, HUB HSLU, 2024
Example of dithering an image using error diffusion
After Daniel Shiffman Processing Example https://www.youtube.com/watch?v=0L2n8Tg2FwI
*/

let original;
let newImage;

//Create a GUI
let params = {
  scaleFactor: 2,
  steps: 1, //number of steps for the color reduction
  triggerAction: exportPNG
};



let n = 4;

//Error Verteilung, randomError[0] Floyd-Steinberg
let randomError = {
  0: [7, 3, 5, 1],//classic Floyd-Steinberg
  1: [0, 0, 0, 16],//some other error distributions
  2: [12, 2, 2, 0],
  3: [4, 4, 4, 4],
  4: [16, 0, 0, 0],
  5: [8, 0, 0, 8]
}

let rnd = 0;//random Error Schlüssel

function preload() {
  original = loadImage("hanna-v3.jpg");
}

function setup() {
  createCanvas(original.width * params.scaleFactor, original.height * params.scaleFactor);
  // Set pixel density to 1 so the resulting image is the same size as the original
  pixelDensity(1);
  // select a random error distribution
  rnd = int(random(0, Object.keys(randomError).length));

  // if you want to use a specific error distribution, set rnd to the desired key
  // rnd = 0; // Floyd-Steinberg

  //make the original image smaller to improve performance
  original.resize(round(original.width / params.scaleFactor), round(original.height / params.scaleFactor));



  // Setup GUI
  const gui = new dat.GUI();
  gui.add(params, 'triggerAction').name("Export Image"); // ✅ This creates a button

  init();
}

function init() {
  background(255);

  // Create a new image with the same size as the original, but scaled by the scale factor
  newImage = createGraphics(original.width * params.scaleFactor, original.height * params.scaleFactor);
  newImage.background(255);
  newImage.noStroke();
  newImage.pixelDensity(1);

  // Apply the dithering effect, the second parameter is the number of steps regarding the color
  // The higher the number, the more colors will be used
  // 1 is actually two steps, either 0 or 255, this means full color or zero
  makeDithered(original, params.steps);

  image(newImage, 0, 0, newImage.width, newImage.height);

}

function imageIndex(img, x, y) {
  return 4 * (x + y * img.width);
}

function xyFromIndex(img, idx) {
  let x = idx / 4 % img.width;
  let y = (idx / 4 - x) / img.width;
  return { x: x, y: y };
}

//function does the same as get(x,y) but is faster
function getColorAtindex(img, x, y) {
  let idx = imageIndex(img, x, y);
  let pix = img.pixels;
  let red = pix[idx];
  let green = pix[idx + 1];
  let blue = pix[idx + 2];
  let alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

//function does the same as set(x,y,clr) but is faster
function setColorAtIndex(img, x, y, clr) {
  let idx = imageIndex(img, x, y);

  let pix = img.pixels;

  pix[idx] = red(clr);
  pix[idx + 1] = green(clr);
  pix[idx + 2] = blue(clr);
  pix[idx + 3] = alpha(clr);
}



// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(max, steps, value) {
  return round(steps * value / 255) * floor(255 / steps);
}

function makeDithered(img, steps) {
  img.loadPixels();


  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      //faster than get()
      let clr = getColorAtindex(img, x, y);
      //let clr = img.get(x, y);
      let oldR = red(clr);
      let oldG = green(clr);
      let oldB = blue(clr);

      let brightness = (0.299 * oldR + 0.587 * oldG + 0.114 * oldB);
      let newBrightness = closestStep(255, steps, brightness);
      let newR = closestStep(255, steps, oldR);
      let newG = closestStep(255, steps, oldG);
      let newB = closestStep(255, steps, oldB);

      let newClr = color(newR, newG, newB);


      drawDot(x, y, newClr)



      //difference between old and new color
      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;

      distributeError(img, x, y, errR, errG, errB);
    }
  }

  img.updatePixels();

  //newImage.updatePixels();
}

// Floyd-Steinberg error diffusion
// https://en.wikipedia.org/wiki/Floyd%E2%80%93Steinberg_dithering

function distributeError(img, x, y, errR, errG, errB) {
  let pos = { x: x, y: y };

  //Pixel at x+1, y (right)
  addError(img, randomError[rnd][0] / 16.0, pos.x + 1, pos.y, errR, errG, errB);
  //Pixel at x-1, y+1 (left down)
  addError(img, randomError[rnd][1] / 16.0, pos.x - 1, pos.y + 1, errR, errG, errB);
  //Pixel at x, y+1 (down)
  addError(img, randomError[rnd][2] / 16.0, pos.x, pos.y + 1, errR, errG, errB);
  //Pixel at x+1, y+1 (right down)
  addError(img, randomError[rnd][3] / 16.0, pos.x + 1, pos.y + 1, errR, errG, errB);



}

function addError(img, factor, x, y, errR, errG, errB) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
  let clr = getColorAtindex(img, x, y);
  let r = red(clr);
  let g = green(clr);
  let b = blue(clr);
  clr.setRed(r + errR * factor);
  clr.setGreen(g + errG * factor);
  clr.setBlue(b + errB * factor);

  setColorAtIndex(img, x, y, clr);
}

function drawDot(x, y, c) {
  newImage.fill(c);

  let brightness = (0.299 * red(c) + 0.587 * green(c) + 0.114 * blue(c));

  let pos = { x: x, y: y };



  if (brightness < 200) {
    let d = map(brightness, 0, 255, params.scaleFactor, 0);//the darker the color, the bigger the dot, white is to zero
    newImage.rect(pos.x * params.scaleFactor, pos.y * params.scaleFactor, d, d);

  }
}



function exportPNG() {
  let d = new Date();
  /* ~~~~~~~~~~~~ export PNG */
  save(d + ".png")
  noLoop();
}