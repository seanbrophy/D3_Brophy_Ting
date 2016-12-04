//Javascript Document

(function(){
	"use strict";//make it impossible to accidentally create global variables
	
	console.log("SEAF fired");
	var width = 650;
    var height = 500;
    //grabs a d3 color library
	var color = d3.scaleOrdinal(d3.schemeCategory10);

//grabs the data from a json file and creates a function using the data
	d3.json("data.json", function(data) {
		//creates the svg object to draw on after selecting an element with an id of 'graph'
	   var canvas = d3.select("#graph").append("svg")
	        .attr("width", width)
	        .attr("height", height);

	   var group = canvas.append("g")
	       
	   //puts a line using data from a json file in a object to be drawn
	   var line = d3.line()
	        .x(function(d, i) {
	            return d.x;
	        })
	        .y(function(d, i) {
	            return d.y;
	        }); 

	   group.selectAll("path")
	        .data(data)
	        .enter()
	        .append("path")
	        //this next line draws the path using the line variable and the data
	        .attr("d", function(d){ return line(d) })
	        .attr("fill", "none")
	        //supposed to give random color to each line, doesn't work
	        .attr("stroke", color)
	        .attr("stroke-width", 3);
	});
})();