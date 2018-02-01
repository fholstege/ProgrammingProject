/*****

* Name: Floris Holstege
* Student ID: 12002151

Creates the barchart, and defines update function.

*****/

// define parameters of barchart
var margin_bar = {top: 60, right: 80, bottom: 120, left: 60},
    width_bar = 600 - margin_bar.left - margin_bar.right,
    height_bar = 400 - margin_bar.top - margin_bar.bottom;

// create necessary list
var barchart_data = []
var currentvariable_bar = "Aantal kamers"
var time_data = []

// creates static elements of barchart
function draw_barchart(){

	// parse time for when time variable is used
	parse_time = d3.timeParse("%Y");

	// set the ranges of the barchart
	x_bar = d3.scaleBand()
	          .range([0, width_bar])
	          .padding(0.1);
	y_bar = d3.scaleLinear()
	          .range([height_bar, 0]);

	// when time variable is selected
	y_bar_time = d3.scaleTime().range([0, height_bar]);

	// create tooltip for the barchart
	tip_bar = d3.tip()
		  .attr("class", "d3-tip")
		  .offset([-5,0])
		  .html(function(d) {
		  	return "<strong>" + d[currentvariable_bar] + "</strong>"
		  })

	// create svg for the barchart
	svg_bar = d3.select("#barchart").append("svg")
	.attr("class", "svg_bar")
	.attr("width", width_bar + margin_bar.left + margin_bar.right)
	.attr("height", height_bar + margin_bar.top + margin_bar.bottom)
	.append("g")
	.attr("transform",
		  "translate(" + margin_bar.left + "," + margin_bar.top + ")");

	// add text for y - axis
	svg_bar.append("text")
		.attr("transform", "translate(-50," +
			 (height_bar+margin_bar.bottom)/2 + ") rotate(-90)")
		.attr("class", "bar_text")

}


// update barchart
function update_barchart(data, svg, variable, houses){

	// remove previous axis and text
	var axis = svg.selectAll(".axis")
					.remove()

	var text = svg.selectAll(".bar_text")
					.remove()

	 // format the data
	time_data.length = 0
  	data.forEach(function(d) {
      time_data.push(parse_time(d.Bouwjaar));
  	});

  	// add text for y - axis
	svg.append("text")
	.attr("transform", "translate(-50," +
		 (height_bar+margin_bar.bottom)/2 + ") rotate(-90)")
	.attr("class", "bar_text")
	.text(variable)

	// Scale the range of the data
    x_bar.domain(data.map(function(d) { return d.address1; }));
    y_bar.domain([0, d3.max(data, function(d) { return d[variable]; })]);

    // if no data exists, do not calculate domain for y axis (time) yet
    if (time_data.length > 0)
    {
    	var minimum = d3.min(time_data)
    	minimum.setFullYear(minimum.getFullYear() - 10)
    	y_bar_time.domain([d3.max(time_data), minimum])
    }

    // attach data
  	var bars = svg.selectAll(".bar").data(data)

  	// exit removed bars
  	bars.exit()
    .transition()
      .duration(300)
      .attr("y", y_bar(0))
    .attr("height", height_bar - y_bar(0))
    .style("fill-opacity", 1e-6)
    .remove()

     // add bars to barchart
	bars
	.enter().append("rect")
	.attr("class", "bar")
	.transition().duration(300)
	.attr("x", function(d) {
      	return x_bar(d.address1); })
      .attr("width", x_bar.bandwidth())
      .attr("y", function(d) {

      		// change scales if axis reflects time
      		if (variable == "Bouwjaar")
      		{
      			return y_bar_time(parse_time(d[variable]))
      		}
      		else
      		{
      			return y_bar(d[variable]);
      		}

      })
      .attr("height", function(d) {

      		// change scales if axis reflects time
      		if (variable == "Bouwjaar")
      		{
      			return height_bar - y_bar_time(parse_time(d[variable]))
      		}
      		else
      		{
      			return height_bar - y_bar(d[variable]);
      		}

      })
      .style("fill", function(d){

      	// set to yellow if house is searched, blue if just selected
      	if (d.searched_house == true)
		{
			return "yellow"
		}
      	else
      	{
      		return "steelblue"
      	}
      })

    // create transition
    bars
    .transition().duration(300)
    .attr("x", function(d) {
      	return x_bar(d.address1); })
      .attr("width", x_bar.bandwidth())
      .attr("y", function(d) {

      		// change scales if axis reflects time
      		if (variable == "Bouwjaar")
      		{
      			return y_bar_time(parse_time(d[variable]))
      		}
      		else
      		{
      			return y_bar(d[variable]);
      		}

      })
      .attr("height", function(d) {

      		// change scales if axis reflects time
      		if (variable == "Bouwjaar")
      		{
      			return height_bar - y_bar_time(parse_time(d[variable]))
      		}
      		else
      		{
      			return height_bar - y_bar(d[variable]);
      		}

      })
      .style("fill", function(d){

      	// set to yellow if house is searched, blue if just selected
      	if (d.searched_house == true)
		{
			return "yellow"
		}
      	else
      	{
      		return "steelblue"
      	}
      })

    // implement mouseover/out and click functions
    d3.selectAll("rect")
    .on("mouseover", function(d){

    	// ensure other charts are coloured if mouseover
    	colour_barchart(d)
    	colour_map(d)
    	colour_scatter(d)
    	colour_table(d)
    	var target = document.getElementsByClassName("bar")
		tip_bar.show(d, target)

    })
    .on("mouseout", function(d){

    	// ensure colours are removed if mouseout
    	remove_colour_barchart(d)
    	remove_colour_map(d)
    	remove_colour_scatter(houses)
    	remove_colour_table(d)
    	tip_bar.hide()
    })
    .on("click", function(d){

    	// ensure bars are removed if clicked on
    	var index_value_bar = barchart_data.indexOf(d)

    	barchart_data.splice(index_value_bar, 1)
    	update_barchart(barchart_data, svg_bar, currentvariable_bar, houses)

    	remove_colour_map(d)

    })

    // call tooltip for barchart
    d3.select(".svg_bar").call(tip_bar)

    // add the x Axis
  	svg.append("g")
  	.attr("class", "axis")
      .attr("transform", "translate(0," + height_bar + ")")
      .call(d3.axisBottom(x_bar))
      .selectAll("text")
	    .attr("y", 0)
	    .attr("x", 9)
	    .attr("dy", ".35em")
	    .attr("transform", "rotate(50)")
	    .style("text-anchor", "start");

	// add title to y-axis
	d3.select("bar_text")
	.text(variable)


	// create y-axis
	// if "bouwjaar", change scale to reflect time
	if (variable == "Bouwjaar")
	{
	  	svg.append("g")
	  	.attr("class", "axis")
	  	.transition().duration(1000)
	      .call(d3.axisLeft(y_bar_time))
	}
	// if "Aantal kamers", change scale for accuracy
	else if (variable == "Aantal kamers")
	{
		svg.append("g")
	  	.attr("class", "axis")
	  	.transition().duration(1000)
	      .call(d3.axisLeft(y_bar)
	      .ticks(d3.max(data, function(d) {
	      	return d[currentvariable_bar];
	      }))
	      .tickFormat(d3.format("d")));
	}
	// otherwise, create regular y-axis
	else
	{
		svg.append("g")
	  	.attr("class", "axis")
	  	.transition().duration(1000)
	      .call(d3.axisLeft(y_bar)
	      .tickFormat(d3.format("d")));
	}


}
