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

http://davidjohnstone.net/pages/lch-lab-colour-gradient-picker
labC = [
"#f2c407",
"#e9bf3b",
"#debb56",
"#d3b66d",
"#c7b182",
"#b9ad96", 
"#a9a9a9"
];

function initVis0() {
	dnutVis("#eConn", data.nigeriaF.eConnData, data.nigeriaF.eConnName, [0,3]);
}

function initVis1() {
	dnutVis("#lightEdu", data.nigeriaF.hhFEeduMOLightData, data.nigeriaF.hhFEeduMOLightName, [0,1,3,2]);
}

function initVis2() {
	dnutVis("#cookEduMo", data.nigeriaF.hhMAeduCookData, data.nigeriaF.hhMAeduCookName, [2,0]);
}

function initVis3() {
	dnutVis("#lightDistRoad", data.nigeriaF.hhBoDistRoadData, data.nigeriaF.hhBoDistRoadName, [0,3,5,3,3,6]);
}


function initVis4() {
	dnutVis("#cookDistPop", data.nigeriaF.hhBoDistPopData, data.nigeriaF.hhBoDistPopName, [4,4,3,3,2,0]);
}

function ttip(e) {
	if (e.type == 'mouseenter') {
		$('#mytooltip').html(e.data);
		$('#mytooltip').css('left', event.pageX - 10)
			.css('top', event.pageY - 45)
			.css('opacity', '1');		
	} else {
		$('#mytooltip')
			.css('opacity', '0');		
	}
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
	
	initDiseaseData();
	
	initFullPage();
	
	// my fullpage hack to add tooltips
	slideNames = ['Gender/Electricity','Parental Education','Kerosene/Education','Road Access/Electricity','Pop. Centers/Kerosene'];
	slideNames.forEach((d,i) => {
		$('.fp-bottom a:eq(' + i + ')').on('mouseenter mouseleave', null, d, ttip);
		});
});

$(window).resize(function() {
	calcSizes();
  initVis0();
});


// TOOLTIPS					WENT FOR INLINE VALS INSTEAD
		//~ .style('cursor', 'pointer')
    //~ .on('mouseover', d => {
      //~ div
        //~ .transition()
        //~ .duration(200)
        //~ .style('opacity', 0.9);
      //~ div
        //~ .html('Total: ' + parseInt(value*100) + '%')
        //~ .style('left', d3.event.pageX + 20 + 'px')
        //~ .style('top', d3.event.pageY + 'px');
    //~ })
    //~ .on('mouseout', () => {
      //~ div
        //~ .transition()
        //~ .duration(500)
        //~ .style('opacity', 0);
    //~ });
