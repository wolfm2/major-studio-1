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

function draw() {
  // push translate, rotate, pop
  //push();
  //translate(100,100);
  //rotate(radians(mouseX));
  //rect(0,0,100,100);
  //pop();

  //push();
  //translate(250,100);
  //rotate(radians(mouseY));
  //rect(0,0,100,100);
  //pop();

}

function mouseReleased() {

}
