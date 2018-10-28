
// TODO
// fill out functions
// enclose panels in div overflow hidden
// recalc vis height for small screen

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
	path = mArkL0(vis0svgW/2, vis0svgH/2, arcMinRadius+(i*arcGLineBuf), arcGLineBuf*.8, '#0000FF', d*180);
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
				)
	return e;
}

function mArkL1 () { // make concentric arc group
}

function mArkL2 () { // make arc group group (several sets of arcs)
}


