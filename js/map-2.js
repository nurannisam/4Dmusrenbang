mapboxgl.accessToken = 'pk.eyJ1IjoibnVyYW5uaXNhbSIsImEiOiJjamptYzBqNjAweXozM3dtcGQ4amkwNnJiIn0.rWnyywcS2qs9avjms1hBSQ';
    var map = new mapboxgl.Map({
		container: 'map', // container id
		style: 'mapbox://styles/nurannisam/cknt9vin8023f17p6e7a3e60g',
        // style: 'mapbox://styles/nurannisam/cknnfhtoj4dx417mp5spx3la2', // style URL
        center: [106.849618, -6.226391], // starting position [lng, lat]
        zoom: 16, // starting zoom
		bearing: 20,
		pitch: 20
    });
	
	// Add the control to the map.
	var geocoder = new MapboxGeocoder({
	accessToken: mapboxgl.accessToken,
	mapboxgl: mapboxgl
	});
	
	document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

	//add user_data
	var user_data = {
		'id': 'polygon-3355',
		'type': 'Feature',
		'properties': {},
		'geometry': {'type': 'Polygon',
			'coordinates': [[
					[	106.84567295966,
						-6.22101734553514,
						4		],
					[	106.845810375664,
						-6.22095269187775,
						4		],
					[	106.845861052916,
						-6.22105817047952,
						4		],
					[	106.845725234895,
						-6.22112388221985,
						4		],
					[	106.845725234895,
						-6.22112388221985,
						4		],
					[	106.84567295966,
						-6.22101734553514,
						4		]
					]]
					}
	}

	// const NewSimpleSelect = _.extend(MapboxDraw.modes.simple_select, {
	// 	dragMove() {}
	//   });
	  
	//   const NewDirectSelect = _.extend(MapboxDraw.modes.direct_select, {
	// 	dragFeature() {}
	//   });
	// const draw = new MapboxDraw({
	// 		displayControlsDefault: false,
	// 		modes: {
	// 			...MapboxDraw.modes,
	// 			simple_select: NewSimpleSelect,
	// 			direct_select: NewDirectSelect
	// 		}
	// 		});
	// map.addControl(draw);
	map['dragPan'].disable();
	map['dragPan'].enable();

	var currentDraggingType = false;
	var currentDragging = false;
	var currentDraggingFeature = false;
	var firstDragEvent = false;

	// add layer
	map.on('style.load', function() {
		// add building
		map.addSource('buildings', {
    		'type': 'geojson',
   			'data': 'dataset/bangunan.json'
			});
		map.addLayer({
			'id': 'buildings',
			'type': 'fill-extrusion',
			'source': 'buildings',
			'layout': {'visibility': 'visible'},
			'paint': {
				'fill-extrusion-color': 'white',
				'fill-extrusion-height': [
					"match",
					["get", "height"],
					["9"],
					12,
					["12"],
					4,
					["13"],
					16,
					["14"],
					20,
					["15"],
					10,
					["16"],
					16,
					["17"],
					4,
					["18"],
					8,
					0
				],
				'fill-extrusion-base': 0,
				'fill-extrusion-opacity': 0.8
			}
			});

	// add spatplan

		map.addSource('spatplan', {
    		'type': 'geojson',
   			'data': 'dataset/tebet_full.json'
			});
		map.addLayer({
			'id': 'spatplan',
			'type': 'fill-extrusion',
			'source': 'spatplan',
			'layout': {'visibility': 'none'},
			'paint': {
				'fill-extrusion-color': [
					"match",
					["get", "ZONA"],
					["Zona Campuran"],
					"hsl(312, 94%, 72%)",
					[
						"Zona Pelayanan Umum dan Sosial"
					],
					"hsl(0, 11%, 64%)",
					["Zona Perumahan Vertikal"],
					"hsl(45, 95%, 60%)",
					[
						"Zona Perumahan KDB Sedang-Tinggi"
					],
					"hsl(55, 94%, 64%)",
					[
						"Zona Perumahan KDB Rendah"
					],
					"hsl(58, 98%, 83%)",
					["Zona Jalur Hijau"],
					"hsl(107, 91%, 79%)",
					["Zona Terbuka Biru"],
					"hsl(196, 61%, 61%)",
					[
						"Zona Taman Kota/Lingkungan"
					],
					"hsl(105, 90%, 42%)",
					[
						"Zona Pemerintahan Daerah"
					],
					"hsl(29, 46%, 46%)",
					[
						"Zona Perkantoran, Perdagangan, dan Jasa"
					],
					"hsl(0, 88%, 51%)",
					"#000000"
				],
				'fill-extrusion-height': [
					"match",
					["get", "z_height"],
					["8"],
					8,
					["12"],
					12,
					["16"],
					16,
					["32"],
					32,
					["128"],
					128,
					0
				],
				'fill-extrusion-base': [
					"interpolate",
					["linear"],
					["zoom"],
					0,
					0,
					22,
					0
				],
				'fill-extrusion-opacity': 0.5
			}
		});

		//checkbox for switching layer
		switchlayer = function (lname) {
			if (document.getElementById(lname + "CB").checked) {
				map.setLayoutProperty(lname, 'visibility', 'visible');
			} else {
				map.setLayoutProperty(lname, 'visibility', 'none');
		}
		}

		//add user_data
		document.getElementById("draw-rectangle")
		.addEventListener("click", () => {
			// draw.add(user_data);
			map.addSource('fields', {
				"type": "geojson",
				"data": 'dataset/marker.json'
			  });
			  map.addLayer({
				'id': 'fields-layer',
				'type': 'fill-extrusion',
				'source': 'fields',
				'layout': {'visibility': 'visible'},
				'paint': {'fill-extrusion-color': 'red',
				'fill-extrusion-height': 10,
				'fill-extrusion-base': 0,
				'fill-extrusion-opacity': 0.8}
			});
	});

		document.getElementById("draw-rectangle1")
		.addEventListener("click", () => {
			// draw.add(user_data);
			map.addSource('fields1', {
				"type": "geojson",
				"data": 'dataset/marker-1.json'
			});
			map.addLayer({
				'id': 'fields1-layer',
				'type': 'fill-extrusion',
				'source': 'fields1',
				'layout': {'visibility': 'visible'},
				'paint': {'fill-extrusion-color': 'yellow',
				'fill-extrusion-height': 10,
				'fill-extrusion-base': 0,
				'fill-extrusion-opacity': 0.8}
			});
	});

		document.getElementById("draw-rectangle2")
		.addEventListener("click", () => {
			// draw.add(user_data);
			map.addSource('fields2', {
				"type": "geojson",
				"data": 'dataset/marker-2.json'
			});
			map.addLayer({
				'id': 'fields2-layer',
				'type': 'fill-extrusion',
				'source': 'fields2',
				'layout': {'visibility': 'visible'},
				'paint': {'fill-extrusion-color': 'blue',
				'fill-extrusion-height': 10,
				'fill-extrusion-base': 0,
				'fill-extrusion-opacity': 0.8}
			});
	});

		document.getElementById("draw-rectangle3")
		.addEventListener("click", () => {
			// draw.add(user_data);
			map.addSource('fields3', {
				"type": "geojson",
				"data": 'dataset/marker-3.json'
			});
			map.addLayer({
				'id': 'fields3-layer',
				'type': 'fill-extrusion',
				'source': 'fields3',
				'layout': {'visibility': 'visible'},
				'paint': {'fill-extrusion-color': 'greenyellow',
				'fill-extrusion-height': 10,
				'fill-extrusion-base': 0,
				'fill-extrusion-opacity': 0.8}
			});
	});

		document.getElementById("draw-rectangle4")
		.addEventListener("click", () => {
			// draw.add(user_data);
			map.addSource('fields4', {
				"type": "geojson",
				"data": 'dataset/marker-4.json'
			});
			map.addLayer({
				'id': 'fields4-layer',
				'type': 'fill-extrusion',
				'source': 'fields4',
				'layout': {'visibility': 'visible'},
				'paint': {'fill-extrusion-color': 'orange',
				'fill-extrusion-height': 10,
				'fill-extrusion-base': 0,
				'fill-extrusion-opacity': 0.8}
			});
	});

	//add sky
	map.addLayer({
		'id': 'sky',
		'type': 'sky',
		'paint': {
		// set up the sky layer to use a color gradient
		'sky-type': 'gradient',
		// the sky will be lightest in the center and get darker moving radially outward
		// this simulates the look of the sun just below the horizon
		'sky-gradient': [
		'interpolate',
		['linear'],
		['sky-radial-progress'],
		0.8,
		'rgba(135, 206, 235, 1.0)',
		1,
		'rgba(0,0,0,0.1)'
		],
		'sky-gradient-center': [0, 0],
		'sky-gradient-radius': 90,
		'sky-opacity': [
		'interpolate',
		['exponential', 0.1],
		['zoom'],
		5,
		0,
		22,
		1
		]
		}
		});


		map.on('mousedown','fields-layer', function(e) {
			map['dragPan'].disable();
			currentDragging = 'fields'; // this must correspond to the source-id of the layer
			currentDraggingFeature = e.features[0]; // you may have to filter this to make sure it's the right feature
			firstDragEvent = map.unproject([e.originalEvent.layerX,e.originalEvent.layerY]);
		});
		map.on('mousedown','fields1-layer', function(e) {
			map['dragPan'].disable();
			currentDragging = 'fields1'; // this must correspond to the source-id of the layer
			currentDraggingFeature = e.features[0]; // you may have to filter this to make sure it's the right feature
			firstDragEvent = map.unproject([e.originalEvent.layerX,e.originalEvent.layerY]);
		});
		map.on('mousedown','fields2-layer', function(e) {
			map['dragPan'].disable();
			currentDragging = 'fields2'; // this must correspond to the source-id of the layer
			currentDraggingFeature = e.features[0]; // you may have to filter this to make sure it's the right feature
			firstDragEvent = map.unproject([e.originalEvent.layerX,e.originalEvent.layerY]);
		});
		map.on('mousedown','fields3-layer', function(e) {
			map['dragPan'].disable();
			currentDragging = 'fields3'; // this must correspond to the source-id of the layer
			currentDraggingFeature = e.features[0]; // you may have to filter this to make sure it's the right feature
			firstDragEvent = map.unproject([e.originalEvent.layerX,e.originalEvent.layerY]);
		});
		map.on('mousedown','fields4-layer', function(e) {
			map['dragPan'].disable();
			currentDragging = 'fields4'; // this must correspond to the source-id of the layer
			currentDraggingFeature = e.features[0]; // you may have to filter this to make sure it's the right feature
			firstDragEvent = map.unproject([e.originalEvent.layerX,e.originalEvent.layerY]);
		});
		window.addEventListener('mousemove',moveEvent);
		window.addEventListener('mouseup',function(e) {
		  // save your geojson or do something with it
		  map['dragPan'].enable();
		  currentDragging = false;
		  firstDragEvent = false;
		  currentDraggingType = false;
		  currentDraggingFeature = false;
		});
		
	});
	
					function moveEvent(e) {
						var geoPoint = map.unproject([e.layerX,e.layerY]);
						console.log(firstDragEvent)
						console.log(currentDragging,currentDraggingType)
						console.log(firstDragEvent.lng,geoPoint.lng)
						if(currentDragging&&currentDraggingType==='move') {
						// In the case of move, you are just translating the points based on distance and angle of the drag
						// Exactly how your translate your points here can depend on the shape
						var geoPoint = map.unproject([e.layerX,e.layerY]);
						var xDrag = firstDragEvent.lng - geoPoint.lng;
						var yDrag = firstDragEvent.lat - geoPoint.lat;
						var distanceDrag = Math.sqrt( xDrag*xDrag + yDrag*yDrag );
						var angle = Math.atan2(xDrag, yDrag) * 180 / Math.PI;
				
						// Once you have this information, you loop over the coordinate points you have and use a function to find a new point for each
						var newFeature = JSON.parse(JSON.stringify(currentDraggingFeature));
						// This loop will depend on the type of feature, polygon, point, etc
						if(newFeature.geometry.type==='Polygon') {
							var newCoordinates = [];
							newFeature.geometry.coordinates.forEach(function(coords) {
							var innerCoords = [];
							coords.forEach(function(thisInnerCoords) {
								innerCoords.push(getPoint(thisInnerCoords,angle+180,distanceDrag));
							});
							newCoordinates.push(innerCoords)
							});
							newFeature.geometry.coordinates = newCoordinates;
						}
						var featureCollection = {
							"type" : "FeatureCollection",
							"features" : [newFeature]
						}
						map.getSource(currentDragging).setData(newFeature);
						}
					}
					

					
					$(document).on('click','#move',function() {
					currentDraggingType = 'move';
					})
					
					Number.prototype.toRad = function() {
					return this * Math.PI / 180;
					}
				
					Number.prototype.toDeg = function() {
					return this * 180 / Math.PI;
					}
				
					function getPoint(point, brng, dist) { 
					dist = dist / 63.78;
					brng = brng.toRad();
				
					var lat1 = point[1].toRad(), lon1 = point[0].toRad();
					var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) +
										Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));
				
					var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
												Math.cos(lat1),
												Math.cos(dist) - Math.sin(lat1) *
												Math.sin(lat2));
				
					if (isNaN(lat2) || isNaN(lon2)) return null;
				
					return [lon2.toDeg(),lat2.toDeg()];
					}

					document.getElementById('draw-rectangle').addEventListener('click', function () {
						// Fly to a random location by offsetting the point -74.50, 40
						// by up to 5 degrees.
						map.flyTo({
						center: [
                            106.85083664953709,
                			-6.2246789378551775
                        ],
						zoom: 18
						});
						});
					document.getElementById('draw-rectangle2').addEventListener('click', function () {
							// Fly to a random location by offsetting the point -74.50, 40
							// by up to 5 degrees.
							map.flyTo({
							center: [
								106.85083664953709,
								-6.2246789378551775
							],
							zoom: 18
							});
							});
							document.getElementById('draw-rectangle3').addEventListener('click', function () {
								// Fly to a random location by offsetting the point -74.50, 40
								// by up to 5 degrees.
								map.flyTo({
								center: [
									106.85083664953709,
									-6.2246789378551775
								],
								zoom: 18
								});
								});
								document.getElementById('draw-rectangle4').addEventListener('click', function () {
									// Fly to a random location by offsetting the point -74.50, 40
									// by up to 5 degrees.
									map.flyTo({
									center: [
										106.85083664953709,
										-6.2246789378551775
									],
									zoom: 18
									});
									});

					

 
