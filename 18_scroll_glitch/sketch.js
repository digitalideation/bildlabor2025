//example shows how to use scrollposition within p5.js 
// the more the user scrolls the more the image is glitched


// Glitch Library from teddavis.org
// p5.glitch-image
// cc teddavis.org 2020
// https://p5.glitch.me/#examples


let glitch;
let oldpercentScrolled=0;//variable to store the old value of percentScrolled



function setup() {
  createCanvas(windowWidth, windowHeight);
  glitch = new Glitch();
	loadImage('assets/David.jpg', function(im){
		glitch.loadImage(im);
	});
}

function draw() {
 
  //detect the amount of scrolling since the last frame
  //if the user did not interact the image stays the same
  // if the scrollpercent  since last frame is higher than 5% the image is re-glitched
  // this should prevent the image from glitching too often and take too much performance
  if(percentScrolled > 5 && abs(percentScrolled - oldpercentScrolled)>5){
    glitch.resetBytes();
    glitch.randomBytes(percentScrolled); 
    oldpercentScrolled=percentScrolled;
  }

  glitch.buildImage();
	image(glitch.image, 0, 0);


 
}


/*----pures JavaScript------*/

console.log("ganze hoehe" + document.documentElement.scrollHeight);
console.log("viewport hoehe" + document.documentElement.clientHeight);

//calculate what 1% of scrolling is in pixels
let onePercentPixel=(document.documentElement.scrollHeight - document.documentElement.clientHeight) /100;
let percentScrolled=0;//0-100

document.addEventListener("scroll", (event) => {

  //calculate how much the user has scrolled in percent
  percentScrolled = Math.round(window.scrollY / onePercentPixel);

  
});