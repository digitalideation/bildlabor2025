let img, img2;
let cnv;


function preload(){
  img = loadImage('assets/Nemo.jpeg');

}

function setup() {
  cnv = createCanvas(600, 600);
  image(img, 0, 0);
  noStroke();
}

function draw() {
  // posX ist die x-Koordinate, an der das Rechteck kopiert wird
  let posX = floor(random(img.width - 5));

  // wRect ist die Breite des kopierten Rechtecks
  let wRect = floor(random(1, 20));

  // x ist die x-Koordinate, an der das kopierte Rechteck platziert werden soll
  let x = floor(posX + random(-5, 5));

  // y ist die y-Koordinate, an der das kopierte Rechteck platziert werden soll
  let y = floor(random(-5, 5));

  // Kopiere das Rechteck und speichere es in img2
  img2 = cnv.get(posX, 0, wRect, img.height);

  image(img2, x, y);
}

function keyReleased() {
  if (key == "s" || key == "S") saveCanvas("canvas", "png");
}