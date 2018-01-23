
// define parameters of barchart
var margin_bar = {top: 60, right: 70, bottom: 120, left: 60},
    width_bar = 600 - margin_bar.left - margin_bar.right,
    height_bar = 400 - margin_bar.top - margin_bar.bottom;

// define parameters of the scatterplot
var margin_scatter = {top: 30, right: 40, bottom: 60, left:80},
    width_scatter = 600 - margin_scatter.left - margin_scatter.right,
    height_scatter = 400 - margin_scatter.top - margin_scatter.bottom;


// create necessary variables
var barchart_data = []
var variables_bar = ["Woonoppervlak", "Aantal kamers", "real_price", "Prijs per m2", "Bouwjaar"]
var variables_scatter_x = ["Woonoppervlak", "Aantal kamers", "real_price", "Prijs per m2", "Bouwjaar"]
var variables_scatter_y = ["Woonoppervlak", "Aantal kamers", "real_price", "Prijs per m2"]
var currentvariable_bar = "Aantal kamers"
var currentvariable_scatter_y = "real_price"
var currentvariable_scatter_x = "Woonoppervlak"
var variables_table = ["address1", "Soort.appartement","Tuin", "Soort.dak", "Isolatie", "Energielabel"]
var table_data = []
var line_data_x = []
var line_data_y = []
var time_data = []
var average_data;
var labels_legend = []


// function to determine moving average
function moving_average(data, neighbors) {
  return data.map((val, idx, arr) => {
    let start = Math.max(0, idx - neighbors), 
        end = idx + neighbors
    let subset = arr.slice(start, end + 1)
    let sum = subset.reduce((a,b) => a + b)
    return sum / subset.length
  })
}

// prepare data to be converted to moving average line 
function prepare_average_data(data){

	// empty current lists 
	line_data_x.length = 0
	line_data_y.length = 0
	var line_data = []


	// determine the data for the line
	data.forEach(function(d){

		line_data.push({"x": d[currentvariable_scatter_x], "y":d[currentvariable_scatter_y]})
	})

	// sort data for the line
	line_data.sort(function(a, b) {
    return parseFloat(a.x) - parseFloat(b.x);
	});

	// add data of line to separate lists 
	line_data.forEach(function(d){

		line_data_x.push(d.x)
		line_data_y.push(d.y)
	})

	// use moving average function 
	var average_data = moving_average(line_data_y, 1)
	return average_data
}


