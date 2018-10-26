
// TODO
// fill out functions

var PI = Math.PI;

var width = window.innerWidth,
    height = window.innerHeight;


function cascadeChildren (sec, parent, animation) {
}

var arcMax = 0.75; // percent of circle considered max
var arcGroupInnerWidth = 10;
// mArkL0 wrapper
function mal0Wrapper(d,i) {
	path = mArkL0(width/2, height/2, 100+(i*arcGroupInnerWidth), 8, '#0000FF', d*180);
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

// returns:
// HHH Gender, HH ID, strom connected, strom src, solar panel, max edu father, max edu mother, dist to major road, 
// dist to popcenter, dist to market, floor, root
function search0 (d) {
}

// returns
// mEdu, fEdu, fHead, isRural, stromMetric
function search1 (d) {
}

