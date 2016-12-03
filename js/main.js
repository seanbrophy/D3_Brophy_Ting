//Javascript Document

(function(){
	"use strict";//make it impossible to accidentally create global variables
	
	console.log("SEAF fired");

	d3.json("data.json", function(data) {
	   var canvas = d3.select("#graph").append("svg")
	        .attr("width", 500)
	        .attr("height", 500)
	        .attr("border", "black")

	   var group = canvas.append("g")
	        .attr("transform", "translate(100,10)")

	   var line = d3.line()
	        .x(function(d, i) {
	            return d.x;
	        })
	        .y(function(d, i) {
	            return d.y;
	        }); 

	   group.selectAll("path")
	        .data(data).enter()
	        .append("path")
	        .attr("d", function(d){ return line(d) })
	        .attr("fill", "none")
	        .attr("stroke", "green")
	        .attr("stroke-width", 3);
	});
})();