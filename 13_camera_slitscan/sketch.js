//Tutorial https://thecodingtrain.com/tracks/pixels/pixels/slit-scan

let video;
let x = 0;
let slitSlider;
let btn;

function setup() {
  createCanvas(800, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(320, 240);
  background(51);

  slitSlider = createSlider(1, 5, 2);
  slitSlider.position(10, 10);


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

  copy(video, w/2, 0, slit, h, x, 0, slit, h);

  x = x + slit;
  
  if (x > width) {
    x = 0;
  }


}

