
// define parameters of the scatterplot
var margin_scatter = {top: 30, right: 50, bottom: 60, left:70},
    width_scatter = 600 - margin_scatter.left - margin_scatter.right,
    height_scatter = 400 - margin_scatter.top - margin_scatter.bottom;

var variables_scatter_x = ["woonoppervlak", "Vraagprijs", "Prijs per m2", "Bouwjaar"]
var variables_scatter_y = ["woonoppervlak", "Aantal kamers", "Vraagprijs", "Prijs per m2"]

function draw_scatter(){

// scale for when time variable used
x_scatter_time = d3.scaleTime().range([0, width_scatter]);

// set the ranges of the scatterplot
x_scatter = d3.scaleLinear()
				  .range([0, width_scatter]);
y_scatter = d3.scaleLinear()
                  .range([height_scatter, 0]);



// create tooltip for the scatter
tip_scatter = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([-5,0])
	  .html(function(d) {
	  	return String(d.address1) + "<br>" +
	  		   String(currentvariable_scatter_x) + ": " + d[currentvariable_scatter_x] + "<br>" +
	  	       String(currentvariable_scatter_y) + ": " + d[currentvariable_scatter_y]
	  })


// create svg for the scatterplot
svg_scatter = d3.select("#scatter").append("svg")
.attr("class", "svg_scatter")
.attr("width", width_scatter + margin_scatter.left + margin_scatter.right)
.attr("height", height_scatter + margin_scatter.top + margin_scatter.bottom)
.append("g")
.attr("transform",
      "translate(" + margin_scatter.left + "," + margin_scatter.top + ")");



}



function update_scatter(data, svg, x_variable, y_variable, average_data){

	  var axis = svg.selectAll(".axis-scatter")
					.remove()
	  var text = svg.selectAll(".scatter-text")
					.remove()
	  svg.selectAll(".avg")
	  				.remove()

	   // format the data
		time_data.length = 0
	  	data.forEach(function(d) {
	      time_data.push(parse_time(d.Bouwjaar));
	  	});

	  // Scale the range of the data
	  x_scatter.domain(d3.extent(data, function(d) { return d[x_variable]; }));
	  y_scatter.domain([d3.min(data, function(d) { return d[y_variable]; }),
	  					d3.max(data, function(d) { return d[y_variable]; })]);

	    if (time_data.length > 0)
    	{
	    	x_scatter_time.domain(d3.extent(time_data))
    	}

	  // Add the scatterplot
	  var circles = svg.selectAll(".scatter-circle").data(data)

	  circles.exit().remove()


	  circles
	    .enter().append("circle")
	    .attr("class", "scatter-circle")
	    .transition().duration(300)
	      .attr("class", "scatter-circle")
	      .attr("r", 5)
	      .attr("stroke", "black")
	      .attr("cx", function(d) {

	      	if (x_variable == "Bouwjaar")
	      	{
	      		return x_scatter_time(parse_time(d[x_variable]))
	      	}
	      	else
	      	{
	      		return x_scatter(d[x_variable])
	      	}
	    })
	      .attr("cy", function(d) { return y_scatter(d[y_variable]); })
	      .style("fill", function(d){

	      	if (d.searched_house == true)
			{
				return "yellow"
			}
			else
			{
				return "grey"
			}
	      })


	 circles
	 .transition().duration(300)
	      .attr("cx", function(d) {

	      	if (x_variable == "Bouwjaar")
	      	{
	      		return x_scatter_time(parse_time(d[x_variable]))
	      	}
	      	else
	      	{
	      		return x_scatter(d[x_variable])
	      	}
	    })
	      .attr("cy", function(d) { return y_scatter(d[y_variable]); })
	      .style("fill", function(d){

	      	if (d.searched_house == true)
			{
				return "yellow"
			}
			else
			{
				return "grey"
			}
	      })

	svg.selectAll(".scatter-circle")
	      .on("mouseover", function(d){
	      	colour_map(d)
	      	colour_barchart(d)
	      	colour_scatter(d)
	      	colour_table(d)

	      	d3.select(this).attr("r", 10)

	      	var target = document.getElementsByClassName("scatter-circle")
	      	tip_scatter.show(d, target)
	      })
	      .on("mouseout", function(d){
	      	remove_colour_map(d)
	      	remove_colour_barchart(d)
	      	remove_colour_scatter(data)
	      	remove_colour_table(d)
	      	d3.select(this).attr("r", 5)

	      	tip_scatter.hide()
	      })

	d3.select(".svg_scatter").call(tip_scatter)

	// add x axis

	if (x_variable == "Bouwjaar")
	{
	  // Add the X Axis if scale is time
	  svg.append("g")
	  //.transition().duration(1000)
	      .attr("transform", "translate(0," + height_scatter + ")")
	      .attr("class", "axis-scatter")
	      .call(d3.axisBottom(x_scatter_time));
	}
	else
	{

	 svg.append("g")
		//.transition().duration(1000)
			.attr("transform", "translate(0," + height_scatter + ")")
		  	.attr("class", "axis-scatter")
	        .call(d3.axisBottom(x_scatter))

	}

	// add y axis
	if (y_variable == "Aantal kamers")
	{
		svg.append("g")
		.transition().duration(1000)
		  	.attr("class", "axis-scatter")
	        .call(d3.axisLeft(y_scatter)
	        .ticks(d3.max(data, function(d) { return d[y_variable]; }) - d3.min(data, function(d) { return d[y_variable]; }))
	        .tickFormat(d3.format("d")));

	}
	else
	{
		// Add the Y Axis
	  svg.append("g")
	  .transition().duration(1000)
	      .attr("class", "axis-scatter")
	      .call(d3.axisLeft(y_scatter));

	}


    // Add text for y-axis
	  svg.append("text")
	  .transition().duration(1000)
	  .attr("transform", "translate(-60," +  (height_scatter+margin_scatter.bottom)/2 + ") rotate(-90)")
	  .attr("class", "scatter-text")
	  .text(y_variable);


	  // create line
	  var curved_line = d3.line()
	  .x(function(d,i){

	  	let adjustment = (d3.max(line_data_x) - d3.min(line_data_x))/line_data_x.length

	  	//return y_scatter(d)
	  	return x_scatter(line_data_x[i])

    	//return x_scatter(i * adjustment + d3.min(line_data_x))



    })
      .y(function(d){
    	return y_scatter(d)
      })
      .curve(d3.curveBasis)


	// Add text for x-axis
	  svg.append("text")
	  .transition().duration(1000)
	  .attr("transform", "translate(" + (width_scatter/2) + ","+  (height_scatter + 30) + ")")
	  .attr("class", "scatter-text")
	  .text(x_variable);

	  	// create line
	  	var line = svg.append('path')
		.attr('class', 'avg')
		.datum(average_data)

		line
		.transition()
        .duration(2000)
		.attr('d', curved_line)

}

