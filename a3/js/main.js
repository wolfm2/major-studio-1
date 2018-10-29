/* 
* QUESTIONS:
* How to scale Nigerian education metric?
* What is the definition of rural?
* */

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
	
	dnf = data.nigeriaF
	s.append("g").selectAll("path")
		.data([dnf.solarPcW, dnf.solarPcM]).enter()
		.append(mal0Wrapper); // add innermost 
		
	cTxt = s.append("g")
    .attr('class', 'dCenterTxt');
    
	cTxt.append('text')
		.style("transform", "translate("+ vis0svgW/2 +'px,'+ ((vis0svgH/2)-(vis0svgH*.06)) +"px)").append('tspan')
    .text('Avg.')
    
  cTxt.append('text')
		.style("transform", "translate("+ vis0svgW/2 +'px,'+ ((vis0svgH/2)+(vis0svgH*.06)) +"px)").append('tspan')
    .text(parseInt(((dnf.solarPcW+dnf.solarPcM)/2) * 100) + '%');
}

// Sources
// window.open().document.write(JSON.stringify(data.test));

var data = [];
// data.test = [.5, .3, .9]

$(document).ready(function(){
	initData();
	initHtml();
	calcSizes();
	initVis0();
	initFullPage();
});

$(window).resize(function() {
	calcSizes();
  initVis0();
});
