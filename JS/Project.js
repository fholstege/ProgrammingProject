
var adjustment = 0.05
var zoom_map = 15
mapboxgl.accessToken = "pk.eyJ1IjoiZmhvbHN0ZWdlIiwiYSI6ImNqYzV6cnE0bTFmd2oycXFzam1hMXRnOGMifQ.WCni1XErq-siMq4Tk0JljQ";


window.onload = function(d){

	// add div for the map 
	d3.select("body").append("div")
	.attr("id","map")



	// load in datasets 
	var q = d3.queue()
	.defer(d3.json, "../Data/NicolaasRuychaverstraatUtrecht784362housedatatest.json")
    .defer(d3.json, "../Data/NicolaasRuychaverstraatUtrecht784362neighboorsdatatest.json")
    .await(makemap);

    // Create the map 
	function makemap(error, house, houses){
	  if (error) throw error;

	  // get coordinates of the searched house
	  var coordinates = [house[0].lon, house[0].lat]

	  // set bounds of the map 
	  var bounds = [
	    [coordinates[0] - adjustment, coordinates[1] - adjustment], // Southwest coordinates
	    [coordinates[0] + adjustment, coordinates[1] + adjustment]  // Northeast coordinates
		];

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

	  	 // make a marker and add to the map
	  	 new mapboxgl.Marker(el)
	  	 .setLngLat([marker.lon, marker.lat])
	  	 .addTo(map);

		})



	d3.selectAll(".marker")
	.data(houses)
	.style("background-color", function(d){

		if (d.address1 == house[0].address1)
		{
			return "yellow"
		}
	})
		
	

	}

}

	  	







