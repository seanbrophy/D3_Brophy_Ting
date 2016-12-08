//Javascript Document

(function(){
	"use strict";//make it impossible to accidentally create global variables
	
	console.log("SEAF fired");

	var margin = {top: 20, right: 20, bottom: 30, left: 40};
	var width = 540 - margin.left - margin.right;
	var height = 500 - margin.top - margin.bottom;

	var svg = d3.select("#graph").append("svg")
			.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);
	var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	var t;

	var x = d3.scaleBand()
	    .rangeRound([0, width])
	    .padding(0.1)
	    .align(0.1);

	var y = d3.scaleLinear()
	    .rangeRound([height, 0]);
	//the colours of the stacked bar chart and legend
	var z = d3.scaleOrdinal()
	    .range(["#C81810", "#FCB00C", "#57842B", "#F36523", "#2F83A2"]);

	var tooltip = svg.append("g")
	  .attr("class", "tooltip")
	  .style("display", "none");
	    
	tooltip.append("rect")
	  .attr("width", 30)
	  .attr("height", 20)
	  .attr("fill", "white")
	  .style("opacity", 0.5);

	tooltip.append("text")
	  .attr("x", 15)
	  .attr("dy", "1.2em")
	  .style("text-anchor", "middle")
	  .attr("font-size", "12px")
	  .attr("font-weight", "bold");   


	var stack = d3.stack();

	//the following calls the function type which reorders the data from biggest to smallest
	d3.csv("data.csv", type, function(error, data) {
	  if (error) throw error;

	  data.sort(function(a, b) { return b.total - a.total; });

	  x.domain(data.map(function(d) { return d.game; }));
	  y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
	  z.domain(data.columns.slice(1));

	  g.selectAll(".game")
	    .data(stack.keys(data.columns.slice(1))(data))
	    .enter().append("g")
	      .attr("class", "game")
	      .attr("fill", function(d) { return z(d.key); })
	    .selectAll("rect")
	    .data(function(d) { return d; })
	    .enter().append("rect")
	      .attr("x", function(d) { return x(d.data.game); })
	      .attr("y", function(d) { return y(d[1]); })
	      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
	      .attr("width", x.bandwidth())
	      .style("opacity", 0)
	      //transition works but the y value returns nan
	      .transition()
			.duration(1800)
			.delay(function (d, i) {
				return i * 50;
			})
			.style('opacity', 1);

		d3.selectAll('rect')
		.on("mouseover", function() { tooltip.style("display", null); })
		.on("mouseout", function() { tooltip.style("display", "none"); })
		.on("mousemove", function(d) {
		    var xPosition = d3.mouse(this)[0] - 15;
		    var yPosition = d3.mouse(this)[1] - 25;
		    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
		    tooltip.select("text").text("22");
		  });

	  //creates the axis bars
	  g.append("g")
	      .attr("class", "axis axis--x")
	      .attr("transform", "translate(0," + height + ")")
	      .call(d3.axisBottom(x));

	  g.append("g")
	      .attr("class", "axis axis--y")
	      .call(d3.axisLeft(y).ticks(10, "s"))
	    .append("text")
	      .attr("x", 2)
	      .attr("y", y(y.ticks(10).pop()))
	      .attr("dy", "0.35em")
	      .attr("text-anchor", "start")
	      .attr("fill", "#000")
	      .text("Players");


	//creates the legend object in the top right corner
	  var legend = g.selectAll(".legend")
	    .data(data.columns.slice(1).reverse())
	    .enter().append("g")
	      .attr("class", "legend")
	      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
	      .style("font", "10px sans-serif");

	//creates the square and gives it it's colour
	  legend.append("rect")
	      .attr("x", width - 18)
	      .attr("width", 18)
	      .attr("height", 18)
	      .attr("fill", z);

	  legend.append("text")
	      .attr("x", width - 24)
	      .attr("y", 9)
	      .attr("dy", ".35em")
	      .attr("text-anchor", "end")
	      .text(function(d) { return d; });
	});

	//sorts the data from highest to lowest player value per month
	function type(d, i, columns) {
	  for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
	  d.total = t;
	  return d;
	}


})();