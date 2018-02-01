/*****

* Name: Floris Holstege
* Student ID: 12002151

Javascript file for the map

*****/

// define parameters of the map
var adjustment = 0.05;
var zoom_map = 15;

// access token for mapbox API
mapboxgl.accessToken = "pk.eyJ1IjoiZmhvbHN0ZWdlIiwiYSI6ImNqYzV6cnE0bTFmd2oycXFzam1hMXRnOGMifQ.WCni1XErq-siMq4Tk0JljQ";


window.onload = function(d){

// check if data has changed
var check_map = setInterval(function(){

	// workaround to make this HTML respond to events on HTML of visualisation.
	// if data has changed, change the map
	if (amplify.store("changed_data") == true)
	{
		var houses = amplify.store("neighbours")
		makemap(houses)
		amplify.store("changed_data", false)
		amplify.store("changed_map", true)

		// check if possible to clear interval

	}
}, 5000)

// Create the map
function makemap(houses){

	// create variables for coordinates and address of searched house
	var coordinates;
	var address_searched_house;

	// remove previous map
	d3.select("#map").remove()

	// add div for the new map
	d3.select("body").append("div")
	.attr("id","map")

	// check which house is searched by the user
	houses.forEach(function(d){

		if (d["searched_house"] == true)
		{
			// get coordinates and address of searched house
		  	coordinates = [d.lon, d.lat];
		  	address_searched_house = d.address1;
		}
	})

	// set bounds of the map
	var bounds = [
	[coordinates[0] - adjustment, coordinates[1] - adjustment],
	[coordinates[0] + adjustment, coordinates[1] + adjustment]];

	// create new map
	var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/light-v9",
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
	  	 var el = document.createElement("div");
	  	 el.className = "marker";

	  	 // define text for popup
	  	 var popup = new mapboxgl.Popup()
	  	 .setText(marker.address1)

	  	 // make a marker and add to the map
	  	 new mapboxgl.Marker(el)
	  	 .setLngLat([marker.lon, marker.lat])
	  	 .setPopup(popup)
	  	 .addTo(map);

		})

	// colour house that is searched
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
