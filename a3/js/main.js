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

function initVis2() {
	dnutVis("#cookEduMo", data.nigeriaF.hhMAeduCookData, data.nigeriaF.hhMAeduCookName);
}

function initVis3() {
	dnutVis("#lightDistRoad", data.nigeriaF.hhBoDistRoadData, data.nigeriaF.hhBoDistRoadName);
}


function initVis4() {
	dnutVis("#cookDistPop", data.nigeriaF.hhBoDistPopData, data.nigeriaF.hhBoDistPopName);
}


// Sources

var data = [];

$(document).ready(function(){
	initData();
	initHtml();
	calcSizes();
	
	initVis0();
	initVis1();
	initVis2();
	initVis3();
	initVis4();
	
	initFullPage();
});

$(window).resize(function() {
	calcSizes();
  initVis0();
});
