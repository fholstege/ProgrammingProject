
// define parameters of the map
var adjustment = 0.05
var zoom_map = 15

mapboxgl.accessToken = "pk.eyJ1IjoiZmhvbHN0ZWdlIiwiYSI6ImNqYzV6cnE0bTFmd2oycXFzam1hMXRnOGMifQ.WCni1XErq-siMq4Tk0JljQ";

window.onload = function(d){

// check if data has changed
var check_map = setInterval(function(){

	// if data has changed, change the map 
	if (amplify.store("changed_data") == true)
	{	
		var houses = amplify.store("neighbours")
		makemap(houses)
		amplify.store("changed_data", false)
		amplify.store("changed_map", true)

	}
}, 5000)

// Create the map 
function makemap(houses){

	var coordinates;
	var address_searched_house; 

	// remove previous map
	d3.select("#map").remove()

	// add div for the map 
	d3.select("body").append("div")
	.attr("id","map")

	houses.forEach(function(d){

		if (d["searched_house"] == true)
		{
		  	coordinates = [d.lon, d.lat]
		  	address_searched_house = d.address1
		}
	})

	// set bounds of the map 
	var bounds = [
	[coordinates[0] - adjustment, coordinates[1] - adjustment],
	[coordinates[0] + adjustment, coordinates[1] + adjustment]];

	// create map 
	var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/light-v9',
	center: coordinates,
	zoom: zoom_map,
	maxBounds: bounds
	});

	// disable zooming through scrolling, but add navigator for zooming. 
	map.scrollZoom.disable()
	map.addControl(new mapboxgl.NavigationControl());

	// add houses to the map
	houses.forEach(function(marker) {
	  	 // create a HTML element for house 
	  	 var el = document.createElement('div');
	  	 el.className = 'marker';

	  	 var popup = new mapboxgl.Popup()
	  	 .setText(marker.address1)

	  	 // make a marker and add to the map
	  	 new mapboxgl.Marker(el)
	  	 .setLngLat([marker.lon, marker.lat])
	  	 .setPopup(popup)
	  	 .addTo(map);

		})

	d3.selectAll(".marker")
	.data(houses)
	.style("background-color", function(d){

		if (d.address1 == address_searched_house)
		{
			return "yellow"
		}
	})
	

    }

}

	  	







