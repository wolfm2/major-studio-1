
// TODO
// fill out functions
// enclose panels in div overflow hidden
// recalc vis height for @media
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
// Get other datapoints
// do vis 2,3
// do vis Burden of Disease
// interstital text after title
// multiple lines per hhid!

// remove titlebar
// move filters to right
// change doughnut center text

// PAPERCUTS:
// doughnut center text
// line width for small samples

//INTRO
var vid1;

// preloads next vid
$('#myVideo').on('play', () => {
	$.ajax( "img/LightBulb1.mp4", function( data ) {
		vid1= URL.createObjectURL(data);
		});
	});

// won't play seamlessly - fix
$('#myVideo').on('ended', () => {
  $('#myVideo source').attr('src', 'img/LightBulb1.mp4');
  //$('#myVideo source').attr('src', vid1);
	$('#myVideo').attr("loop", true);
	$("#myVideo")[0].load();
	$("#myVideo")[0].play();
	$('#myVideo').off('ended');
	});

// VIS0
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

// generic doughnut bars 
function dnutVis(id, vData, vName) {
	dnf = data.nigeriaF
	
	s = d3.select(id);
	
	s.attr("width", vis0svgW)
	  .attr("height", vis0svgH);
	
	s.selectAll('g').remove();
	
	dnf = data.nigeriaF
	s.append("g").selectAll("path")
		.data(vData).enter()
		.append(mal0Wrapper); // add innermost 
		
	cTxt = s.append("g") // CENTER TEXT
    .attr('class', 'dCenterTxt');
    
	cTxt.append('text')
		.style("transform", "translate("+ vis0svgW/2 +'px,'+ ((vis0svgH/2)-(vis0svgH*.04)) +"px)").append('tspan')
    .text('Total')
    
  cTxt.append('text')
		.style("transform", "translate("+ vis0svgW/2 +'px,'+ ((vis0svgH/2)+(vis0svgH*.09)) +"px)").append('tspan')
    // .text(parseInt(((dnf.eConnW+dnf.eConnM)/(dnf.HeadM+dnf.HeadW)) * 100) + '%');
    .text('Focus difference' + '%');
    
  s.append("g") // LEGEND
    .attr('class', 'dLegend')
    .style("text-anchor", "end")
    .selectAll("text")
    .data(vName)
    .enter()
    .append('text')
    .style("transform", (d, i) => { return "translate("+ (vis0svgW/2 - 10) +'px,'+ ((vis0svgH/2-arcMinRadius)-arcGLineBuf*i) +"px)"; })
    .text((d) => {return d;})
    .exit();
}

// mArkL0 wrapper
function mal0Wrapper(d,i) {
	calcSizeVis0();
	path = mArkL0(vis0svgW/2, vis0svgH/2, arcMinRadius+(i*arcGLineBuf), arcGLineBuf*.8, '#718c9e', d);
	return path;
}

// Define the div for the tooltip
const div = d3
  .select('body')
  .append('div')
  .attr('id', 'mytooltip')
  .attr('class', 'tooltip')
  .style('opacity', 0);

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
				.endAngle(value * (PI/180) * 360)
				)
		// TOOLTIPS
		.style('cursor', 'pointer')
    .on('mouseover', d => {
      div
        .transition()
        .duration(200)
        .style('opacity', 0.9);
      div
        .html('Total: ' + parseInt(value*100) + '%')
        .style('left', d3.event.pageX + 20 + 'px')
        .style('top', d3.event.pageY + 'px');
    })
    .on('mouseout', () => {
      div
        .transition()
        .duration(500)
        .style('opacity', 0);
    });
		
	return e;
}

function mArkL1 () { // make concentric arc group
}

function mArkL2 () { // make arc group group (several sets of arcs)
}


