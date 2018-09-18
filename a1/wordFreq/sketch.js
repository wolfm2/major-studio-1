var help = `
<h3>Search for words in proximity to a search term.</h3>

When text is found in the corpus the tool assembles a context 
<br>
of sentences before and after where the term was found.<br>
<br>
Within this context you can search/sort by:<br>
<ul>
  <li> How close (in # words) a result is from your search term </li>
  <li> The percent of time it appears near your search term </li>
</ul>
You can set a minimimum percentage that the result must appear<br>
in your results to be shown.<br>
<br>
And lastly, you can optionally delete short words (usually stopwords)<br>
and hightlight any results that are nouns.
<h4>Example:</h4>
In the default search, for each sentence in which the word "Germany" <br>
is found, two sentences before and after it are assembled into a context.<br>
<br>
Within this context, we rate each result on its average proximity to<br>
"Germany", and show the percent of contexts in which it appeared.<br>
<br>
For all results if they appeared less than 10% of the time, we ignore<br>
the result.<br>
<br>
We also, delete all short words and do not highlight nouns.<br>
`

var transX = 0;
var transY = 0;
var maxFontSz = 70;

var sentences;
var sentencesReady = false;
// cruddy semaphore lock

var term, contextRange, byProx, lt3, nouns, minFreq;
// UI controls

var showHelp = false;

function toggleHelp () {
	document.getElementById('helpTxt').innerHTML = help;
	
	if (showHelp)
	  document.getElementById('help').style.display = 'none';
	else
	  document.getElementById('help').style.display = 'block';
	
	showHelp = !showHelp;
}

var myFont;
function preload() {
  myFont = loadFont('montserrat.ttf');
}

function setup() {
    var canvas = createCanvas(windowWidth - 16, windowHeight - document.getElementById('main').offsetHeight - 60);
    //createCanvas(800, windowHeight);
    canvas.parent('sketch-holder');
    
    background('#dddddd');
    ta = new TextAnalyze('undp.txt');

	//textFont('Arial');
	textFont(myFont);
    textSize(50);
    // search();
}

// TODO
// X exit on word not found
// X multiple words in input
// color nouns
// B: very short number of sentences
// B: indexOf == first instance

function getSum(total, num) {
    return total + num;
}
var totTransY = 0;
var resultBoxes = [];

