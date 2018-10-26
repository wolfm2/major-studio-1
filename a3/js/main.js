
d3.select("#main")
  .attr("width", width)
  .attr("height", height);

data = [.5, .3, .9]

d3.select('#main').append("g").selectAll("path")
	.data(data).enter()
	.append(mal0Wrapper); // add innermost arc
	
