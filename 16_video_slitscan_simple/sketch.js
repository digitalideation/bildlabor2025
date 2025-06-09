let video;

let x = 0;

let loaded = false;

let btn;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  video = createVideo(
    'assets/tarkowski.mov'
  );
  video.size(480, 270);
  video.hide();
  video.loop();
  //video.showControls();
  

  btn=createButton('play video');
  btn.mousePressed(function(){
    video.loop();
    //video.play();
    loaded = true;
    //video.hide();
  })
  
}

function draw() {

  // image(video, 0, 0);
  if (loaded) {
    btn.hide();
    let w = video.width;
    let h = video.height;

    copy(video, w / 2, 0, 1, h, x, 0, 1, h);
    

    x = x + 1;

    if (x > width) {
      x = 0;
    }

  }else{
    btn.position(10, 10);
  }


}

