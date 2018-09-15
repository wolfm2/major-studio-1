var textX = 0;
var myText1, myText2;

var sentences;
var sentencesReady = false;  // cruddy semaphore lock

var input, button, prompt, numSlider, lt3Checkbox, nounsCheckbox;


function setup() {
    createCanvas(windowWidth, windowHeight);
    background('grey');
    // loadStrings('sotu-t-2.txt', callback);
    // myText1 = new Text('sotu-t-1.txt', height/3);
    // myText2 = new Text('sotu-t-2.txt', height/3*2);
    ta = new TextAnalyze('undp.txt');

  input = createInput();
  input.position(20, 65);

  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(findProx);

  prompt = createElement('h2', 'Enter proximity search terms:');
  prompt.position(20, 5);

  numSlider = createSlider(1, 8, 3);
  numSlider.position(20, 85);


      lt3Checkbox =  createInput(0,1,0);               
      lt3Checkbox.attribute("type","checkbox");     
      lt3Checkbox.position(width/2,94);
      lt3Checkbox.attribute('checked', null);  

      nounsCheckbox =  createInput(0,1,0);               
      nounsCheckbox.attribute("type","checkbox");     
      nounsCheckbox.position(width/2,100);
      nounsCheckbox.attribute('checked', null);  

  textAlign(CENTER);
  textSize(50);

}

// TODO
// add padding to top and bottom of sentences
// lower and depunct input 
// exit on no input
// exit on word not found
// multiple words in input
// B: very short number of sentences
// B: indexOf == first instance
// B: indexOf == -1


function findProx() {
  var proxDict = {};
  var name = input.value();
  var num = parseInt(numSlider.value());
  prompt.html('hello '+name+num+'!');
  // input.value('');

        if (lt3Checkbox.elt.checked) { 
        console.log('on');
        //checkbox.value("on");
        } 

        if (nounsCheckbox.elt.checked) { 
        console.log('on');
        //checkbox.value("on");
        } 

  var sentenceIdxArr = [];  // indices of occourrences
  for (var i in sentences)
    if (sentences[i].includes(" " + input.value() + " "))
      sentenceIdxArr.push(i);

  var sentenceContexts = []; // surrounding context sentences for each occourrence
  for (var i in sentenceIdxArr) {
    i = parseInt(i); // wtf?
    var begin= ((i-num) < 0)? 0 : i-num;
    var end = i+num > sentences.length-1 ? sentences.length-1 : i+num;
    // console.log(begin + " " + end);
    sentenceContexts.push(sentences.slice(begin, end).join(" "));
  }

  for (var i in sentenceContexts) {  // create dict of words to array of proximities to key word
    var splitContext = sentenceContexts[i].split(' ');
    var keyIdx = splitContext.indexOf(name);
    for (var j in splitContext) {
      j = parseInt(j); 
      if (! (splitContext[j] in proxDict))
        proxDict[splitContext[j]] = [abs(j-keyIdx)];
      else
        proxDict[splitContext[j]].push(abs(j-keyIdx));
    }  
  }
  // var sentencesWithWord = sentences.filter(containsWord);
  // var sentenceRange = 
  // create range sentence arrays for each word instance
  // chunk into word: distance dicts
  // map into relative range given highest and lowest bound
}

class TextAnalyze {

  constructor(fileName) {
    loadStrings(fileName, this.callback);
    sentences = [];
  }

  callback(text) { // you cant access this. from js callback. use global.
    var jText = text.join(' ');
    var sentenceArr = jText.match( /[^\.!\?]+[\.!\?]+|[^\.!\?]+/g );
    for (var s in sentenceArr)  // split into sentences wo nums,punct
      sentences.push(sentenceArr[s].toLowerCase().replace(/[^a-z ]/g, "") ); 
      
    sentencesReady = true;
  }
}

function proximity(words) {
}

function draw () {

}


function mw_Text(fileName, yPos) {
    console.log(fileName);
    var dictionary = [];
    loadStrings(fileName, callback);

    this.display = function() {
        push();
        // background('lightgray');
        push();
        translate(textX, yPos);
        for (var i=0; i<dictionary.length; i++) {
            textSize(dictionary[i].count);
            var txtWidth = textWidth(dictionary[i].word);
            text(dictionary[i].word, 0, 0);
            translate(txtWidth, 0);
        }
        pop();
        console.log('Horizontal Speed', mouseX-pmouseX);
        pop();
    }
    
    function callback(sotu) {
        // console.log(sotu);
        
        sotu.forEach(function(phrases) {
            // console.log(phrases);
            
            var words = phrases.split(' ');
            words.forEach(function(word){
                
                // var filteredWords = dictionary.filter(function(el) {
                //     return el.word == word;
                //     // return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
                // })
                // console.log('Filtered Words', filteredWords);
                // // dictionary.push({'word': word, 'count': 1});
                
                // The filter() method creates a new array with all elements that pass the test implemented by the provided function.
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
                var filteredWords = dictionary.filter(function(element) {
                  return element.word == word;
                });
          
                if (filteredWords.length)
                  filteredWords[0].count++;
                else
                  dictionary.push({word: word, count: 1});
                
            });
            
        });
        
        console.log(dictionary);
        // myText1.display();
        // myText2.display();
        
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        dictionary.sort(function(a, b) {
            return  b.count - a.count;
        }); 
    }
}

function mw_mouseDragged() {
    background('lightgray');
    myText1.display();
    // translate(0, 50);
    myText2.display();
    textX += mouseX-pmouseX;
}
  
  
