/* 
* QUESTIONS:
* How to scale Nigerian education metric?
* What is the definition of rural?
* */

var vis0svgW;
var vis0svgH;
var vis0tip;

function calcSizes() {
	vis0svgW = $("#eConn").parent().width();
	vis0svgH = $(window).height() * .85;
}

function initVis0() {
	dnutVis("#eConn", data.nigeriaF.eConnData, data.nigeriaF.eConnName);
}

function initVis1() {
	dnutVis("#lightEdu", data.nigeriaF.hhFEeduMOLightData, data.nigeriaF.hhFEeduMOLightName);
}

// Sources

var data = [];

$(document).ready(function(){
	initData();
	initHtml();
	calcSizes();
	initVis0();
	initVis1();
	initFullPage();
});

$(window).resize(function() {
	calcSizes();
  initVis0();
});
