/*****

* Name: Floris Holstege
* Student ID: 12002151

Creates the table, and defines update function. 

*****/

// define variables depicted in table
var variables_table = ["address1", "Soort Appartement","Tuin", "Soort Dak", "Isolatie", "Energielabel"]
var table_data = []

// function to create static elements of table
function draw_table(){

	// create variable for table bar
   table = d3.select("#table")
   .append("table")
   .attr("class", "table table-hover table-bordered table-lg")

   // create variable for table heads
   table.append('thead')
   .attr("class", "thead-inverse")

   table.append('tbody');

    // create table heads
   d3.select("thead").append("tr")
   .selectAll('th')
   .data(variables_table).enter()
   .append('th')
   .text(function (column) { return column; });

}


// creates table
function update_table(data){

	// if more than four entries, shift to not make table too long
	if (data.length > 4)
	{
		data.shift()
	}


	// attach data to rows
    var rows = d3.select("tbody").selectAll('tr')
		.data(data)

	// attach data to cells
	var cells = rows.selectAll('td')
	.data(function (row) {
		  return variables_table.map(function (column) {
		  return {column: column, value: row[column]};
		    });
		  })
	
	// remove old cells
	cells.exit()
	.remove()

	// remove old rows
	rows.exit()
	.style("opacity", 0.2)
	.transition()
	.duration(300)
	.remove()

	// create new rows
	var new_rows = rows
	.enter().append('tr')
        .selectAll('td')
        .data(function (row) {

		  return variables_table.map(function (column) {
		  return {column: column, value: row[column]};
		    });
		  })

    // attach cells to new rows
    new_rows
    .enter().append("td")
    .text(function (d) {

		  	if (d.value == "undefined" || d.value == "NA" || d.value == undefined)
		  	{
		  		return "-"
		  	}
		  	else
		  	{
		  		return d.value;
		  	}
		  })

    // ensure transition 
    cells
    .transition().duration(500)
    .text(function (d) {

    		// return "-" if no data found
		  	if (d.value == "undefined" || d.value == "NA" || d.value == undefined)
		  	{
		  		return "-"
		  	}
		  	else
		  	{
		  		return d.value;
		  	}
		  })

	// ensure interactivity
	d3.select("tbody").selectAll("tr")
		.on("mouseover", function(d){

			// on mouseover, colour other charts
			colour_table(d)
			colour_map(d)
			colour_scatter(d)
			colour_barchart(d)
		})
		.on("mouseout", function(d){

			// remove colour of other charts
			remove_colour_table(d)
			remove_colour_map(d)
			remove_colour_scatter(d)
			remove_colour_barchart(d)
		})
		.on("click", function(d){

			// update table if clicked on
			var index_value_table = table_data.indexOf(d)
	    	table_data.splice(index_value_table, 1)
	    	update_table(table_data)
		})

}