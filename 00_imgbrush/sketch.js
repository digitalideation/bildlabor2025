//1. Variable erstellen (wir kommen darauf zurück)
let brush;

//2. Die Funktion preload wird vor dem setup aufgerufen.
// So wird sicher gestellt, dass Ressourcen geladen sind, wenn man sie braucht
function preload(){
//3. Die Funktion loadImage lädt ein Bild. Der Verweis auf das Bild ist in der Variable 'brush'
  brush=loadImage("assets/brush.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
//4. Mit der Funktion 'image' wird ein Bild auf den Sketch platziert
  image(brush, mouseX, mouseY);
  
  //gespiegelt x-achse
  image(brush, width-mouseX, mouseY);

  //gespiegelt y-achse
  image(brush, mouseX, height-mouseY );

  //gespiegelt diagonal
  image(brush, width-mouseX, height-mouseY);
  
}
