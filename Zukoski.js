/*	Laura Zukoski 
	Project 3 - Google Maps Web Service
	Web and Distributed Programming
	Fall 2015*/

	
// Call init function on load	
function init() {

	
	// style = [] list that contains the styling for the google map api
	// Creative common license
	style = [
		{
			"featureType": "landscape",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"color": "#e7cd79"
				},
				{
					"weight": 0.1
				}
			]
		},
		{
			"featureType": "water",
			"stylers": [
				{
					"visibility": "simplified"
				},
				{
					"color": "#282828"
				}
			]
		},
		{
			"featureType": "landscape.natural.landcover",
			"elementType": "geometry",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"color": "#d6bc68"
				}
			]
		},
		{
			"featureType": "administrative.locality",
			"elementType": "geometry",
			"stylers": [
				{
					"visibility": "off"
				},
				{
					"color": "#d6bc68"
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"color": "#d6bc68"
				}
			]
		},
		{
			"featureType": "poi",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"color": "#d6bc68"
				}
			]
		},
		{
			"featureType": "transit.station.airport",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"visibility": "off"
				},
				{
					"color": "#d6bc68"
				}
			]
		},
		{
			"featureType": "poi"
		},
		{
			"featureType": "transit.line",
			"stylers": [
				{
					"color": "#d6bc68"
				},
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "road",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"visibility": "off"
				},
				{
					"weight": 1
				},
				{
					"color": "#e9d9a6"
				}
			]
		},
		{
			"featureType": "road",
			"elementType": "geometry",
			"stylers": [
				{
					"visibility": "simplified"
				},
				{
					"color": "#e9d9a6"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry",
			"stylers": [
				{
					"visibility": "simplified"
				},
				{
					"color": "#e9d9a6"
				}
			]
		},
		{
			"featureType": "poi.business",
			"stylers": [
				{
					"color": "#e9d9a6"
				},
				{
					"visibility": "on"
				}
			]
		},
		{},
		{
			"featureType": "poi.government",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi.school",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "administrative",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi.medical",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi.attraction",
			"elementType": "geometry",
			"stylers": [
				{
					"visibility": "off"
				},
				{
					"color": "#cfb665"
				}
			]
		},
		{
			"featureType": "poi.place_of_worship",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "poi.sports_complex",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{},
		{
			"featureType": "road.arterial",
			"elementType": "labels.text.stroke",
			"stylers": [
				{
					"color": "#cfb665"
				},
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "labels.text",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "road.highway.controlled_access",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "road"
		}
	]	
	
	// List that contains the hints to display to user when getting closer/farther
	hints = ["You have the whole map to explore, zoom in a little.",
			"Why, what is that in the distance?\nCould it be a location!\nYou're getting closer!",
			"Yes, you are getting closer.",
			"Cool, I can see the country! You're getting closer.",
			"Nice Job, You're getting pretty close now!",
			"I can almost touch it, you are close!",
			"It's right there! Just a little closer!",
			"Congratulations! You found the location! Have a point~",
			"Congrats! You found all 5 locations, and won Map till you Drop! "];


	// location list with name and numbered (1-5)
	//Hokkaido, Japan
	//Groningen, Netherlands
	//London, England
	//Bogota, Columbia
	//Shanghai, China
	var locations = [
		['Hokkaido, Japan', 43.0000,142.0000, '1st'],
		['Groningen, Netherlands', 53.2167,6.5667, '2nd'],
		['London, England', 51.5072, 0.1275, "3rd"],
		['Bogota, Columbia', 4.624335, -74.063644, '4th'],
		['Shanghai, China', 31.2000, 121.5000, '5th']
	];
	
	// initializes variables
	i = 0;
	loc = 0;
	score = 0;

	// object that stores starting location, google map styling, and zoom level
	var mapProp = {
		center:new google.maps.LatLng(0.0,0.0),
		zoom:1,
		mapTypeId:google.maps.MapTypeId.ROADMAP,
		styles: style
	};  
	
	// creates google map api, calls mapProp object to initialize starting location, styline and zoom level
	var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);

	// adds listener for bounds_changed event
	// looks to see if the first location is in the bounds range and displays corresponding hint and score.
	document.getElementById("hints").innerHTML = hints[0];
	google.maps.event.addListener(map, 'bounds_changed', function() {
		map.addListener('bounds_changed', function() {
			if (map.getBounds().contains(new google.maps.LatLng(locations[i][1], locations[i][2])) && map.getZoom() == 8) {
				document.getElementById("hints").innerHTML = hints[7];
				score += 1;
				document.getElementById("curScore").innerHTML = score;
				// when the score increases the corresponding alert for the location is shown and the location is changed to the next
				if (score == 1) {
					alert("Congratulations! You found the " + locations[i][3] + " location: \n" + locations[i][0]);
					i += 1; 
				} else if (score == 2) {
					alert("Congratulations! You found the " + locations[i][3] + " location: \n" + locations[i][0]);
					i += 1;
				} else if (score == 3) {
					alert("Congratulations! You found the " + locations[i][3] + " location: \n" + locations[i][0]);
					i = i + 1;
				} else if (score == 4) {
					alert("Congratulations! You found the " + locations[i][3] + " location: \n" + locations[i][0]);
					i = i + 1;
				} 
				// Displays game over screen when the player finds all 5 locations
				else if (score == 5) {
					alert("Congratulations! You found the " + locations[i][3] + " location: \n" + locations[i][0]); 
					document.getElementById("hints").innerHTML = hints[8];
					document.getElementById("googleMap").innerHTML = '<img src="game_over.jpg"/>';
					document.getElementById("display").innerHTML = "Congrats you scored 5 points! \nYou saved history!";
				}
			// if the zoom location is not the correct level 8, for the zoom level the corresponding hint displays
			} else if (map.getBounds().contains(new google.maps.LatLng(locations[i][1], locations[i][2])) && map.getZoom() == 7) {
				document.getElementById("hints").innerHTML = hints[6];
			} else if (map.getBounds().contains(new google.maps.LatLng(locations[i][1], locations[i][2])) && map.getZoom() == 6) {
				document.getElementById("hints").innerHTML = hints[5];
			} else if (map.getBounds().contains(new google.maps.LatLng(locations[i][1], locations[i][2])) && map.getZoom() == 5) {
				document.getElementById("hints").innerHTML = hints[4];
			} else if (map.getBounds().contains(new google.maps.LatLng(locations[i][1], locations[i][2])) && map.getZoom() == 4) {
				document.getElementById("hints").innerHTML = hints[3];
			} else if (map.getBounds().contains(new google.maps.LatLng(locations[i][1], locations[i][2])) && map.getZoom() == 3) {
				document.getElementById("hints").innerHTML = hints[2];
			} else if (map.getBounds().contains(new google.maps.LatLng(locations[i][1], locations[i][2])) && map.getZoom() == 2) {
				document.getElementById("hints").innerHTML = hints[1];
			} else if (map.getBounds().contains(new google.maps.LatLng(locations[i][1], locations[i][2])) && map.getZoom() == 1) {
				document.getElementById("hints").innerHTML = hints[0];
			} 
			// When a location is not in bounds, the hint will say no location is there
			else {
				document.getElementById("hints").innerHTML = "There's Nothing Here";
			}
		});
	});
}

