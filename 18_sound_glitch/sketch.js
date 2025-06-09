// Hanna Züllig, 2024, Sound Glitch
// The idea rises from my experience in commuting and the almost physical pain 
// I feel when I hear loud noises in the train while beeing exhausted.
// The amount of glitching depends on the sound level. The sound level is measured by the microphone of the computer

// Glitch Library from teddavis.org
// p5.glitch-image
// cc teddavis.org 2020
// https://p5.glitch.me/#examples

let glitch;

let Mikrofon ;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	imageMode(CENTER);

	glitch = new Glitch();
	loadImage('assets/hanna.jpg', function(im){
		glitch.loadImage(im);
	});

	// create an audio input, works on Chrome only
	Mikrofon  = new Mic('Start Mic'); //Parameter übergibt Beschriftung des Buttons
	
}

function draw() {
	glitch.resetBytes();

	 /**
     * User muss mit der Seite interagieren, um Zugriff auf das Mikrofon zu erhalten
     */
	 if (Mikrofon.started) {
        /**
         * In jedem Frame wird die aktuelle Lautstärke erfragt 
         * Werte die zurückkommen, gehen von 0 bis 255
         * 
         */
        micLevel = Mikrofon.listenMic();
		console.log(micLevel);
		if(micLevel > 5){
			glitch.randomBytes(micLevel); 
		}

		
	 }
	

	glitch.buildImage();
	image(glitch.image, width/2, height/2)
}