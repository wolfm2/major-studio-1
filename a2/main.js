// TODO
// X read data
// X make square matrix for data in
// X color per intensity
// X organize data by year/country
// X min max
// o font
// X Legend scale
// X year
// X create region array / color
// X redo Y scale
// X  box when data does not exist
// region rotate
// break up large sets somehow
// bonus: highlighted map?
// INTRO: title fade in, title move up, blocks come down, blocks alias into gray l->r, text fades in, text rotates

// from https://gist.github.com/rosszurowski/67f04465c424a9bc0dae
function lerpColor(a, b, amount) {

  var ah = parseInt(a.replace(/#/g, ''), 16),
    ar = ah >> 16,
    ag = ah >> 8 & 0xff,
    ab = ah & 0xff,
    bh = parseInt(b.replace(/#/g, ''), 16),
    br = bh >> 16,
    bg = bh >> 8 & 0xff,
    bb = bh & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab);

  var rv = '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
  return (rv);
}

const dataPromised = d3.csv("SE4ALLData.csv");
var data = [];

curRegion = 4;

dataPromised.then((d) => { // resolve the promises
  data = d
  regionGroup();
  
  svg = d3.select("body").append("svg")
    .attr('width', window.innerWidth * .9)
    .attr('height', window.innerHeight * .9);
	
	title();
  makeVis(curRegion)
});

function makeVis(r) {
  gridPopulate(r);
  graphAxis(r)
  legendDraw(r);
}

function regionGroup() {
  regions.forEach((d, i) => {
    memberData = [];
    d["members"].forEach((member) => {
      var line = _.filter(data, (d) => {
        return d['Country Name'] == member && d['Indicator Name'] == "Access to electricity (% of rural population with access)";
      })
      if (line.length < 1) console.log('Cant find ', member);
      memberData.push(line[0]);
    })
    regions[i]['member_data'] = memberData;

    var obj = {};
    // order the array by key
    memberData.forEach(c => Object.keys(c).forEach(function(v) {
      (obj[v] || (obj[v] = [])).push(c[v]);
    }));
    regions[i]['md_by_year'] = obj;
  });
}

var numYears = 26;

var blockSize = 20;
var spaceSize = blockSize + 1;

var visY = window.innerHeight * .40; // visualization begin coords 
var vLabelX = 0; // virt label coords
var vLabelY = visY;
var graphX = vLabelX + 100; // graph coords
var graphY = visY;

var svg;

function title() {
  svg.append("text")
    .text('Rural Electricity Access')
    .attr('id', 'title')
    .style('animation', 'intro 6s')
}

function gridPopulate(r) {
  var ydata = []; // year data

  for (var idx = 1990; idx <= 2016; idx++)
    // array by year
    ydata.push(regions[r].md_by_year[idx].map(Number));

  //~ d3.selectAll('.user').each(
  //~ function(){
  //~ var elt = d3.select(this);
  //~ elt.classed(elt.attr("title"), true);
  //~ }) 

  var ymin = _.min(_.min(ydata)); // year min
  var ymax = _.max(_.max(ydata)); // year max
  var metricLabels = ['Region', 'Minimum', 'Maximum'];
  var metricDatas = [regions[r].name, ymin, ymax];

	svg.selectAll('.metrics, .metricData, #country-label-group, #country-data-group') // fade out/remove prev data
		.transition().duration(400)
	  .style('opacity', '0').remove();
	  
  metricLabels.forEach((d, i) => { // metric labels
    svg.append("text")
      .text(d + ':')
      .attr('class', 'metrics')
      .attr('id', d.toLowerCase())
      .style('transform', 'translate(0em, ' + ((i * 1.5) + 5) + 'em)');
  });

  metricLabels.forEach((d, i) => { // metric data
    svg.append('text')
      .text(metricDatas[i])
      .attr('class', 'metricData')
      //attr('id', d.toLowerCase() + '_data')
      .style('transform', 'translate(8em, ' + ((i * 1.5) + 5) + 'em)');
  });
  
  svg.append("g")
    .attr('id', 'country-label-group')
    .selectAll("g")
    .data(regions[r].members)
    .enter()
    .append("text")
    .style('fill', 'black')
    .text((d, i) => {
      return d
    })
    .attr('class', 'country-label')
    .attr('x', vLabelX)
    .attr('y', (d, i) => {
      return (spaceSize * i) + vLabelY
    })

  svg.append("g")
    .attr('id', 'country-data-group')
		.selectAll("g")
    .data(ydata)
    .enter()
    .append("g") //removing
    .attr('transform', (d, i) => {
      return 'translate(' + ((spaceSize * i) + graphX) + ',' + (graphY - 15) + ')' // WHY/2?!?!?!
    })

    .selectAll("rect") // these
    .data(function(d) {
      return d;
    }) //lines
    .enter() //text displays normally

    .append('rect') // rect for each data point

    .transition().duration(1000).attr('fill', (d, i) => {
      if (d == 0)
        return '#cccccc'; // no data
      else
        return lerpColor("#FFFFFF", regions[r].color, d * .01);
    })
    .attr('y', function(d, i) {
      return (i * spaceSize) //  + vLabelY//(graphY / 2);
    }).
  attr('height', blockSize).attr('width', blockSize);
}

var graphAxisY;

function graphAxis(r) {

  graphAxisY = graphY + (regions[r].members.length - .5) * spaceSize;
  var xscale = d3.scaleTime()
    .domain([new Date(1990, 0, 1), new Date(2016, 0, 1)])
    .range([0, (spaceSize * numYears)]);

  var x_axis = d3.axisBottom()
    .ticks(5)
    .scale(xscale);

  svg.append("g")
    .attr("transform", 'translate(' + (graphX + (spaceSize / 2)) + ',' + graphAxisY + ")")
    .call(x_axis).select(".domain").remove()
}

var lAxisStartY;
var lStartY;

function legendChange() {
  lAxisStartY = lStartY + spaceSize;
  lStartY = graphAxisY + spaceSize * 2;
  
  
		//~ .attr('id', 'legend-axis')
    //~ .attr("transform", 'translate(' + lStartX + ',' + lAxisStartY + ")")
}

function legendDraw(r) {

  lsvg = svg.append("g")
		.attr('id', 'legend');
		
	lsvg.transition()
		.duration(400);

  var svgDefs = lsvg.append('defs');

  var mainGradient = svgDefs.append('linearGradient')
    .attr('id', 'mainGradient');

  mainGradient.append('stop')
    .attr('class', 'stop-left')
    .attr('offset', '0');

  mainGradient.append('stop')
    .attr('class', 'stop-right') // redundant
    .attr('offset', '1')
    .style('stop-color', regions[r].color);

  sizeLegend = 10; // in spaceSize units
  lStartX = graphX + (numYears * spaceSize) / 2 - (sizeLegend * spaceSize) / 2;
  lStartY = graphAxisY + spaceSize * 2;
  lWidth = spaceSize * sizeLegend;

  lsvg.append('rect')
    .classed('filled', true)
    .style('stroke', 'lightgray')
    .style('stroke-width', '1px')
    .attr('x', lStartX)
    .attr('y', lStartY)
    .attr('width', lWidth)
    .attr('height', spaceSize);

  var xscale = d3.scaleOrdinal()
    .domain(['0%', '100%'])
    .range([0, lWidth]);

  var x_axis = d3.axisBottom()
    .ticks(2)
    .scale(xscale);

  lAxisStartY = lStartY + spaceSize;

  lsvg.append("g")
		.attr('id', 'legend-axis')
    .attr("transform", 'translate(' + lStartX + ',' + lAxisStartY + ")")
    .call(x_axis).select(".domain").remove()
}

// https://beautifier.io/
