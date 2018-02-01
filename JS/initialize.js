/*****

* Name: Floris Holstege
* Student ID: 12002151

Defines certain functions needed to initialize the charts. 

*****/


// define accessible variables for buttons
var variables_scatter_x = ["woonoppervlak", "Vraagprijs", "Prijs per m2", "Bouwjaar"]
var variables_scatter_y = ["woonoppervlak", "Aantal kamers", "Vraagprijs", "Prijs per m2"]
var variables_bar = ["woonoppervlak", "Aantal kamers", "Vraagprijs", "Prijs per m2", "Bouwjaar"]


// create a legend
function create_legend(){

	// create legend div
	legend = d3.select("#map").append("svg")
	.attr("width", 300)
	.attr("height", 30)
	.attr("class", "legend")

	 // create circles for legend
	legend.append("circle")
	  .attr("class", "legend-circle")
      .attr("r", 10)
	  .attr("stroke", "black")
	  .attr("cx", 35)
	  .attr("cy", 15)
	  .style("fill", "yellow")

	 // create text for legend
	text_legend = legend.append("text")
	.attr("class", "legend-text")
    .attr("transform", "translate(50, 20)")
}


// create the buttons of the page that need interactivity 
// buttons that don't require interactivity are defined in the html page
function create_buttons(){

	// create menu to select variable in barchart
  	var button_bar = d3.select("#barchart").append("div")
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
          .text(function(d){ return d})
          .attr("value", function(d){return d})


// create menu to select y variable in barchart
  	var button_scatter_y = d3.select("#secondrow").append("div")
      .attr("class", "dropup")
      .attr("id", "menu-scatter-y")

    // create button for scatter
    button_scatter_y
    .append("button")
      .attr("type", "button")
      .attr("id", "scatter")
      .attr("class", "btn btn-primary dropdown-toggle")
      .attr("data-toggle", "dropdown")
      .attr("aria-haspopup","true")
      .attr("aria-expanded","false")
      .text("Y-as ")
      .append("span")
      .attr("class", "caret")

    // create dropdown menu when button is pressed
  	var menu_scatter_y = button_scatter_y.append("ul")
      .attr("class", "dropdown-menu")
      .attr("role", "menu")


    // create dropdown menu for button
  	menu_scatter_y.selectAll("li")
      .data(variables_scatter_y)
      .enter().append("li")
          .append("a")
          .attr("class", "m")
          .attr("id", "option_scatter_y")
          .attr("href", "#bottom")
          .text(function(d){ return d})
          .attr("value", function(d){ return d})


  // create menu to select y variable in barchart
  	var button_scatter_x = d3.select("#secondrow").append("div")
      .attr("class", "dropup")
      .attr("id", "menu-scatter-x")

    button_scatter_x
    .append("button")
      .attr("type", "button")
      .attr("id", "scatter")
      .attr("class", "btn btn-primary dropdown-toggle")
      .attr("data-toggle", "dropdown")
      .text("X-as ")
      .append("span")
      .attr("class", "caret")

    // create dropdown menu when button is pressed
  	var menu_scatter_x = button_scatter_x.append("ul")
      .attr("class", "dropdown-menu")
      .attr("role", "menu")


    // create dropdown menu for button
  	menu_scatter_x.selectAll("li")
      .data(variables_scatter_x)
      .enter().append("li")
          .append("a")
          .attr("class", "m")
          .attr("id", "option_scatter_x")
          .attr("href", "#bottom")
          .text(function(d){ return d})
          .attr("value", function(d){ return d})


}



// initialize creation of charts
function initialize_charts (){

	// create initial title
	d3.select("#title")
	.append("h1")
	.attr("class", "title")
	.text("Analyse van huizen")

	// functions to create initial map
   	draw_barchart()
   	draw_scatter()
   	draw_table()
   	create_legend()
	create_buttons()

   // not show charts
   d3.selectAll("#firstrow, #secondrow")
   .style("display", "none")


}