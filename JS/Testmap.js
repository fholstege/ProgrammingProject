
// define parameters of barchart
var margin_bar = {top: 50, right: 60, bottom: 120, left: 60},
    width_bar = 700 - margin_bar.left - margin_bar.right,
    height_bar = 400 - margin_bar.top - margin_bar.bottom;

// define parameters of the scatterplot

// set the dimensions and margins of the graph
var margin_scatter = {top: 20, right: 20, bottom: 60, left: 80},
    width_scatter = 600 - margin_scatter.left - margin_scatter.right,
    height_scatter = 400 - margin_scatter.top - margin_scatter.bottom;


var barchart_data = []
var variables_bar = ["woonoppervlak", "Aantal kamers", "real_price", "Prijs per m2"]
var currentvariable_bar = "woonoppervlak"
var currentvariable_scatter_y = "real_price"
var currentvariable_scatter_x = "woonoppervlak"
var variables_table = ["address1", "locality", "Soort.appartement","Tuin", "Soort.dak", "Isolatie", "Energielabel"]
var table_data = []
var line_data_x = []
var line_data_y = []
var average_data;


function moving_average(data, neighbors) {
  return data.map((val, idx, arr) => {
    let start = Math.max(0, idx - neighbors), 
        end = idx + neighbors
    let subset = arr.slice(start, end + 1)
    let sum = subset.reduce((a,b) => a + b)
    return sum / subset.length
  })
}

function prepare_average_data(data){
	line_data_x.length = 0
	line_data_y.length = 0
	var line_data = []

	data.forEach(function(d){

		line_data.push({"x": d[currentvariable_scatter_x], "y":d[currentvariable_scatter_y]})
	})

	
	line_data.sort(function(a, b) {
    return parseFloat(a.x) - parseFloat(b.x);
	});

	line_data.forEach(function(d){

		line_data_x.push(d.x)
		line_data_y.push(d.y)
	})

	var average_data = moving_average(line_data_y, 1)
	return average_data
}


