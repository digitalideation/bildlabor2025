//https://rednoise.org/rita/examples/p5/ReplaceableWriting/index.html#source


let font;
let txt = "I sit in the arm and grab myself. My spots lie on the veins in front of me, I look down at them. They caress me, familiar and yet strange. I stare at them, my spots with the other skin. That works well. I turn a small blue that grips. I smooth out all the strands too, my little friend shines. I press my warmth with those of my bones that decorate beside me. Strange. Similar and yet different. It breathes boredom. What if my drawing could age?";

function preload() {
   
    font = loadFont("Courier-New.ttf")
}
function setup() {

  createCanvas(windowWidth, windowHeight)
  noStroke();
  textSize(22 );
  textFont(font);
  nextWord();
}

// replace one random word in the text
async function nextWord() {

  let words = RiTa.tokenize(txt); // split into words

  // loop from a random spot
  let r = floor(random(0, words.length));
  for (let i = r; i < words.length + r; i++) {

    let idx = i % words.length;
    let word = words[idx].toLowerCase();
    if (word.length < 3) continue; // len >= 3

    // find related words
    let pos = RiTa.tagger.allTags(word)[0];
    let rhymes = await RiTa.rhymes(word, { pos });
    let sounds = await RiTa.soundsLike(word, { pos });
    let spells = await RiTa.spellsLike(word, { pos });
    let similars = [...rhymes, ...sounds, ...spells];

    // only words with 2 or more similars
    if (similars.length < 2) {
      console.log("No sims for "+word);
      continue;
    }

    // pick a random similar
    let next = RiTa.random(similars);

    if (next.includes(word) || word.includes(next)) {
      continue;                     // skip substrings
    }
    
    if (/[A-Z]/.test(words[idx][0])) {
      next = RiTa.capitalize(next); // keep capitals
    }

    console.log("replace(" + idx + "): " + word + " -> " + next);

    words[idx] = next;             // do replacement
    break;
  }

  // recombine into string and display
  txt = RiTa.untokenize(words); 
  background(255);
  fill(0);
  text(txt, 50, 30, 500, height);

  setTimeout(nextWord, 2000);
}

    

