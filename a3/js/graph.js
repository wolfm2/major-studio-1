var margin = {top: 30, right: 20, bottom: 100, left: 50}
var width; 
var height;

var xScale;
var yScale;

data.gbd = {
	mainCopy: "This series is comprised of data from the Institute for Health Metrics and Evaluation (IHME). Specifically, their 2017 Global Burden of Disease dataset for all resperatory illness rates herein.",
	asthmaCopy: 'The World Health Organization (WHO) and PubMed has outlined several causes of death that are attributable to solid fuel and kerosene usage <sup>1,2</sup>.  This graph explores the imbalance that exists in how these diseases affect Nigerian women since 2007.'
}

function initDiseaseData() {
		d3.queue()
			.defer(d3.csv, 'data/IHME-GBD_2016_DATA-17badf26-1.csv')
			.await(processDiseaseData);
}

function processDiseaseData(e, data0, b, c, d) {
	var dataF = []; // data filtered
	var disease = ['Asthma', 'Chronic obstructive pulmonary disease', 'Ischemic stroke']; //, 'Interstitial lung disease and pulmonary sarcoidosis'
	
	disease.forEach((d) => {
		['Female', 'Male'].forEach((s) => {
			  f0 = data0.filter((e) => { return e.measure == 'Deaths' && e.sex == s && 
																					e.year >  2006 && e.metric == 'Rate' && e.cause == d});
			  dataF.push( _.map(f0, (e) => {return ({year:e.year, y:e.val, c:e.cause})}) );
		});
	});

	width = vis0svgW - margin.left - margin.right 
	height = vis0svgH - margin.top - margin.bottom; 

	diseaseGraph(dataF);
}

topScale = 1

function bdAxes(svg) {
	
	yScale = d3.scaleLinear()
    .domain([0, 10])
    .range([height * topScale, 0]); 
    
  xScale = d3.scaleTime()
    .domain([new Date(2007, 0, 1), new Date(2016, 0, 1)])
    .range([0, width]);

  x_axis = d3.axisBottom()
    .ticks(8)
    .scale(xScale);
    
	svg.append("g")  //x
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height * topScale + ")")
		.call(x_axis); 

	svg.append("g") // y
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale))
    
  d3.select('.y-axis').append('text')
			.text('Deaths per 100,000')
			.attr('fill', 'black')
			.attr("transform", "translate(67,-10)")
}

gColors = ['#6B818C', '#E09891', '#CB769E', '#94A08D'];

function diseaseGraph(data) {
	
	var svg = d3.select("#disease0")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
	bdAxes(svg);  // define scale and axes
	
	var line = d3.line() // line function
	    .x(function(d, i) { return xScale(new Date(2007 + i, 0, 1)); }) 
	    .y(function(d) { return yScale(d.y); })
	    .curve(d3.curveMonotoneX); // Smooth it.  Keep?
	

	data.forEach((dataset, i) => {
		function getBODColor (d){
					var c = gColors[parseInt(i/2)];
					if (i%2)
					  return c;
					else
					  return d3.lab(c).darker(.8);
		}		
		
		svg.append("path")
	    .datum(dataset) 
	    .on('mouseover', function(d) {
				var disease = d3.select(this).attr('data-disease');
				d3.selectAll('.line:not([data-disease=\'' + disease + '\'])')
					.transition()
		      .duration(200)
		      .style('stroke', 'Gainsboro')
				//d3.select(this).style('stroke', 'orange')
			})
			.on('mouseout', function() {
				d3.selectAll('.line[data-disease]').each(function (d) {
					// d3.selectAll('.line[data-disease]').style('stroke', function () { console.log(d3.select(this).attr('data-color')); return 'blue'})
					d3.selectAll('.line[data-disease]')		        
						.transition()
		        .duration(200)
						.style('stroke', function () { 
						color = d3.select(this).attr('data-color');
						return color;
						});
						
					});
				
			})
	    .attr("class", "line") 
	    .attr("d", line) // generator function
			.attr("data-disease", (d) => { return d[0].c })
	    .attr('data-color', getBODColor)
	    .style('stroke', getBODColor);
		
		svg.selectAll(".dot" + i) // dots
	    .data(dataset)
		  .enter().append("circle") 
		    .attr("class", "dot") 
		    .attr("r", 4)
		    .attr("cx", function(d, i) { return xScale(new Date(2007 + i, 0, 1)) })
		    .attr("cy", function(d) { return yScale(d.y) })
		    
		    .style('cursor', 'pointer')
		    .on('mouseover', d => {
		      div
		        .transition()
		        .duration(200)
		        .style('opacity', 0.9);
		      div
		        .html('Deaths: ' + parseFloat(d.y).toFixed(2))
		        .style('left', d3.event.pageX + 20 + 'px')
		        .style('top', d3.event.pageY + 'px');
					})
		    .on('mouseout', () => {
		      div
		        .transition()
		        .duration(500)
		        .style('opacity', 0);
					});
		    
		    
		    
		    
			
		});
		
		squareSz = 16;
		sqBuf = (margin.bottom/2) * -1;
		
		// legend
		bodLegend = svg.append('g').selectAll('rect')
			.data(data).enter();
			
			bodLegend
			.append('rect')
			.attr('x', (d,i) => { 
				return ((50*i) - (i%2?10:0));
				})
			.attr('y', height - sqBuf)
			.attr('width', squareSz)
			.attr('height', squareSz)
			.attr('fill', (d,i) => {
				var c = gColors[parseInt(i/2)];
				if (i%2)
				  return c;
				else
				  return d3.lab(c).darker(.8);
				});
				
			bodLegend	
			.append('text')
			.attr('x', (d,i) => { 
				return ((50*i) + squareSz + 5 - (i%2?10:0))
				})
			.attr('y', height - sqBuf + 12)
			.text((d,i) => {
				if (i%2)
				  return 'M';
				else
				  return 'F';
				})
			.exit();
			
			diseaseNames = ['Asthma', 'COPD', 'Ischemic Stroke']; //, 'ILD/Sarcoidosis'
			bodLegend	
			.append('text')
			.attr('x', (d,i) => { return (50*i) })
			.attr('y', height - sqBuf - 2)
			.text((d,i) => {
				if (i%2)
				  return '';
				else
				  return diseaseNames[i/2];
				})
			.exit();
		
}
      
