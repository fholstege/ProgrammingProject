var variables_table = ["address1", "Soort Appartement","Tuin", "Soort Dak", "Isolatie", "Energielabel"]
var table_data = []


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

	if (data.length > 4)
	{
		data.shift()
	}


    var rows = d3.select("tbody").selectAll('tr')
		.data(data)



	var cells = rows.selectAll('td')
	.data(function (row) {

		  return variables_table.map(function (column) {
		  return {column: column, value: row[column]};
		    });
		  })
	

	cells.exit()
	.remove()

	rows.exit()
	.style("opacity", 0.2)
	.transition()
	.duration(300)
	.remove()

	var new_cells = rows
	.enter().append('tr')
        .selectAll('td')
        .data(function (row) {

		  return variables_table.map(function (column) {
		  return {column: column, value: row[column]};
		    });
		  })

    new_cells
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

    cells
    .transition().duration(500)
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

	
	d3.select("tbody").selectAll("tr")
		.on("mouseover", function(d){

			colour_table(d)
			colour_map(d)
			colour_scatter(d)
			colour_barchart(d)
		})
		.on("mouseout", function(d){

			remove_colour_table(d)
			remove_colour_map(d)
			remove_colour_scatter(d)
			remove_colour_barchart(d)
		})
		.on("click", function(d){
			var index_value_table = table_data.indexOf(d)
	    	table_data.splice(index_value_table, 1)
	    	update_table(table_data)
		})

}