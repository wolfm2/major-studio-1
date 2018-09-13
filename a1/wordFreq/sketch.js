var dictionary = [];
var dict = {};

function callback(sotu) {
  // console.log(sotu);

  sotu.forEach(function(phrases){
    // console.log(phrases);
    phrases.split(" ").forEach(function(word){
	// console.log(word);
	// get rid of all punct and spaces
	word = word.toLowerCase().replace(/[^\w+]/g, "");
	if (!(word in dict)) {  // true if key not in obj
	  dict[word] = 1;
	} else {
	  dict[word]++;
	}
 	console.log('here');
	// dictionary.push({'word': word, 'count': 1});
    });
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('pink');
  loadStrings("sotu-t-1.txt", callback);
  rectMode(CENTER);
}

curX = 0;
dragOff = 0; // drag offset

function mouseDragged() {
  dragOff += mouseX-pmouseX;
}

function draw() {
  translate(dragOff,0);
  background(255);
  for (var key in dict) {
    wid = 20
    textSize(dict[key] * 2);
    text(key, 0, height/2);
    translate(textWidth(key),0);
    
    //curX += textWidth(key);
  }
}

function mouseReleased() {

}
