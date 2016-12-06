//Javascript Document

(function(){
	"use strict";//make it impossible to accidentally create global variables
	
	console.log("SEAF fired");
    var height = 300;
    var padding = 60;

 
    //grabs a d3 color library
	var color = d3.scaleOrdinal(d3.schemeCategory10);

	function resize() {

		//grabs the containing divs width and holds it within a variable
		var width = parseInt(d3.select('#graph').style('width'))-padding;

		//empty the div everytime the the resize function is called
	 	document.querySelector( '#graph' ).innerHTML = '';

	    //grabs a d3 color library
		var color = d3.scaleOrdinal(d3.schemeCategory10);

		//grabs the data from a json file and creates a function using the data
		d3.json("data.json", function(data) {

			var xScale = d3.scaleLinear()
							.range([padding, width])
							.domain([1,7]);

			var yScale = d3.scaleLinear()
							.range([height - padding, padding])
							.domain([0,20000000]);

			var xAxis = d3.axisBottom()
		    			.scale(xScale)
		    			.ticks(5); 

			var yAxis = d3.axisLeft()
		    			.scale(yScale)		    			
		    			.ticks(5)
		    			.tickFormat(d3.format(".0f"));

			//creates the svg object to draw on after selecting an element with an id of 'graph'
		   var canvas = d3.select("#graph").append("svg")
		        .attr("width", width+padding)
		        .attr("height", height);

		   var group = canvas.append("g")

		   //puts a line using data from a json file in a object to be drawn
		   var line = d3.line()
		        .x(function(d, i) {
		        	
		        	if(d.day==0)
		        	{
		        		//this makes the first point on the line stay on the zero point
		        		return d.day+1;
		        	}else
		        	{
		        		return Math.ceil((width/6)*d.day-padding);
		        	}		            
		        })
		        .y(function(d, i) {
		            return d.hours;
		        }); 

		   var div = d3.select("body")
						.append("div")
							.attr("class","tooltip")
							.style("opacity",0);

		    //creates the lines
		   group.selectAll("path")
		        .data(data)
		        .enter()
		        .append("path")
		        //this next line draws the path using the line variable and the data
		        .attr("d", function(d){
		        	
		        	return line(d) })
		        .attr("fill", "none")
		        .attr("transform", "translate(" + padding + ","+ padding +")")
		        //supposed to give random color to each line, doesn't work
		        .attr("stroke", color)
		        .attr("stroke-width", 4.5)
		        .on("mouseover", function(d,i){
		        	//console.log("line: "+(i+1)+", " +d.length);
					div.transition()
						.duration(100)
						.style("opacity", 1);
						div.html("line: "+(i+1))
						.style("left", (d3.event.pageX-40)+"px")
						.style("top", height - d +"px");

					d3.select(this)
						.style('opacity', .8)
						.style('stroke',"black");
				})
				.on("mouseout" ,function(){
					div.transition()
						.duration(200)
						.style("opacity", 0);

					d3.select(this)
						.style('opacity', 1)
						.style('stroke',color);
				});



		   //the axis bars
		   group.append("g")
				.attr("class", "axisX")
				.attr("transform", "translate(0," + (height - padding) + ")")//sets the axis bar at the bottom
		    	.call(xAxis);

		    group.append("g")
	        	.attr("class", "axis")
	            .attr("transform", "translate("+padding+",0)")
	            .call(yAxis);
       	    
	        //add titles to the axes
	        /*group.append("text")
	            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
	            .attr("transform", "translate("+ ((padding/2)-7) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
	            .text("Total Hours Played By All Users");*/

	        group.append("text")
	            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
	            .attr("transform", "translate("+ (width/2) +","+(height-(padding/3))+")")  // centre below axis
	            .text("Days Passed");
		       
		   
		});
	}

	resize();

	d3.select(window).on('resize', resize);


})();