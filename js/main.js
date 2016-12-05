//Javascript Document

(function(){
	"use strict";//make it impossible to accidentally create global variables
	
	console.log("SEAF fired");
	var width = 500;
    var height = 250;
    var padding = 30;
 
    //grabs a d3 color library
	var color = d3.scaleOrdinal(d3.schemeCategory10);

//grabs the data from a json file and creates a function using the data
	d3.json("data.json", function(data) {

		var xScale = d3.scaleLinear()
						.range([padding, width - padding])
						.domain([1,7]);

		var yScale = d3.scaleLinear()
						.range([height - padding, padding])
						.domain([0,20]);

		var xAxis = d3.axisBottom()
	    			.scale(xScale)
	    			.ticks(5); 

		var yAxis = d3.axisLeft()
	    			.scale(yScale)
	    			.ticks(5); 

		//creates the svg object to draw on after selecting an element with an id of 'graph'
	   var canvas = d3.select("#graph").append("svg")
	        .attr("width", width)
	        .attr("height", height);

	   var group = canvas.append("g")

	   group.append("g")
			.attr("class", "axisX")
			.attr("transform", "translate(0," + (height - padding) + ")")//sets the axis bar at the bottom
	    	.call(xAxis);

	   group.append("g")
			.attr("class", "axisY")
			.attr("transform", "translate(" + padding + ",0)")
	    	.call(yAxis);
	       
	   
	});
})();