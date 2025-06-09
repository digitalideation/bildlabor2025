
/* 
bildlabor 2025 HSLU, Hanna Zuellig
Example Custom Audio Class for p5.js
Custom class creates a button to start the microphone
Custom class is to be embedded in index.html and put into library folder
*/

/**
 * Die Variable Mikrofon bindet eine Instanz der Klasse Mic
 * Die Variable micLevel nimmt die aktuelle Lautstärke zurück, von 0 bis 255
 */
let micInstance;
let micLevel = 0;


let btn;
let img;
let posX = 0;

function preload() {
  img = loadImage('assets/Nemo.jpeg');
}

function setup() {
  createCanvas(img.width, img.height);
  /** Im setup einmalig Zugriff auf das Mikrofon
   */
  micInstance = new Mic("Start Mic"); //Parameter übergibt Beschriftung des Buttons




  image(img, 0, 0, width, height);
}

function draw() {

  /**
    * User muss mit der Seite interagieren, um Zugriff auf das Mikrofon zu erhalten
    */
  if (micInstance && micInstance.started) {
    /**
    * In jedem Frame wird die aktuelle Lautstärke erfragt 
    * Werte die zurückkommen, gehen von 0 bis 255
    * allenfalls umwandeln
    */
    getMicLevel();

    let h = map(micLevel, 0, 255, -10, 10);
 
    //copy function parameters: source image, source x, source y, source width, source height, target x, target y, target width, target height
    copy(posX, 0, 2, height, posX + random(-h, h), random(-h, h), 2, height);


    posX += 2;
    if (posX > width) {
      posX = 0;
    }
  }


}


// ✅ Async function outside draw() to call listenMic
async function getMicLevel() {
  micLevel = await micInstance.listenMic();
}
