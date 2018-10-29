
// TODO
// fill out functions
// enclose panels in div overflow hidden
// recalc vis height for @media

// X create structure 
// X create title
// X create colors
// X create menu
// create first real pass re solar w text
// redo text, make center, make labels
// fonts

//INTRO
var vid1;

// preloads next vid
$('#myVideo').on('play', () => {
	$.ajax( "img/LightBulb1.mp4", function( data ) {
		vid1= URL.createObjectURL(data);
		});
	});

// won't play seamlessly - fix
$('#myVideo').on('ended', () => {
  $('#myVideo source').attr('src', 'img/LightBulb1.mp4');
  //$('#myVideo source').attr('src', vid1);
	$('#myVideo').attr("loop", true);
	$("#myVideo")[0].load();
	$("#myVideo")[0].play();
	$('#myVideo').off('ended');
	});

// VIS0
var PI = Math.PI;

function cascadeChildren (sec, parent, animation) {
}

var arcMax = 0.75; // percent of circle considered max

var arcGLineBuf;
var arcMinRadius;

function calcSizeVis0() {
	constraint = vis0svgW<vis0svgH?vis0svgW:vis0svgH; // get the smaller one
	
	arcMinRadius = constraint*.30;
	arcGLineBuf = arcMinRadius*.1;
}

// mArkL0 wrapper
function mal0Wrapper(d,i) {
	calcSizeVis0();
	path = mArkL0(vis0svgW/2, vis0svgH/2, arcMinRadius+(i*arcGLineBuf), arcGLineBuf*.8, '#718c9e', d*360);
	return path;
}

// make arc
// width: line width
// value: 0-1
function mArkL0(cx, cy, r, width, color, value) { 
	var e = document.createElementNS('http://www.w3.org/2000/svg', "path");

	d3.select(e)
		.attr("transform", "translate("+ cx +','+ cy +")")
		.attr("fill", color)
		.attr("d", d3.arc()
				.innerRadius(r)
				.outerRadius(r+width)
				.cornerRadius(5)
				.startAngle(0 * (PI/180))
				.endAngle(value * (PI/180))
				);
	return e;
}

function mArkL1 () { // make concentric arc group
}

function mArkL2 () { // make arc group group (several sets of arcs)
}


