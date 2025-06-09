let img;
let canvas;
let startX, startY, endX, endY;
let dragging=false;
let croppedImg;



function preload() {
  img=loadImage('assets/IMG_9367.jpeg');
 
}
function setup() {
  img.resize(0, windowHeight);
  canvas=createCanvas(img.width, img.height);
	canvas.parent('sketch_holder');
  image(img, 0, 0);
}

function draw() {
 

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

	//bei release der maus wird der markierte aussschnitt kopiert
  croppedImg=img.get(startX, startY, w, h);

	manipulatePixels();
 
}

function manipulatePixels(){
	 // for each column of pixels
    for (let x = 0; x < croppedImg.width; x++) {
      // for each row of pixels
      for (let y = 0; y < croppedImg.height; y++) {
				// Get the color of the pixel at coordinates (i,k)
     	 let c = croppedImg.get(x, y);
      
      	// Extract the red, green, and blue components from the color
      	let r = red(c);
      	let g = green(c);
      	let b = blue(c);

				//invert colors 
				let newColor=color(255-r,255-g,255-b);
				
				croppedImg.set(x, y, newColor);
			}
			
		}
	
	// Update the img!!
  croppedImg.updatePixels();
	
	//display the img
 image(croppedImg, startX, startY);
}