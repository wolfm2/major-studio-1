// Globals
var padLvl = 370;	// line where paddle starts
var padWidth = 90;	// width of paddle
var padHeight = 22;	// height of paddle
var score = 0;		// obvious
var balls = [];		// array of ball instances
var padStroke;
var padFill;

function getCompliment(c) {
  var midhue = 360/2;
  var h = hue(c);
  if (h <= midhue)
    return (color(h + midhue,100,100));
  else
    return (color(h -= midhue,100,100));
}

//var b = {
class ball {  // Definition of ball state and methods

  constructor () {
    this.init ();
  }

  init () {
    this.xdelta = 1.7;  // change in x per frame 
    this.ydelta = 1.2;  // change in y per frame
    this.xcur = random(width);
    this.ycur = random(width);
    this.fill = color(random(360),100,100);
    this.stroke = getCompliment(this.fill); 
  }

  draw (padx) {
    // draw and move
    fill(this.fill);
    stroke(this.stroke);
    ellipse(this.xcur,this.ycur, 20, 20);
    this.xcur += this.xdelta;
    this.ycur += this.ydelta;

    // Wall bounce
    if (this.xcur < 0 || this.xcur > width) this.xdelta *= -1;
    if (this.ycur < 0) this.ydelta *= -1;

    // Beyond canvas bottom
    if (this.ycur > width) {
      this.init();
    }

    // Paddle bounce
    if (this.ycur > padLvl && this.ycur < padLvl + padHeight/2 && 
	this.xcur >= padx && this.xcur <= padx + padWidth) {
      this.ydelta *= -1;
      this.ydelta *= 1.2;
      this.xdelta *= 1.2;
      score++;
      // push color to pad
      padFill = this.fill;
      padStroke = this.stroke;
    }
  }
  
};

function mouseReleased() {
	padLvl = 370;	// line where paddle starts
	padWidth = 90;	// width of paddle
	padHeight = 22;		// height of paddle
	score = 0;		// obvious
	balls = [];		// array of ball instances
	setup();
}

var maxBalls = 10;

function setup() {
  createCanvas(400, 400);
  background(127);
  strokeWeight(4);

  colorMode(HSB);
  noCursor();

  padFill = color(random(360),100,100);
  padStroke = getCompliment(padFill);

  for (i=0; i<maxBalls; i++) {
    // balls.push(Object.assign({}, b));
    balls.push (new ball());
    balls[i].init();
  }
}

rect_curve = 5

function draw() {
  background(255);

  // balls[0].draw(mouseX);
  // Draw each ball and calculate consequences
  for (i=0; i<maxBalls; i++)
    balls[i].draw(mouseX);

  fill(padFill);
  stroke(padStroke);
  rect(mouseX, padLvl, padWidth, padHeight, 0, 0, rect_curve, rect_curve);  // paddle

  // Score
  textAlign(CENTER);
  textSize(30);
  // fill(255);
  text(score, mouseX + (padWidth / 2), padLvl + padHeight);
}
