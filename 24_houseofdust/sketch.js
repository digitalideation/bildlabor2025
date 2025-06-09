/*
Alison Knowles & James Tenney 
House of Dust 1966
https://zkm.de/en/artwork/house-of-dust
https://nickm.com/memslam/the_house_of_dust.html
Example house of dust using RiTa.js
*/

let grammar, font, houseofdust, json;
let fontsize = 32;


function preload() {
    /*https://rednoise.org/rita/reference/RiTa/grammar/index.html*/
    //https://observablehq.com/@dhowe/riscript
    json = loadJSON('houseofdust.json');
    font = loadFont("Courier-New.ttf")
}

function setup() {

    createCanvas(windowWidth, windowHeight);

    

    grammar = RiTa.grammar(json);

    let result = grammar.expand();
    houseofdust = result.split("%");

    
}

function draw() {

    
    background(255);
    fill(0);
    textSize(fontsize );
    textFont(font);



    for (let i = 0; i < houseofdust.length; i++) {
        text(houseofdust[i], 
            200, 
            (height / 2 - floor(houseofdust.length - 1) / 2 * fontsize * 1.2 ) + i * fontsize * 1.2 );

    }
    //console.log(houseofdust);
    noLoop();
}


function mouseReleased() {

    let result = grammar.expand();
    houseofdust = result.split("%");

    loop();
}
