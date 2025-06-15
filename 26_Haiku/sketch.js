/*
Christopher Strachey, Love Letters https://en.wikipedia.org/wiki/Strachey_love_letter_algorithm
https://nickm.com/memslam/love_letters.html
Example of a love letter generator using RiTa.js

https://observablehq.com/@dhowe/riscript
*/

let grammar, font, haiku, json;



function preload() {
/*https://rednoise.org/rita/reference/RiTa/grammar/index.html*/
//https://observablehq.com/@dhowe/riscript
  json = loadJSON('personal.json');
  font=loadFont("ductus-mono/ttf/DuctusMonoCalligraphic.ttf")
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  
  textAlign(CENTER);

  grammar = RiTa.grammar(json);

  
  haiku = ["click to", "generate", "a haiku"];

  frameRate(1);
}

function draw() {

  background(0);
  fill(255);
  textSize(64);
  textFont(font);
  
  

  for (let i = 0; i < haiku.length; i++) {
    text(haiku[i], width / 2, (height/2 - floor(haiku.length - 1)/2*64)+i*64);
   // let utterance = new SpeechSynthesisUtterance(haiku[i]);
   // speechSynthesis.speak(utterance);
  }
 
}

function mouseReleased() {

  let result = grammar.expand();
  haiku= result.split("%");
 
  
}