window.onload = function(d){

// get the HTML doc from the Iframe 
var doc = document.getElementById("map_frame").contentDocument
var map = d3.select(doc)

// set the ranges of the barchart
var x_bar = d3.scaleBand()
          .range([0, width_bar])
          .padding(0.1);
var y_bar = d3.scaleLinear()
          .range([height_bar, 0]);

// set the ranges of the scatterplot 
var x_scatter = d3.scaleLinear()
				  .range([0, width_scatter]);
var y_scatter = d3.scaleLinear()
                  .range([height_scatter, 0]);

// create scales for when time variable is used 
var parse_time = d3.timeParse("%Y");
var y_bar_time = d3.scaleTime().range([0, height_bar]);
var x_scatter_time = d3.scaleTime().range([0, width_scatter]);


// create tooltip for the barchart
var tip_bar = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([-5,0])
	  .html(function(d) {
	  	return "<strong>" + d[currentvariable_bar] + "</strong>"
	  })

// create tooltip for the scatter
var tip_scatter = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([-5,0])
	  .html(function(d) {
	  	return String(d.address1) + ", " +
	  		   String(currentvariable_scatter_x) + ": " + d[currentvariable_scatter_x] + ", " + 
	  	       String(currentvariable_scatter_y) + ": " + d[currentvariable_scatter_y]
	  })


// create svg for the barchart 
	var svg_bar = d3.select("#barchart").append("svg")
	.attr("class", "svg_bar")
    .attr("width", width_bar + margin_bar.left + margin_bar.right)
    .attr("height", height_bar + margin_bar.top + margin_bar.bottom)
  	.append("g")
    .attr("transform", 
          "translate(" + margin_bar.left + "," + margin_bar.top + ")");

// create svg for the scatterplot 
	var svg_scatter = d3.select("#scatter").append("svg")
	.attr("class", "svg-scatter")
	.attr("width", width_scatter + margin_scatter.left + margin_scatter.right)
    .attr("height", height_scatter + margin_scatter.top + margin_scatter.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin_scatter.left + "," + margin_scatter.top + ")");

// queue the datasets 
var q = d3.queue()
    .defer(d3.json, "../Data/NicolaasRuychaverstraatUtrecht784362neighboorsdatatest.json")
    .defer(d3.json, "../Data/NicolaasRuychaverstraatUtrecht784362housedatatest.json")
    .await(initialize_charts);

// function to colour the map 
function colour_map(data, house){

	map.selectAll(".marker")
	.style("background-color", function(d){

		if (d == data)
		{
			return "red"
			console.log(d, data)
		}
		else if (d.address1 == house[0].address1)
		{
			return "yellow"
		}
		else if (barchart_data.indexOf(d) !== -1)
		{
			return "steelblue"
		}
	})
}

function colour_table(data, house){

	d3.selectAll("tr")
	.style("background-color", function(d){

		console.log(d)
		console.log(house)


		if (d == data)
		{
			return "red"
		}
		//else if (d.address1 == house[0].address1)
		//{
		//	return "yellow"
		//}
		else
		{
			return "white"
		}
	})
}

// function to colour the scatterplot
function colour_scatter(data, house){
	d3.selectAll(".scatter-circle")
		.style("fill", function(d){

			if (d == data)
			{
				return "red"
			}
			else if (d.address1 == house[0].address1)
			{
				return "yellow"
			}
			else if (barchart_data.indexOf(d) !== -1)
			{
				return "steelblue"
			}
		})
	}



// function to colour the barchart
function colour_barchart(data, house){

	d3.selectAll(".bar")
	.style("fill", function(d){

		if (d == data)
		{
			return "red"
		}
		else if (d.address1 == house[0].address1)
		{
			return "yellow"
		}
		else 
		{
			return "steelblue"
		}
	})
}

// function to remove colours from the map
function remove_colour_map(data, house){
	map.selectAll(".marker")
	.style("background-color", function(d){

		if (d.address1 == house[0].address1)
		{
			return "yellow"
		}
		else if (barchart_data.indexOf(d) !== -1)
		{
			return "steelblue"
		}
	})
}

function remove_colour_table(data, house){

	d3.selectAll("tr")
	.style("background-color", "white")


}

// function to remove colours from the scatter
function remove_colour_scatter(data, house){

	d3.selectAll(".scatter-circle")
	.style("fill", function(d){

		if (d.address1 == house[0].address1)
		{
			return "yellow"
		}
		else if (barchart_data.indexOf(d) !== -1)
		{
			return "steelblue"
		}
	})
}

// function to remove colours from the barchart
function remove_colour_barchart(d, house){

	d3.selectAll(".bar")
	.style("fill", function(d){

		if (d.address1 == house[0].address1)
		{
			return "yellow"
		}
		else if (barchart_data.indexOf(d) !== -1)
		{
			return "steelblue"
		}
	})
}


// creates table 
function create_table(data, house){


	if (data.length > 4)
	{
		data.shift()
	}	

	// remove existing table
	d3.selectAll("table")
	.remove()
	
   // create variable for table bar
   var table_bar = d3.select("#table")
   .append("table")
   .attr("class", "table table-hover table-bordered table-lg")

   // create variable for table heads
   var thead = table_bar.append('thead')
   .attr("class", "thead-dark")
   var	tbody = table_bar.append('tbody');


   // create table heads
   thead.append('tr')
   .selectAll('th')
   .data(variables_table).enter()
   .append('th')
   .text(function (column) { return column; });

   // create rows
   	var rows = tbody.selectAll('tr')
		.data(data)
		.enter()
		.append('tr')
		.on("mouseover", function(d){

			colour_table(d, house)
			colour_map(d, house)
			colour_scatter(d, house)
			colour_barchart(d, house)
		})
		.on("mouseout", function(d){

			remove_colour_table(d, house)
			remove_colour_map(d, house)
			remove_colour_scatter(d, house)
			remove_colour_barchart(d, house)
		})

	// create a cell in each row for each column
	var cells = rows.selectAll('td')
	.data(function (row) {
		  return variables_table.map(function (column) {
		  return {column: column, value: row[column]};
		    });
		  })
		  .enter()
		  .append('td')
		  .text(function (d) { return d.value; });


}

// update barchart
function update_barchart(data, svg, variable, houses, house){

	// remove existing barchart
	var bars = svg.selectAll(".bar")
					.remove()
					.exit()
					.data(data)
	var axis = svg.selectAll(".axis")
					.remove()

	var text = svg.selectAll(".bar_text")
					.remove()


	 // format the data
	time_data.length = 0
  	barchart_data.forEach(function(d) {
      time_data.push(parse_time(d.Bouwjaar));
  	});


	// add text for y - axis
	svg_bar.append("text")
	.attr("transform", "translate(-47.5," +  (height_bar+margin_bar.bottom)/2 + ") rotate(-90)")
	.attr("class", "bar_text")
	.text(variable);

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
    
    // add bars to barchart
	svg.selectAll(".bar")
    .data(data)
	.enter().append("rect")
	  .transition().duration(1000)
      .delay(function(d,i){ return i * 50;} )
      .attr("class", "bar")
      .attr("x", function(d) { return x_bar(d.address1); })
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
      	if (d.address1 == house[0].address1)
		{
			return "yellow"
		}
      	else
      	{
      		return "steelblue"
      	}
      })

    d3.selectAll("rect")
    .on("mouseover", function(d){ 

    	// ensure other charts are coloured if mouseover
    	colour_barchart(d, house)
    	colour_map(d, house)
    	colour_scatter(d, house)
    	colour_table(d, house)
    	var target = document.getElementsByClassName("bar")
		tip_bar.show(d, target)

    })
    .on("mouseout", function(d){
    	
    	// ensure colours are removed if mouseout
    	remove_colour_barchart(d, house)
    	remove_colour_map(d, house)
    	remove_colour_scatter(houses, house)
    	remove_colour_table(d, house)
    	tip_bar.hide()
    })
    .on("click", function(d){
    	
    	// ensure bars are removed if clicked on 
    	var index_value_bar = barchart_data.indexOf(d)
    	
    	barchart_data.splice(index_value_bar, 1)
    	update_barchart(barchart_data, svg_bar, currentvariable_bar, houses, house)
    	
    	remove_colour_map(d, house)

    	var index_value_table = table_data.indexOf(d)
    	table_data.splice(index_value_table, 1)
    	create_table(table_data, house)

    })

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


	// add the y Axis
	if (variable != "Bouwjaar")
	{	
	  	svg.append("g")
	  	.attr("class", "axis")
	      .call(d3.axisLeft(y_bar))
	}
	else
	{
		
		svg.append("g")
	  	.attr("class", "axis")
	      .call(d3.axisLeft(y_bar_time))


	}


}

