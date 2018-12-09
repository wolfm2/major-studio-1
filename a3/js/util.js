
// TODO
// fonts
// colors
// 	largest in color w rest descending grey
// animation

// X create structure 
// X create title
// X create colors
// X create menu
// X create first real pass re solar w text
// X redo text, make center, make labels
// X left justify 
// X Get other datapoints
// X do vis 2,3
// X do vis Burden of Disease
// X interstital text after title
// X multiple lines per hhid!

// X remove titlebar
// X move filters to right
// X change doughnut center text

// X axis labels
// X tooltips
// X line labels
// X line colors
// X narrative text
// X sources
// scaling of svgs

// donut animations
// X graph animations
// one svg?

//INTRO
var vid1;

//~ // preloads next vid
//~ $('#myVideo').on('play', () => {
	//~ $.ajax( "img/LightBulb1.mp4", function( data ) {
		//~ vid1= URL.createObjectURL(data);
		//~ });
	//~ });

//~ // won't play seamlessly - fix
//~ $('#myVideo').on('ended', () => {
  //~ $('#myVideo source').attr('src', 'img/LightBulb1.mp4');
  //~ //$('#myVideo source').attr('src', vid1);
	//~ $('#myVideo').attr("loop", true);
	//~ $("#myVideo")[0].load();
	//~ $("#myVideo")[0].play();
	//~ $('#myVideo').off('ended');
	//~ });

function cascadeChildren (sec, parent, animation) {
}

function scaleSVG() {
		var w = window.innerWidth / vis0svgW;
		var h = window.innerHeight / vis0svgH;
		s = w<h?w:h;
		
		tx = 50 * (1 / s); // not completely right yet
		ty = 50 * (1 / s); // unscale the transform.
		
		d3.selectAll("svg")
		  .style('transform', 'scale(' + s +')');
		//  .style('transform', 'scale(' + s +') translate(-'+ tx + '%,-' + ty +'%)');
}

var arcMax = 0.75; // percent of circle considered max

var arcGLineBuf;
var arcMaxRadius;

function calcSizeVis0() {
	constraint = vis0svgW<vis0svgH?vis0svgW:vis0svgH; // get the smaller one
	
	arcMaxRadius = constraint*.40; // maximum arc radius
	arcGLineBuf = arcMaxRadius*.1; // width of bar + space
	arcGLine = arcGLineBuf*.7; // width of bar
}

// Generic Vis Utils
var PI = Math.PI;

function visFilter(d, n) { 
	factor = 1/_.max(d); // scale factor
	
	d.forEach((e,i) => {
		n[i] += ' ' + parseInt(d[i]*100) + '%';
		d[i] *= factor;
		}) ;
} 

var visFilterDone = {};

