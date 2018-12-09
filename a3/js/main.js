/* 
* QUESTIONS:
* How to scale Nigerian education metric?
* What is the definition of rural?
* */

function initFullPage() {
	//initialising fullpage.js in the jQuery way
	$('#fullpage').fullpage({
			sectionsColor: '#333333', // ['#ff5f45', '#0798ec', '#fc6c7c', '#fec401'],
			navigation: true,
			slidesNavigation: true,
			licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
			controlArrows: false,
			navigationTooltips: ['Title', 'Disease', 'Country', 'Cooking<br>Rurality', 'Cooking<br>Road 10k', 'Cooking<br>Road 20k', 'Lighting<br>Road 10k', 'Lighting<br>Road 20k', 'Final','Sources'],
	});

	// calling fullpage.js methods using jQuery
	$('#moveSectionUp').click(function(e){
			e.preventDefault();
			$.fn.fullpage.moveSectionUp();
	});

	$('#moveSectionDown').click(function(e){
			e.preventDefault();
			$.fn.fullpage.moveSectionDown();
	});
}

var vis0svgW;
var vis0svgH;
//~ var vis0tip;

function calcSizes() {
	var visibleSvg;
	$('.vis').each((i, e) => {
		if ($(e).is(":visible"))
		  visibleSvg = e;
		});
	vis0svgW = $(visibleSvg).parent().width();
	vis0svgH = $(window).height() * .85;
}

// http://davidjohnstone.net/pages/lch-lab-colour-gradient-picker
labC = [
"#f2c407",
"#e9bf3b",
"#debb56",
"#d3b66d",
"#c7b182",
"#b9ad96", 
"#a9a9a9"
];

// Sources

var data = [];
var staticData = {};  // text n stuff

function initVis() {
	calcSizes();
	
	staticData.dnutData.forEach((d) => {
		dnutVis(d[0], d[1], d[2], d[3]);
		});
	initDiseaseData();
}

var smallWidth;

function reflow() {
	if (window.innerWidth > 768) {
		$(".text-left").show()
		$(".vis").show()
		$("#fp-nav").show()
		$(".tap").hide()
		smallWidth = false;
	} else {
		$(".text-left").show()
		$(".vis").hide()
		$("#fp-nav").hide()
		$(".tap").show()
		smallWidth = true;
	}
	initVis();
}

// toggle sides of visualizations
function toggleSides () {
	if (smallWidth) {
		$(".text-left").toggle();
		$(".vis").toggle();
		initVis();
	}
}

$(document).ready(function(){
	
	initData();
	initHtml();
	
	// set-up icons
	//~ [["country","gender"],
	//~ ["popc","cooking"],
	//~ ["road","cooking"],
	//~ ["road","cooking"],
	//~ ["road","lighting"],
	//~ ["road","lighting"]].forEach((d,i) => {
		//~ function mkTemplate (d) {
			//~ var titles = {
				//~ 'popc':"Distance from Nearest Population Center (>20k ppl.)",
				//~ 'road':"Distance from Nearest Road",
				//~ 'cooking':"Electric Cooking",
				//~ 'lighting':"Electric Lighting",
				//~ 'country':"Country Wide",
				//~ 'gender':"Access by Gender"
				//~ };
				
			//~ template = '<img class="dnut-icons" src="img/{0}.svg" title="{1}">';
			//~ return template.format(d,titles[d]);
		//~ }
		
		//~ html = mkTemplate(d[0]);
		//~ html += mkTemplate(d[1]);
		//~ $(".dnut").eq(i).prepend(html+"<br>");
		//~ });
		
	initVis();
	
	initFullPage();
	
	// link words on front page
	$("#section2 b").css('cursor', 'pointer');
	$("#section2 b").eq(0).click(() => {$.fn.fullpage.moveTo(2)});
	$("#section2 b").eq(1).click(() => {$.fn.fullpage.moveTo(3)});
	
	// $(window).resize(initVis);
	
	// hack to resize graph and dnut correctly
	// $('.nav-tabs').on('click', () => {setTimeout(initVis, 200)});
	
	// my fullpage hack to add tooltips
	//~ slideNames = ['Gender/Electricity','Parental Education','Kerosene/Education','Road Access/Electricity','Pop. Centers/Kerosene'];
	//~ slideNames.forEach((d,i) => {
		//~ $('.fp-bottom a:eq(' + i + ')').on('mouseenter mouseleave', null, d, ttip);
		//~ });
		
	// window.addEventListener('resize', scaleSVG);
	reflow();
	//$(".section").taphold(toggleSides);
	$(".tap").click(toggleSides);
	window.addEventListener('resize', reflow);
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
