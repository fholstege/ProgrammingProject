/*****

* Name: Floris Holstege
* Student ID: 12002151

File that ensures all necessary functions are called on.

*****/


window.onload = function(d){

// default settings
amplify.store("changed_map", false)
amplify.store("changed_data", false)

// get the HTML doc from the Iframe
var doc = document.getElementById("map_frame").contentDocument
map = d3.select(doc)

// ensure question buttons are activated
$('[data-toggle="popover"]').popover();

// create loadscreen
var loadscreen = d3.select("body").append("div")
	.attr("class", "loadscreen")
	.style("display", "inline")
	.style("color","grey")
	.style("opacity", 0.5)

// create static parts of charts
initialize_charts()

// ensure address is taken from the user
d3.select("#submitbutton")
.on("click", function(){

	// tell user that address is searched
	loadscreen
	.style("display", "inline")
	.style("color", "grey")
	.text("Adres opzoeken...")

	// Don't display the visualisation while new one is loading. 
	 d3.selectAll("#firstrow, #secondrow")
	 .style("display","none")

	// get address
	var address = $("#entry").val()

	// splice address for API call
	for (var i = 0; i < address.length; i++)
     	{
            if (address[i] === " ")
            {
                address = address.splice(i,1, "%20")
            }
        }

    // get data based on address
    get_data(address)
})

// after getAddress is finished, call get_data
function get_data(address){

		// get token
        $.getJSON("http://198.211.122.91/plumber/houseAvailable?fullAddress=" + address, function(data) {

        		// tell user data is being retrieved
                loadscreen
				.text("Data ophalen...")

				// if no data, alert the user.
				if (data.available == false)
				{
					loadscreen
					.text("Huis niet in database")
					.style("color","red")
				}

                // use token to get data for address
                var token = data.token
                var houses = axios.get(`http://198.211.122.91/${token}neighbours.json`);


                // if data is returned
                houses.then(function(result){

                	// store data for the map
                    var neighbours = result.data
                    amplify.store("neighbours", neighbours);

                    // tell map data is changed
                    amplify.store("changed_data", true)

                    	// workaround to make this HTML respond to events on other HTML
                    	// check if map as changed. If yes, change charts
						var check_chart = setInterval(function(){

							if (amplify.store("changed_map") == true)
							{
								update_charts(neighbours)
								amplify.store("changed_map", false)
								clearInterval(check_chart);

							}
						}, 5000)
                    })

        // if no address, tell user address not found
        }).fail(function(d) {

                loadscreen
				.text("Adres niet gevonden")
				.style("color","red")
            })

    }

// update charts
function update_charts(houses){

	// remove old data
	table_data.length = 0
	barchart_data.length = 0

	// attach data to house markers
	map.selectAll(".marker")
	.data(houses)
	.on("click", function(d){

		// colour house
		colour_map(d)

		// update table and barchart
		if (table_data.indexOf(d) == -1)
		{
			table_data.push(d)
			update_table(table_data)
		}

		// update table and barchart
		if (barchart_data.indexOf(d) == -1)
		{
			barchart_data.push(d)
			update_barchart(barchart_data, svg_bar, currentvariable_bar, houses)

		}
	})
	.on("mouseover", function(d, i){

		// colour other charts if mouseover
		colour_map(d)
		colour_barchart(d)
		colour_scatter(d)
		colour_table(d)

		d3.select(this)
		.style("width", 40 + "px")
    	.style("height", 40 + "px");



	})
	.on("mouseout", function(d){

		// cremove colours if mouseout
		remove_colour_barchart(d)
		remove_colour_map(d)
		remove_colour_scatter(houses)
		remove_colour_table(d)

		d3.select(this)
		.style("width", 20 + "px")
    	.style("height", 20 + "px");


	})

	var labels_legend;

	houses.forEach(function(d){

		if (d.searched_house == true)
		{
			// get data for searched house
			labels_legend = d.searchString
		}
	})

	// change title
	d3.select("h1")
	.text("Analyse van " + String(labels_legend))

	// change legend
	text_legend
    .text(labels_legend)

        // if option is selected, update graph
  	var option_bar = d3.selectAll("#option_bar")
    .on("click", function(){
      // get country clicked by user
      currentvariable_bar = this.getAttribute("value")
      update_barchart(barchart_data, svg_bar, currentvariable_bar, houses)
  })


     // if option is selected, update graph
  	var option_y = d3.selectAll("#option_scatter_y")
    .on("click", function(){
      // get country clicked by user
      currentvariable_scatter_y = this.getAttribute("value")
      var average_data = prepare_average_data(houses)
      update_scatter(houses, svg_scatter, currentvariable_scatter_x, currentvariable_scatter_y, average_data)
  })

        // if option is selected, update graph
  	var option_x = d3.selectAll("#option_scatter_x")
    .on("click", function(){
      // get country clicked by user
      currentvariable_scatter_x = this.getAttribute("value")
      var average_data = prepare_average_data(houses)
      update_scatter(houses, svg_scatter, currentvariable_scatter_x, currentvariable_scatter_y, average_data)
  })


	// prepare data for moving average line
	average_data = prepare_average_data(houses)

	// update charts
	update_barchart(barchart_data, svg_bar, currentvariable_bar, houses)
	update_scatter(houses, svg_scatter, currentvariable_scatter_x, currentvariable_scatter_y, average_data)
	update_table(table_data)

	loadscreen.transition().duration(2000)
	.style("display","none")

	d3.selectAll("#firstrow, #secondrow")
   .style("display","block")

}

}
