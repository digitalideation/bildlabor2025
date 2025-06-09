let img;
let canvas;
let startX, startY, endX, endY;
let dragging=false;
let croppedImg;
let croppedImgX=0;
let croppedImgY=0;


function preload() {
  img=loadImage('assets/plakatwand.jpg');
 
}
function setup() {
  img.resize(0, windowHeight);
  canvas=createCanvas(img.width, img.height);
  canvas.parent('sketch_holder');
  image(img, 0, 0);
}

function draw() {
  //background(220);
  noFill();


  if(croppedImg!==undefined && croppedImgY<height-croppedImg.height){
    image(croppedImg, croppedImgX, croppedImgY);
    croppedImgY++;
  }

  if(dragging){
    document.getElementById('rect_holder').style.display='block';
    document.getElementById('rect_holder').style.top=startY+'px';
    document.getElementById('rect_holder').style.left=startX+'px';
    document.getElementById('rect_holder').style.width=mouseX-startX+'px';
    document.getElementById('rect_holder').style.height=mouseY-startY+'px';
  }
  else{
    document.getElementById('rect_holder').style.display='none';
  }

}


function mousePressed() {
  startX=mouseX;
  startY=mouseY;
  dragging=true;
}

function mouseReleased() {
  endX=mouseX;
  endY=mouseY;
  dragging=false;

  let w=endX-startX;
  let h=endY-startY;

  croppedImg=canvas.get(startX, startY, w, h);
  croppedImgX=startX;
  croppedImgY=startY;

 
}