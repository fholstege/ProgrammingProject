
// define parameters of barchart
var margin_bar = {top: 20, right: 20, bottom: 160, left: 50},
    width_bar = 600 - margin_bar.left - margin_bar.right,
    height_bar = 400 - margin_bar.top - margin_bar.bottom;


var barchart_data = []

window.onload = function(d){


var doc = document.getElementById("map_frame").contentDocument
var map = d3.select(doc)

// set the ranges of the barchart
var x_bar = d3.scaleBand()
          .range([0, width_bar])
          .padding(0.1);
var y_bar = d3.scaleLinear()
          .range([height_bar, 0]);

var q = d3.queue()
    .defer(d3.json, "../Data/NicolaasRuychaverstraatUtrecht784362neighboorsdatatest.json")
    .await(initialize_charts);

function update_barchart(data, svg){

	var bars = svg.selectAll(".bar")
					.remove()
					.exit()
					.data(data)
	var axis = svg.selectAll(".axis")
					.remove()

	// Scale the range of the data in the domains
    x_bar.domain(data.map(function(d) { return d.address_full; }));
    y_bar.domain([0, d3.max(data, function(d) { return d.woonoppervlak; })]);	

	svg.selectAll(".bar")
    .data(data)
	.enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x_bar(d.address_full); })
      .attr("width", x_bar.bandwidth())
      .attr("y", function(d) { return y_bar(d.woonoppervlak); })
      .attr("height", function(d) { return height_bar - y_bar(d.woonoppervlak); })

    // add the x Axis
  	svg.append("g")
  	.attr("class", "axis")
      .attr("transform", "translate(0," + height_bar + ")")
      .call(d3.axisBottom(x_bar))
      .selectAll("text")
	    .attr("y", 0)
	    .attr("x", 9)
	    .attr("dy", ".35em")
	    .attr("transform", "rotate(90)")
	    .style("text-anchor", "start");

	// add the y Axis
  	svg.append("g")
  	.attr("class", "axis")
      .call(d3.axisLeft(y_bar))

}


function initialize_charts (error, houses){

	map.selectAll(".marker")
	.data(houses)
	.on("click", function(d){

		if (barchart_data.indexOf(d) == -1)
		{
			barchart_data.push(d) 
			update_barchart(barchart_data, svg_bar)
			console.log(barchart_data.length)
		}
	})

	// create svg for the barchart 
	var svg_bar = d3.select("body").append("svg")
    .attr("width", width_bar + margin_bar.left + margin_bar.right)
    .attr("height", height_bar + margin_bar.top + margin_bar.bottom)
  	.append("g")
    .attr("transform", 
          "translate(" + margin_bar.left + "," + margin_bar.top + ")");

	svg_bar.append("text")
	.attr("transform", "translate(-35," +  (height_bar+margin_bar.bottom)/2 + ") rotate(-90)")
	.text("Woonoppervlak");




	} 

	


}