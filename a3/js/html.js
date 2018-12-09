// HTML element init

// ring elements - desktop style
//~ template0 = `
	//~ <div class="tab-pane fade in {3}" id="p{0}">
    //~ <div class="col-sm-6"><svg class="vis vis-dnut" id="{1}"></svg></div>
    //~ <div class="col-sm-4 text-left">{2}</div>
	//~ </div>
//~ `;

// ring elements - unbundled
template0 = `
  <div class="section vis-section">
		<div class="container-fluid" id="p{0}">
	    <div class="col-sm-6"><svg class="vis vis-dnut" id="{1}"></svg></div>
	    <div class="col-sm-1"></div>
	    <div class="col-sm-4 text-left">{2}</div>
	    <div class="col-sm-1"><img class="tap" src='img/ring-tap.gif' width=40></div>
		</div>
	</div>
`;

// graph element
//~ template1 = `
	//~ <div class="tab-pane fade in">
	//~ </div>
//~ `;

template1 = `
  <div class="section vis-section">
	  <div class="col-sm-7"><svg class="vis" id="{0}"></svg></div>
    <div class="col-sm-4 text-left">{1}</div>
    <div class="col-sm-1"><img class="tap" src='img/ring-tap.gif' width=40></div>
	</div>
`;

template3 = `
  <div class="section vis-section">
	  <div class="col-sm-7 vis" id="{0}"></div>
    <div class="col-sm-4 text-left">{1}</div>
    <div class="col-sm-1"><img class="tap" src='img/ring-tap.gif' width=40></div>
	</div>
`;

// pearl
var template2 = `
	<li class="nav-item {2}">
		<a class="nav-link dnut" href="#p{1}" data-toggle="tab">{0}</a>
	<li>  
`;
// <img src="test.png" style="width: 50%;">

// a pythonesque format method
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args;
        args = arguments;
        if (args.length === 1 && args[0] !== null && typeof args[0] === 'object') {
            args = args[0];
        }
        return this.replace(/{([^}]*)}/g, function(match, key) {
            return (typeof args[key] !== "undefined" ? args[key] : match);
        });
    };
}

var copy00 = 'This series derives from World Bank\'s <b>Living Standards Measurement Study</b> (LSMS).  The data here is from the 2015-2016 third wave panel of the LSMS and covers location, education, and consuming habits of the respondents';

function mapSetup() {
		d3.select("#country svg")
			.attr("viewbox", '0 0 800 600')
			.attr("width", null)
			.attr("height", null)
			.style("transform", "scale(.8)")
			.style('cursor', 'pointer');
	    
		var cHtml = d3.select('#country').html(); // somehow not injecting svg in right namespace
		d3.select('#country').html("");
		d3.select('#country').html(cHtml);  // so re-inject
		
		var color = d3.scaleLinear() // access cloropleth
	    .domain([5, 90])
	    .range(["#8D8D8D", "#F7C51B"]);
	    
		d3.selectAll('#country svg path').style("fill",function() { 
			var name = d3.select(this).attr('title');
			var pcent = staticData['electricityByState'][name];
			var c = color(pcent);
	    return c;
    })
    
		d3.selectAll("#country svg path")
	    .on('mouseover click', function (d) {
				var name = d3.select(this).attr('title');
	      div
	        .transition()
	        .duration(200)
	        .style('opacity', 0.9);
	      div
	        .html('&nbsp;' + name + " - " + staticData['electricityByState'][name] + '%&nbsp;')
	        .style('left', d3.event.pageX + 20 + 'px')
	        .style('top', d3.event.pageY + 'px');
	    })
	    .on('mouseout', () => {
	      div
	        .transition()
	        .duration(500)
	        .style('opacity', 0);
	    });
    
}

function initHtml () {
	var d = data.nigeriaF;
	
	// in desktop format
	//~ staticData.dnutData.forEach((d,i) => {
		//~ $("#access-content").append(template0.format(i, d[0], d[4], !i?"active":""));
	//~ });
	
	// unbundled from desktop
	staticData.dnutData.forEach((d,i) => {
		$("#section2, .vis-section").last().after(template0.format(i, d[0], d[4]));
	});
	
	//~ $("#access-content").append(template0.format(0, "eConn", staticData.eConnCopy, "active"));
	//~ $("#access-content").append(template0.format(1, "lightEdu", staticData.hhFEeduMOLightCopy, ""));
	//~ $("#access-content").append(template0.format(2, "cookEduMo", staticData.hhMAeduCookCopy, ""));
	//~ $("#access-content").append(template0.format(3, "lightDistRoad", staticData.hhBoDistRoadCopy, ""));
	//~ $("#access-content").append(template0.format(4, "cookDistPop", staticData.hhBoDistPopCopy, ""));
	
	//~ staticData['dnutPearlNames'].forEach((d,i) => {
		//~ $("#dnut-pills").append(template2.format(d, i, !i?"active":""));
		//~ });
	//~ $('#vis0').html(template0.format("Choosing Grid Electricity &mdash; Gender", "eConn", copy00, data.nigeriaF.eConnCopy, m));
	//~ $('#vis1').html(template0.format("P6 Parental Education &mdash; Lighting Fuel", "lightEdu", copy00, data.nigeriaF.hhFEeduMOLightCopy, m));
	//~ $('#vis2').html(template0.format("P6 Mother's Education &mdash; Men's Cooking Fuel", "cookEduMo", copy00, data.nigeriaF.hhMAeduCookCopy, m));
	//~ $('#vis3').html(template0.format("Road Access &mdash; Lighting Fuel", "lightDistRoad", copy00, data.nigeriaF.hhBoDistRoadCopy, m));
	//~ $('#vis4').html(template0.format("Urban Access &mdash; Kerosene Usage", "cookDistPop", copy00, data.nigeriaF.hhBoDistPopCopy, m));

	// cloropleth
	$("#section2").last().after(template3.format("country", staticData.mapCopy));
	
	// load the external svg from a file
	d3.xml("img/nigeria.svg", function(xml) {
	var importedNode = document.importNode(xml.documentElement, true);
	d3.select("#country")
		.each(function() {
			this.appendChild(importedNode);
		})
		// inside of our d3.xml callback, call another function
		// that styles individual paths inside of our imported svg
		//styleImportedSVG()
		mapSetup();
	});

	//$('#disease').html(template1.format("disease0", staticData.gbd.asthmaCopy));
	$("#section2").last().after(template1.format("disease0", staticData.gbd.asthmaCopy));
	
	//~ // set up handlers
	//~ $('.menuOpts').on('click', (e) => {
		//~ var sect = $(e.target).attr('data-sect');
		//~ var slide = $(e.target).attr('data-slide');
		//~ $.fn.fullpage.moveTo(sect,slide);
		
		//~ $('.menuOpts').removeAttr('data-active');
		//~ $(`.menuOpts[data-sect=${sect}][data-slide=${slide}]`).attr('data-active', '1');
		//~ });
	
}
