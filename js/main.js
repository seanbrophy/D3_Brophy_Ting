//Javascript Document

(function(){
	"use strict";//make it impossible to accidentally create global variables
	
	console.log("SEAF fired");


	/*modified from Mike Bostock at http://bl.ocks.org/3943967 */
/*
	var data = [
	{"key":"DOTA 2", "pop1":3000, "pop2":3000, "pop3":3000},
	{"key":"CS:GO", "pop1":3000, "pop2":3000, "pop3":3000},
	{"key":"GTA 5", "pop1":12000, "pop2":5000, "pop3":13000},
	{"key":"GTA ", "pop1":12000, "pop2":5000, "pop3":13000},
	{"key":"TF2", "pop1":8000, "pop2":21000, "pop3":11000}
	];
	 
	 console.log(data.length);
	var n = 3, // number of layers
	    m = data.length, // number of samples per layer
	    stack = d3.stack(),
	    labels = data.map(function(d) {return d.key;}),
	    
	    //go through each layer (pop1, pop2 etc, that's the range(n) part)
	    //then go through each object in data and pull out that objects's population data
	    //and put it into an array where x is the index and y is the number
	    layers = stack(d3.range(n).map(function(d) { 
	                var a = [];
	                for (var i = 0; i < m; ++i) {
	                    a[i] = {x: i, y: data[i]['pop' + (d+1)]};  
	                }
	                return a;
	             })),
	    
		//the largest single layer
	    yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
	    //the largest stack
	    yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

	var margin = {top: 40, right: 10, bottom: 20, left: 10},
	    width = 500 - margin.left - margin.right,
	    height = 414 - margin.top - margin.bottom;

	var x = d3.scaleOrdinal()
	    .domain(d3.range(m))
	    .range([0, width], 0.08);//was previously .rangeroundbands

	var y = d3.scaleLinear()
	    .domain([0, yStackMax])
	    .range([height, 0]);

	var color = d3.scaleLinear()
	    .domain([0, n - 1])
	    .range(["#aad", "#556"]);

	var xAxis = d3.axisBottom()
	    .scale(x)
	    .tickSize(1)
	    .tickPadding(6)
		.tickValues(labels);

	var svg = d3.select("#graph").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var layer = svg.selectAll(".layer")
	    .data(layers)
	  .enter().append("g")
	    .attr("class", "layer")
	    .style("fill", function(d, i) { return color(i); });

	layer.selectAll("rect")
	    .data(function(d) { return d; })
	  .enter().append("rect")
	    .attr("x", function(d) { return x(d.x); })
	    .attr("y", function(d) { return y(d.y0 + d.y); })
	    .attr("width", x.range())
	    .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);
*/




    /*var data = [
	{"key":"DOTA 2", "pop1":3000, "pop2":3000, "pop3":3000},
	{"key":"CS:GO", "pop1":3000, "pop2":3000, "pop3":3000},
	{"key":"GTA 5", "pop1":12000, "pop2":5000, "pop3":13000},
	{"key":"GTA ", "pop1":12000, "pop2":5000, "pop3":13000},
	{"key":"TF2", "pop1":8000, "pop2":21000, "pop3":11000}
	];
	 
	 console.log(data.length);
	var n = 3, // number of layers
	    m = data.length, // number of samples per layer
	    stack = d3.layout.stack(),
	    labels = data.map(function(d) {return d.key;}),
	    
	    //go through each layer (pop1, pop2 etc, that's the range(n) part)
	    //then go through each object in data and pull out that objects's population data
	    //and put it into an array where x is the index and y is the number
	    layers = stack(d3.range(n).map(function(d) { 
	                var a = [];
	                for (var i = 0; i < m; ++i) {
	                    a[i] = {x: i, y: data[i]['pop' + (d+1)]};  
	                }
	                return a;
	             })),
	    
		//the largest single layer
	    yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
	    //the largest stack
	    yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

	var margin = {top: 40, right: 10, bottom: 20, left: 10},
	    width = 500 - margin.left - margin.right,
	    height = 414 - margin.top - margin.bottom;

	var x = d3.scale.ordinal()
	    .domain(d3.range(m))
	    .rangeRoundBands([0, width], 0.08);

	var y = d3.scale.linear()
	    .domain([0, yStackMax])
	    .range([height, 0]);

	var color = d3.scale.linear()
	    .domain([0, n - 1])
	    .range(["#aad", "#556"]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .tickSize(1)
	    .tickPadding(6)
		.tickValues(labels)
	    .orient("bottom");

	var svg = d3.select("#graph").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var layer = svg.selectAll(".layer")
	    .data(layers)
	  .enter().append("g")
	    .attr("class", "layer")
	    .style("fill", function(d, i) { return color(i); });

	layer.selectAll("rect")
	    .data(function(d) { return d; })
	  .enter().append("rect")
	    .attr("x", function(d) { return x(d.x); })
	    .attr("y", function(d) { return y(d.y0 + d.y); })
	    .attr("width", x.rangeBand())
	    .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);*/


})();