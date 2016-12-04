//Javascript Document

(function(){
	"use strict";//make it impossible to accidentally create global variables
	
	console.log("SEAF fired");
	var width = 650;
    var height = 500;
	var color = d3.scaleOrdinal(d3.schemeCategory10);

	d3.json("data.json", function(data) {
	   var canvas = d3.select("#graph").append("svg")
	        .attr("width", width)
	        .attr("height", height)
	        .attr("border", "black")

	   var group = canvas.append("g")
	       

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
	        .attr("d", function(d){ return line(d) })
	        .attr("fill", "none")
	        .attr("stroke", color)
	        .attr("stroke-width", 3);
	});
})();