function update_scatter(data, svg, x_variable, y_variable, average_data, house){


	  var circles = svg.selectAll(".scatter-circle")
	  				.remove()
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
	  y_scatter.domain([d3.min(data, function (d){ return d[y_variable]}), 
	  					d3.max(data, function(d) { return d[y_variable]; })]);

	    if (time_data.length > 0)
    	{
	    	x_scatter_time.domain(d3.extent(time_data))
    	}
	      
	  // Add the scatterplot
	  svg.selectAll("dot")
	      .data(data)
	    .enter().append("circle")
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

	      	if (d.address1 == house[0].address1)
			{
				return "yellow"
			}
			else 
			{
				return "grey"
			}
	      })

	svg.selectAll("circle")
	      .on("mouseover", function(d){
	      	colour_map(d, house)
	      	colour_barchart(d, house)
	      	colour_table(d, house)
	      	d3.select(this).style("fill", "red")

	      	var target = document.getElementsByClassName("scatter-circle")
	      	tip_scatter.show(d, target)
	      })
	      .on("mouseout", function(d){
	      	remove_colour_map(d, house)
	      	remove_colour_barchart(d, house)
	      	remove_colour_scatter(data, house)
	      	remove_colour_table(d, house)
	      	tip_scatter.hide()
	      })

	d3.select(".svg-scatter").call(tip_scatter)


	if (x_variable != "Bouwjaar")
	{
		// Add the X Axis if scale is not time
	  svg.append("g")
	  .transition().duration(1000)
	      .attr("transform", "translate(0," + height_scatter + ")")
	      .attr("class", "axis-scatter")
	      .call(d3.axisBottom(x_scatter));
	}
	else
	{
		// Add the X Axis if scale is time 
	  svg.append("g")
	  .transition().duration(1000)
	      .attr("transform", "translate(0," + height_scatter + ")")
	      .attr("class", "axis-scatter")
	      .call(d3.axisBottom(x_scatter_time));
	}
	  

	  // Add the Y Axis
	  svg.append("g")
	  .transition().duration(1000)
	      .attr("class", "axis-scatter")
	      .call(d3.axisLeft(y_scatter));
	 
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
    	return x_scatter(i * adjustment + d3.min(line_data_x))
    	
    	
    })
      .y(function(d){
    	return (y_scatter(d))
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
		.attr('d', curved_line)

	}


function create_buttons(houses, house){

	// create menu to select variable in barchart
  	var button_bar = d3.select("body").append("div")
      .attr("class", "menu-bar")

    // create button for barchart
    button_bar
    .append("button")
      .attr("type", "button")
      .attr("class", "btn btn-primary dropdown-toggle")
      .attr("data-toggle", "dropdown")
      .text("Kies een variabele!")
      .append("span")
      .attr("class", "caret")

    // create dropdown menu when button is pressed
  	var menu_bar = button_bar.append("ul")
      .attr("class", "dropdown-menu")
      .attr("role", "menu")


    // create dropdown menu for button
  	menu_bar.selectAll("li")
      .data(variables_bar)
      .enter().append("li")
          .append("a")
          .attr("class", "m")
          .attr("id", "option_bar")
          .attr("href", "#")
          .text(function(d){ return d})
          .attr("value", function(d){ return d})

    // if option is selected, update graph 
  	var option = d3.selectAll("#option_bar")
    .on("click", function(){
      // get country clicked by user 
      currentvariable_bar = this.getAttribute("value")
      update_barchart(barchart_data, svg_bar, currentvariable_bar, houses, house)
  })


// create menu to select x variable in barchart
  	var button_scatter = d3.select("body").append("div")
      .attr("class", "menu-scatter-x")

    // create button for scatter
    button_scatter
    .append("button")
      .attr("type", "button")
      .attr("id", "scatter")
      .attr("class", "btn btn-primary dropdown-toggle")
      .attr("data-toggle", "dropdown")
      .text("Y-as ")
      .append("span")
      .attr("class", "caret")

    // create dropdown menu when button is pressed
  	var menu_scatter = button_scatter.append("ul")
      .attr("class", "dropdown-menu")
      .attr("role", "menu")


    // create dropdown menu for button
  	menu_scatter.selectAll("li")
      .data(variables_scatter_y)
      .enter().append("li")
          .append("a")
          .attr("class", "m")
          .attr("id", "option_scatter_y")
          .attr("href", "#")
          .text(function(d){ return d})
          .attr("value", function(d){ return d})

    // if option is selected, update graph 
  	var option = d3.selectAll("#option_scatter_y")
    .on("click", function(){
      // get country clicked by user 
      currentvariable_scatter_y = this.getAttribute("value")
      var average_data = prepare_average_data(houses)
      update_scatter(houses, svg_scatter, currentvariable_scatter_x, currentvariable_scatter_y, average_data, house)
  })


  // create menu to select y variable in barchart
  	var button_scatter = d3.select("body").append("div")
      .attr("class", "menu-scatter-y")

    button_scatter
    .append("button")
      .attr("type", "button")
      .attr("id", "scatter")
      .attr("class", "btn btn-primary dropdown-toggle")
      .attr("data-toggle", "dropdown")
      .text("X-as")
      .append("span")
      .attr("class", "caret")

    // create dropdown menu when button is pressed
  	var menu_scatter = button_scatter.append("ul")
      .attr("class", "dropdown-menu")
      .attr("role", "menu")


    // create dropdown menu for button
  	menu_scatter.selectAll("li")
      .data(variables_scatter_x)
      .enter().append("li")
          .append("a")
          .attr("class", "m")
          .attr("id", "option_scatter_x")
          .attr("href", "#")
          .text(function(d){ return d})
          .attr("value", function(d){ return d})

    // if option is selected, update graph 
  	var option = d3.selectAll("#option_scatter_x")
    .on("click", function(){
      // get country clicked by user 
      currentvariable_scatter_x = this.getAttribute("value")
      var average_data = prepare_average_data(houses)
      update_scatter(houses, svg_scatter, currentvariable_scatter_x, currentvariable_scatter_y, average_data, house)
  })



}

// create legend
function create_legend(data){

	// get data for searched house
	labels_legend.push(data.searchString)

	// attach data for legend
	var legend = d3.select("body").append("svg")
	.attr("width", 300)
    .attr("height", 30)
    .attr("class", "legend")
    
    // create circles for legend
	legend.selectAll("circle")
	.data(labels_legend)
	.enter().append("circle")
	  .attr("class", "legend-circle")
      .attr("r", 10)
	  .attr("stroke", "black")
	  .attr("cx", 15)
	  .attr("cy", 15)
	  .style("fill", "yellow")

	 // create text for legend
	legend.selectAll("text")
	.data(labels_legend)
	.enter().append("text")
	.attr("class", "legend-text")
    .attr("transform", "translate(30, 20)")
    .text(function(d){return d})
      
}


// initialize creation of charts 
function initialize_charts (error, houses, house){

	// attach data to house markers
	map.selectAll(".marker")
	.data(houses)
	.on("click", function(d){

		// colour house 
		colour_map(d, house)

		// update table and barchart
		if (barchart_data.indexOf(d) == -1)
		{	
			barchart_data.push(d)
			table_data.push(d) 

			update_barchart(barchart_data, svg_bar, currentvariable_bar, houses, house)
			create_table(table_data, house)

		}
	})
	.on("mouseover", function(d, i){

		// colour other charts if mouseover 
		colour_map(d, house)
		colour_barchart(d, house)
		colour_scatter(d, house)
		colour_table(d, house)
		
	})
	.on("mouseout", function(d){

		// cremove colours if mouseout
		remove_colour_barchart(d, house)
		remove_colour_map(d, house)
		remove_colour_scatter(houses, house)
		remove_colour_table(d, house)

	})

	// prepare data for moving average line
	average_data = prepare_average_data(houses)	

	// functions to create initial map
	create_buttons(houses, house)
	update_barchart(barchart_data, svg_bar, currentvariable_bar, houses, house)
	update_scatter(houses, svg_scatter, currentvariable_scatter_x, currentvariable_scatter_y, average_data, house)
	create_legend(house[0])
	create_table(table_data, house)
	



	} 

	


}