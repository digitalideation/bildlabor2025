//Tutorial https://thecodingtrain.com/tracks/pixels/pixels/slit-scan

let video;
let x = 0;
let slitSlider;
let btn;

let scale = 2; //scale the copied part to make it larger

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(320, 240);
  background(51);

  slitSlider = createSlider(1, 5, 2);
  slitSlider.position(10, 10);
  text('Slit Width', 10, 30);

  btn = createButton('save');
  btn.position(10, 40);
  btn.mousePressed(() => {
    saveCanvas('slit-scan', 'png');
  });
}

function draw() {
  video.loadPixels();
  // image(video, 0, 0);

  let w = video.width;
  let h = video.height;

  let slit = slitSlider.value();

  copy(video, w/2, 0, slit, h, x*scale, 0, slit*scale, h*scale);

  x = x + slit;
  
  if (x > width) {
    x = 0;
  }


}