// Doughnut Bars 
function dnutVis(id, vData, vName, vColor) {
	id = '#' + id;
	var dnf = data.nigeriaF
	
	// only scale once
	if (! (id in visFilterDone)) {
		visFilterDone[id] = parseInt(_.max(vData)*100);
		visFilter(vData, vName); // scale / mod data
	}
	
	var localMax = visFilterDone[id];
	
	s = d3.select(id);
	
	s.attr("width", vis0svgW)
	  .attr("height", vis0svgH);
	
	s.selectAll('g').remove();
	
	dnf = data.nigeriaF
	s.append("g").selectAll("path")
		.data(_.zip(vData, vColor)).enter()
		.append(mal0Wrapper); // add innermost 
		
	cTxt = s.append("g") // CENTER TEXT
    
	cTxt.append('text')
		.attr('id', 'center-label')
		.style("transform", "translate("+ vis0svgW/2 +'px,'+ ((vis0svgH/2)-(vis0svgH*.03)) +"px)").append('tspan')
    .text('Maximum:')
    
  cTxt.append('text')
    .attr('id', 'center-num')
		.style("transform", "translate("+ vis0svgW/2 +'px,'+ ((vis0svgH/2)+(vis0svgH*.05)) +"px)").append('tspan')
    // .text(parseInt(((dnf.eConnW+dnf.eConnM)/(dnf.HeadM+dnf.HeadW)) * 100) + '%');
    .text(localMax + '%');
    
  s.append("g") // LEGEND
    .attr('class', 'dLegend')
    .style("text-anchor", "end")
    .selectAll("text")
    .data(vName)
    .enter()
    .append('text')
    .style('font-size', arcGLineBuf + 'px')
    .style("transform", (d, i) => { return "translate("+ (vis0svgW/2 - 10) +'px,'+ ((vis0svgH/2-arcMaxRadius)+arcGLineBuf*i) +"px)"; })
    .text((d) => {return d;})
    .exit();
  
  // Daniel: get rid of gradient
  //~ // Create the svg:defs element and the main gradient definition.
	//~ var svgDefs = s.append('defs');

	//~ var mainGradient = svgDefs.append('linearGradient') // diagonal
		//~ .attr('id', 'mainGradient')
		//~ .attr("x1", "40%")
		//~ .attr("x2", "100%")
		//~ .attr("y1", "40%")
		//~ .attr("y2", "100%");

	//~ // Create the stops of the main gradient. Each stop will be assigned
	//~ // a class to style the stop using CSS.
	//~ mainGradient.append('stop')
			//~ .attr('class', 'stop-left')
			//~ .attr('offset', '0%');

	//~ mainGradient.append('stop')
			//~ .attr('class', 'stop-right')
			//~ .attr('offset', '100%');

  
  
  //~ // box behind legend
  //~ var bbox = d3.select(id).select(".dLegend").node().getBBox();
	//~ var padding = 2;
	//~ var rect = d3.select(id).select('.dLegend').insert('rect', 'text' ).attr("x", bbox.x - padding)
    //~ .attr("y", bbox.y - padding)
    //~ .attr("width", bbox.width + (padding*2))
    //~ .attr("height", bbox.height + (padding*2))
    //~ .style("opacity", ".5")
    //~ .classed('filled', true)
    //~ // .style("fill", '#cfcfcf');
  
}

// mArkL0 wrapper
// receives only d,i
// uses constants for all other necessary vars
function mal0Wrapper(d,i) {
	calcSizeVis0();
	path = mArkL0(vis0svgW/2, vis0svgH/2, arcMaxRadius-(i*arcGLineBuf), arcGLine, labC[d[1]], d[0], i);
	return path;
}

// Define the div for the tooltip
const div = d3
  .select('body')
  .append('div')
  .attr('id', 'mytooltip')
  .attr('class', 'tooltip')
  .style('opacity', 0);
  
//~ const perlDiv = d3
  //~ .select('body')
  //~ .append('div')
  //~ .attr('id', 'perl-tooltip')
  //~ .attr('class', 'tooltip')
  //~ .style('opacity', 0);

// make arc
// width: line width
// value: 0-1
function mArkL0(cx, cy, r, width, color, value, idx) { 
	var e = document.createElementNS('http://www.w3.org/2000/svg', "path");

	d3.select(e)
		//.attr('class', 'arc')
		.attr('data-idx', idx)
		.attr("transform", "translate("+ cx +','+ cy +")")
		.attr("fill", color)
		.attr("d", d3.arc()
				.innerRadius(r)
				.outerRadius(r+width)
				.cornerRadius(5)
				.startAngle(0 * (PI/180))
				.endAngle(value * (PI/180) * 360)
				)
		.style('cursor', 'pointer')
    .on('mouseover click', function () { // Text Highlighting
			var idx = d3.select(this).attr('data-idx'); // ring index
			d3.selectAll('.highlight' + idx)
				.classed('highlight', true);
    })
    .on('mouseout', function () {
			var idx = d3.select(this).attr('data-idx'); // ring index
      d3.selectAll('.highlight' + idx)
				.classed('highlight', false);
    });
		
	return e;
}

