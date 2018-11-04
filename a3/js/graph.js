var margin = {top: 50, right: 50, bottom: 50, left: 50}
var width = window.innerWidth - margin.left - margin.right 
var height = window.innerHeight - margin.top - margin.bottom; 

var xScale;
var yScale;

function initDiseaseData() {
		d3.queue()
			.defer(d3.csv, 'data/IHME-GBD_2016_DATA-17badf26-1.csv')
			.await(processDiseaseData);
}

function processDiseaseData(e, data0, b, c, d) {
	var dataF = []; // data filtered
	var disease = ['Asthma', 'Chronic obstructive pulmonary disease', 'Interstitial lung disease and pulmonary sarcoidosis', 'Ischemic stroke']
	
	disease.forEach((d) => {
		['Female', 'Male'].forEach((s) => {
			  f0 = data0.filter((e) => { return e.measure == 'Deaths' && e.sex == s && 
																					e.metric == 'Rate' && e.cause == d});
			  dataF.push( _.map(f0, (e) => {return ({year:e.year, y:e.val})}) );
		});
	});

	diseaseGraph(dataF);
}

function bdAxes(svg) {
	
	yScale = d3.scaleLinear()
    .domain([0, 10])
    .range([height, 0]); 
    
  xScale = d3.scaleTime()
    .domain([new Date(2000, 0, 1), new Date(2016, 0, 1)])
    .range([0, width]);

  x_axis = d3.axisBottom()
    .ticks(8)
    .scale(xScale);
    
	svg.append("g")  //x
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(x_axis); 

	svg.append("g") // y
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale));
}

function diseaseGraph(data) {
	
	var svg = d3.select("#disease0")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
	bdAxes(svg);  // define scale and axes
	
	var line = d3.line() // line function
	    .x(function(d, i) { return xScale(new Date(2000 + i, 0, 1)); }) 
	    .y(function(d) { return yScale(d.y); })
	    .curve(d3.curveMonotoneX); // Smooth it.  Keep?

	// foreach here
  dataset = data[0];
  
	svg.append("path")
    .datum(dataset) 
    .attr("class", "line") 
    .attr("d", line); // generator function

  dataset = data[1];
  
	svg.append("path")
    .datum(dataset) 
    .attr("class", "line") 
    .attr("d", line); // generator function
	
	svg.selectAll(".dot") // dots
    .data(dataset)
	  .enter().append("circle") 
	    .attr("class", "dot") 
	    .attr("r", 4)
	    .attr("cx", function(d, i) { return xScale(new Date(2000 + i, 0, 1)) })
	    .attr("cy", function(d) { return yScale(d.y) });
}
      
initDiseaseData();