//information table -- ZONING MAP
var zonaDisplay = document.getElementById('zona');
var cityDisplay = document.getElementById('city');
var distrDisplay = document.getElementById('district');
var subdistrDisplay = document.getElementById('subdistrict');
var kdbDisplay = document.getElementById('kdb');
var klbDisplay = document.getElementById('klb');
var kbDisplay = document.getElementById('kb');
var kdhDisplay = document.getElementById('kdh');

var zonaID = null;
map.on('click', 'spatplan', (e) => {
	map.getCanvas().style.cursor = 'pointer';
	// Set variables equal to the current feature's magnitude, location, and time
	var quakeZona = e.features[0].properties.ZONA;
	var quakeCity = e.features[0].properties.NAMA_KOTA;
	var quakeDistr = e.features[0].properties.KECAMATAN;
	var quakeSubdistr = e.features[0].properties.KELURAHAN;
	var quakeKdb = e.features[0].properties.KDB;
	var quakeKlb = e.features[0].properties.KLB;
	var quakeKb = e.features[0].properties.KB;
	var quakeKdh = e.features[0].properties.KDH;

  // Check whether features exist
  if (e.features.length > 0) {
    // Display the magnitude, location, and time in the sidebar
	zonaDisplay.textContent = quakeZona;
	cityDisplay.textContent = quakeCity;
	distrDisplay.textContent = quakeDistr;
	subdistrDisplay.textContent = quakeSubdistr;
	kdbDisplay.textContent = quakeKdb;
	klbDisplay.textContent = quakeKlb;
	kbDisplay.textContent = quakeKb;
	kdhDisplay.textContent = quakeKdh;
	
	// If quakeID for the hovered feature is not null,
    // use removeFeatureState to reset to the default behavior
    if (quakeID) {
		map.removeFeatureState({
		  source: "spatplan",
		  id: zonaID
		});
	  }
	  zonaID = e.features[0].id;


	  map.setFeatureState(
		{
		source: 'spatplan',
		id: zonaID
		}
		);
		}
		});
		

// Change the cursor to a pointer when the mouse is over the states layer.
map.on('mouseenter', 'spatplan', function () {
	map.getCanvas().style.cursor = 'pointer';
	});
	 
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'spatplan', function () {
map.getCanvas().style.cursor = '';
});	 

map.on('click', 'spatplan', function (e) {
	map.getCanvas().style.cursor = 'pointer';
	});
	document.getElementById("mySidenav2").style.width = "300px";
  	document.getElementById("map").style.marginLeft = "300px";


