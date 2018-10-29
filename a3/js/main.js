/* 
* QUESTIONS:
* How to scale Nigerian education metric?
* What is the definition of rural?
* */

data = {};
data.test = [.5, .3, .9]

var vis0svgW;
var vis0svgH;

function calcSizes() {
	vis0svgW = $("#main").parent().width();
	vis0svgH = $(window).height() * .85;
}

function initVis0() {
	s = d3.select("#main");
	
	s.attr("width", vis0svgW)
	  .attr("height", vis0svgH);
	
	s.selectAll('g').remove();
	
	s.append("g").selectAll("path")
		.data([data.nigeriaF.solarW, data.nigeriaF.solarM]).enter()
		.append(mal0Wrapper); // add innermost 
}

// Sources
// window.open().document.write(JSON.stringify(data.test));

$(document).ready(function(){
	initHtml();
	calcSizes();
	initVis0();
	initFullPage();
});

$(window).resize(function() {
	calcSizes();
  initVis0();
});
