
// define parameters of barchart
var margin_bar = {top: 50, right: 40, bottom: 120, left: 60},
    width_bar = 600 - margin_bar.left - margin_bar.right,
    height_bar = 400 - margin_bar.top - margin_bar.bottom;


var barchart_data = []
var variables_bar = ["woonoppervlak", "Aantal kamers", "real_price", "Prijs per m2"]
var currentvariable_bar = "woonoppervlak"
var variables_table = ["address1", "locality", "Soort.appartement","Tuin", "Soort.dak", "Isolatie", "Energielabel"]
var table_data = []


window.onload = function(d){


var doc = document.getElementById("map_frame").contentDocument
var map = d3.select(doc)

// set the ranges of the barchart
var x_bar = d3.scaleBand()
          .range([0, width_bar])
          .padding(0.1);
var y_bar = d3.scaleLinear()
          .range([height_bar, 0]);

// create svg for the barchart 
	var svg_bar = d3.select("body").append("svg")
    .attr("width", width_bar + margin_bar.left + margin_bar.right)
    .attr("height", height_bar + margin_bar.top + margin_bar.bottom)
  	.append("g")
    .attr("transform", 
          "translate(" + margin_bar.left + "," + margin_bar.top + ")");

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
			console.log("hallo")
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
   .attr("class", "table table-hover table-bordered")

   var thead = table_bar.append('thead')
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

function update_barchart(data, svg, variable){

	console.log(data)
	console.log("TEST")

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

    })
    .on("mouseout", function(d){

    	d3.select(this).style("fill", "steelblue")
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


function create_buttons(){

	// create menu to select variable in barchart
  	var button_bar = d3.select("body").append("div")
      .attr("class", "menu")

    button_bar
    .append("button")
      .attr("type", "button")
      .attr("class", "btn btn-primary dropdown-toggle")
      .attr("data-toggle", "dropdown")
      .text("Kies een variabele!")
      .append("span")
      .attr("class", "caret")

    // create dropdown menu when button is pressed
  	var menu = button_bar.append("ul")
      .attr("class", "dropdown-menu")
      .attr("role", "menu")


    // create dropdown menu for button
  	menu.selectAll("li")
      .data(variables_bar)
      .enter().append("li")
          .append("a")
          .attr("class", "m")
          .attr("href", "#")
          .text(function(d){ return d})
          .attr("value", function(d){ return d})

    // if option is selected, update graph 
  	var option = d3.selectAll(".m")
    .on("click", function(){
      // get country clicked by user 
      currentvariable_bar = this.getAttribute("value")
      update_barchart(barchart_data, svg_bar, currentvariable_bar)

      
    })
}


function initialize_charts (error, houses){

	console.log(houses)

	map.selectAll(".marker")
	.data(houses)
	.on("click", function(d){

		d3.select(this).style("background-color", "steelblue");

		if (barchart_data.indexOf(d) == -1)
		{
			barchart_data.push(d)
			table_data.push(d) 
			update_barchart(barchart_data, svg_bar, currentvariable_bar)
			create_table(table_data)

		}
	})
	.on("mouseover", function(d){

		colour_map(d)
		colour_barchart(d)
	})
	.on("mouseout", function(d){

		remove_colour_map(d)
		remove_colour_barchart(d)

	})


	create_buttons(houses)
	update_barchart(barchart_data, svg_bar, currentvariable_bar)






	} 

	


}