function findProx() {
    var proxDict = {};
    
    totTransY = 0;
    resultBoxes = [];

    background('#dddddd');
    push();
    translate (transX, transY);

    var sentenceIdxArr = [];
    // indices of occourrences
    // for (var i in sentences) {
	for (var i = 0; i < sentences.length; i++) { // rita screws w for-in index var
        if (sentences[i].includes(" " + term + " "))
            sentenceIdxArr.push(i);
	}
	
    var sentenceContexts = [];
    // surrounding context sentences for each occourrence
    for (var i in sentenceIdxArr) {
        i = parseInt(i);
        // wtf?
        var begin = ((i - contextRange) < 0) ? 0 : i - contextRange;
        var end = i + contextRange > sentences.length - 1 ? sentences.length - 1 : i + contextRange;
        // console.log(begin + " " + end);
        sentenceContexts.push(sentences.slice(begin, end).join(" "));
    }

    // for (var i in sentenceContexts) {
    for (var i = 0; i < sentenceContexts.length; i++) { // rita screws w for-in index var
        // create dict of words to array of proximities to key word
        var splitContext = sentenceContexts[i].split(' ');
        var keyIdx = splitContext.indexOf(name);
        //for (var j in splitContext) {
        for (var j = 0; j < splitContext.length; j++) { // rita screws w for-in index var
            j = parseInt(j);
            if ((lt3 && splitContext[j].length < 4) || splitContext[j].length < 1)
                // rid of < 4 char words
                continue;
            if (!(splitContext[j]in proxDict))
                proxDict[splitContext[j]] = [abs(j - keyIdx)];
            else
                proxDict[splitContext[j]].push(abs(j - keyIdx));
        }
    }

    // Create items array
    dictLen = Object.keys(proxDict).length;
    var items = Object.keys(proxDict).map(function(key) {
        var avg = parseInt(proxDict[key].reduce(getSum) / proxDict[key].length);
        var percent = parseInt((proxDict[key].length / dictLen) * 100);
        return [key, percent, avg];
    });

    // Order by UI choice
    items.sort(function(first, second) {
        if (byProx)
            return first[2] - second[2];
        else
            return second[1] - first[1];
    });

	// honor minFreq
	items = items.filter(i => i[1] >= minFreq);
	
    var maxNum = 0;  // Get largest number to map font scale
    for (var i in items)
        if (byProx?items[i][2]:items[i][1] > maxNum)
            maxNum = byProx?items[i][2]:items[i][1];

    // RESULTS
    textSize(maxFontSz / 4);
    if (byProx)
        label = "Avg word distance from term / Frequency in context sentences";
    else
        label = "Frequency in context sentences";
    // textAlign(LEFT);
    textAlign(CENTER);
    if (! items.length) {
		text("\n\n Search term not found.", 0, maxFontSz / 4);
		return;
	}
    // text("\n\n Results (" + label + "):", 0, maxFontSz / 4);
    text("(" + label + ")", width/2, maxFontSz / 3);
    // translate(0, maxFontSz/2);
    totTransY += maxFontSz/2;
    textAlign(CENTER);

    // for (var i in items) {
    for (var i = 0; i < items.length; i++) { // rita screws w for-in index var
        if (byProx)
            var height = map(items[i][2], maxNum, 0, 15, maxFontSz);
        else
            var height = map(items[i][1], 0, maxNum, 15, maxFontSz);

        textSize(height);
        
        if (byProx)
            var val = " (" + items[i][2] + "/" + items[i][1] + "%)";
        else
            var val = " (" + items[i][1] + "%)";
        
        if (nouns && RiTa.getPosTags(items[i][0], true)[0] == "n") {
			push();
			fill('#B91034');
			text(items[i][0] + val, width / 2, 100);
			//resultBoxes.push();
			pop();
		} else {   
			push();
			fill('#4E3E3C');
			text(items[i][0] + val, width / 2, 100);
			pop();
		}
        translate(0, height);
        totTransY += height;
    }
    
    pop();
}

class TextAnalyze {

    constructor(fileName) {
        loadStrings(fileName, this.callback);
        sentences = [];
    }

    callback(text) {
        // you cant access this. from js callback. use global.
        var jText = text.join(' ');
        var sentenceArr = jText.match(/[^\.!\?]+[\.!\?]+|[^\.!\?]+/g);
        // for (var s in sentenceArr) {
        for (var s=0; s < sentenceArr.length; s++) { // rita screws w for-in index var
            // split into sentences wo nums,punct
            sentences.push(sentenceArr[s].toLowerCase().replace(/[^a-z ]/g, ""));
		}
        sentencesReady = true;
    }
}

function search(autoTerm) {
	if (autoTerm != undefined){
		term = autoTerm.toLowerCase().replace(/[^a-z ]/g, "");
		document.getElementById('term').value = autoTerm;
    } else
		term = document.getElementById('term').value.toLowerCase().replace(/[^a-z ]/g, "");
    contextRange = parseInt(document.getElementById('context').value);
    byProx = document.getElementById('byProx').checked;
    lt3 = document.getElementById('lt3').checked;
    nouns = document.getElementById('nouns').checked;
    minFreq = parseInt(document.getElementById('minFreq').value);

    if (term.replace(/ /g, "").length < 1) {
        //alert("Make sure to type in a search term.")
        return;
    }

    //~ while (checkSentencesReady())
        //~ ; // wait for load
        
    transY = 0;
    findProx();
    // alert(term + contextRange + byProx + lt3 + nouns) 
}


function mouseWheel(event) {
  print(event.delta);
  //move the square according to the vertical scroll amount
  transY -= event.delta;
  if (transY < 0 - totTransY) transY = 0 - totTransY;
  
  if (transY > height - 100) transY = height - 100;
  
  findProx();
  //uncomment to block page scrolling
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth - 16, windowHeight - document.getElementById('main').offsetHeight - 60);
  search();
}

function mouseClicked() {
}

function mw_mouseDragged() {
    // transX += mouseX - pmouseX;
    if (mouseY > 0 && mouseY < height)
      transY += mouseY - pmouseY;
    //~ if (mouseY > height - 30)
      //~ transY -= 10;
      
    //~ if (mouseY < 30)
      //~ transY += 10;
    findProx();
}