window.onload = function(d){


var doc = document.getElementById("map_frame").contentDocument
var map = d3.select(doc)

// set the ranges of the barchart
var x_bar = d3.scaleBand()
          .range([0, width_bar])
          .padding(0.1);
var y_bar = d3.scaleLinear()
          .range([height_bar, 0]);

// set the ranges of the scatterplot 
var x_scatter = d3.scaleLinear().range([0, width_scatter]);
var y_scatter = d3.scaleLinear().range([height_scatter, 0]);



// create svg for the barchart 
	var svg_bar = d3.select("body").append("svg")
    .attr("width", width_bar + margin_bar.left + margin_bar.right)
    .attr("height", height_bar + margin_bar.top + margin_bar.bottom)
  	.append("g")
    .attr("transform", 
          "translate(" + margin_bar.left + "," + margin_bar.top + ")");

// create svg for the scatterplot 
	var svg_scatter = d3.select("body").append("svg")
	.attr("width", width_scatter + margin_scatter.left + margin_scatter.right)
    .attr("height", height_scatter + margin_scatter.top + margin_scatter.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin_scatter.left + "," + margin_scatter.top + ")");

var q = d3.queue()
    .defer(d3.json, "../Data/NicolaasRuychaverstraatUtrecht784362neighboorsdatatest.json")
    .await(initialize_charts);

function colour_map(data){
	map.selectAll(".marker")
	.style("background-color", function(d){

		if (d == data)
		{
			return "red"
		}
		else if (barchart_data.indexOf(d) !== -1)
		{
			return "steelblue"
		}
	})
}

function colour_scatter(data){
	d3.selectAll("circle")
		.style("fill", function(d){

			if (d == data)
			{
				return "red"
			}
			else if (barchart_data.indexOf(d) !== -1)
			{
				return "steelblue"
			}
		})
	}



function colour_barchart(data){

	d3.selectAll(".bar")
	.style("fill", function(d){

		if (d == data)
		{
			return "red"
		}
	})
}

function remove_colour_map(data){
	map.selectAll(".marker")
	.style("background-color", function(d){

		if (barchart_data.indexOf(d) !== -1)
		{
			return "steelblue"
		}
	})
}

function remove_colour_scatter(data){

	d3.selectAll("circle")
	.style("fill", function(d){

		if (barchart_data.indexOf(d) !== -1)
		{
			return "steelblue"
		}
	})
}

function remove_colour_barchart(d){

	d3.selectAll(".bar")
	.style("fill", function(d){

		if (barchart_data.indexOf(d) !== -1)
		{
			return "steelblue"
		}
	})
}


function create_table(data){


	d3.selectAll("table")
	.remove()
	

   var table_bar = d3.select("body")
   .append("table")
   .attr("class", "table table-hover table-bordered table-sm")

   var thead = table_bar.append('thead')
   .attr("class", "thead-dark")
   var	tbody = table_bar.append('tbody');


   thead.append('tr')
   .selectAll('th')
   .data(variables_table).enter()
   .append('th')
   .text(function (column) { return column; });

   	var rows = tbody.selectAll('tr')
		.data(data)
		.enter()
		.append('tr');

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

function update_barchart(data, svg, variable, houses){

	var bars = svg.selectAll(".bar")
					.remove()
					.exit()
					.data(data)
	var axis = svg.selectAll(".axis")
					.remove()

	var text = svg.selectAll(".bar_text")
					.remove()

	
	svg_bar.append("text")
	.attr("transform", "translate(-47.5," +  (height_bar+margin_bar.bottom)/2 + ") rotate(-90)")
	.attr("class", "bar_text")
	.text(variable);

	// Scale the range of the data 
    x_bar.domain(data.map(function(d) { return d.address1; }));
    y_bar.domain([0, d3.max(data, function(d) { return d[variable]; })]);


	svg.selectAll(".bar")
    .data(data)
	.enter().append("rect")
	  .transition().duration(1000)
      .delay(function(d,i){ return i * 50;} )
      .attr("class", "bar")
      .attr("x", function(d) { return x_bar(d.address1); })
      .attr("width", x_bar.bandwidth())
      .attr("y", function(d) { return y_bar(d[variable]); })
      .attr("height", function(d) { 

      	return height_bar - y_bar(d[variable]); })

    d3.selectAll("rect")
    .on("mouseover", function(d){ 

    	d3.select(this).style("fill", "red")
    	colour_map(d)
    	colour_scatter(d)

    })
    .on("mouseout", function(d){

    	d3.select(this).style("fill", "steelblue")
    	remove_colour_map(d)
    	remove_colour_scatter(houses)
    })
    .on("click", function(d){
    	
    	var index_value = barchart_data.indexOf(d)
    	barchart_data.splice(index_value,3)
    	update_barchart(barchart_data, svg_bar, currentvariable_bar, houses)
    	remove_colour_map(d)

    })

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
  	svg.append("g")
  	.attr("class", "axis")
      .call(d3.axisLeft(y_bar))

}

function update_scatter(data, svg, x_variable, y_variable, average_data){


	  var circles = svg.selectAll("circle")
	  				.remove()
	  var axis = svg.selectAll(".axis-scatter")
					.remove()
	  var text = svg.selectAll(".scatter-text")
					.remove()
	  svg.selectAll(".avg")
	  				.remove()

	  // Scale the range of the data
	  x_scatter.domain(d3.extent(data, function(d) { return d[x_variable]; }));
	  y_scatter.domain([0, d3.max(data, function(d) { return d[y_variable]; })]);
	      
	  // Add the scatterplot
	  svg.selectAll("dot")
	      .data(data)
	    .enter().append("circle")
	    .transition().duration(1000)
	      .attr("class", "scatter-circle")
	      .attr("r", 5)
	      .attr("stroke", "black")
	      .attr("cx", function(d) { return x_scatter(d[x_variable]); })
	      .attr("cy", function(d) { return y_scatter(d[y_variable]); })

	svg.selectAll("circle")
	      .on("mouseover", function(d){
	      	colour_map(d)
	      	colour_barchart(d)
	      	d3.select(this).style("fill", "red")
	      })
	      .on("mouseout", function(d){
	      	remove_colour_map(d)
	      	remove_colour_barchart(d)
	      	remove_colour_scatter(data)
	      })

	  // Add the X Axis
	  svg.append("g")
	  .transition().duration(1000)
	      .attr("transform", "translate(0," + height_scatter + ")")
	      .attr("class", "axis-scatter")
	      .call(d3.axisBottom(x_scatter));

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
    	
    	console.log(i * adjustment + d3.min(line_data_x))
    	console.log(adjustment)
    	console.log(i)
    	console.log(d3.min(line_data_x))
    
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


function create_buttons(houses){

	// create menu to select variable in barchart
  	var button_bar = d3.select("body").append("div")
      .attr("class", "menu-bar")

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
      update_barchart(barchart_data, svg_bar, currentvariable_bar, houses)
  })


// create menu to select x variable in barchart
  	var button_scatter = d3.select("body").append("div")
      .attr("class", "menu-scatter-x")

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
      .data(variables_bar)
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
      update_scatter(houses, svg_scatter, currentvariable_scatter_x, currentvariable_scatter_y, average_data)
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
      .data(variables_bar)
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
      update_scatter(houses, svg_scatter, currentvariable_scatter_x, currentvariable_scatter_y, average_data)
  })



}



function initialize_charts (error, houses){

	map.selectAll(".marker")
	.data(houses)
	.on("click", function(d){

		d3.select(this).style("background-color", "steelblue");

		if (barchart_data.indexOf(d) == -1)
		{
			barchart_data.push(d)
			table_data.push(d) 
			update_barchart(barchart_data, svg_bar, currentvariable_bar, houses)
			create_table(table_data)

		}
	})
	.on("mouseover", function(d){

		colour_map(d)
		colour_barchart(d)
		colour_scatter(d)
	})
	.on("mouseout", function(d){

		remove_colour_barchart(d)
		remove_colour_map(d)
		remove_colour_scatter(houses)

	})

	var average_data = prepare_average_data(houses)
	create_buttons(houses)
	update_barchart(barchart_data, svg_bar, currentvariable_bar, houses)
	update_scatter(houses, svg_scatter, currentvariable_scatter_x, currentvariable_scatter_y, average_data)
	






	} 

	


}