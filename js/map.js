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

	// // add buildings
	map.on('style.load', function() {
		map.addSource('buildings', {
    		'type': 'geojson',
   			'data': 'dataset/bangunan.json'
			});
		map.addLayer({
			'id': 'buildings',
			'type': 'fill-extrusion',
			'source': 'buildings',
			'layout': {'visibility': 'none'},
			'paint': {
				'fill-extrusion-color': 'black',
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
				'fill-extrusion-opacity': 0.5
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
			'layout': {'visibility': 'visible'},
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
	

//checkbox for switching layer
switchlayer = function (lname) {
	if (document.getElementById(lname + "CB").checked) {
		map.setLayoutProperty(lname, 'visibility', 'visible');
	} else {
		map.setLayoutProperty(lname, 'visibility', 'none');
   }
}
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

// map.on('click', 'spatplan', function (e) {
// 	map.getCanvas().style.cursor = 'pointer';
// 	});
// 	document.getElementById("mySidenav2").style.width = "300px";
//   	document.getElementById("map").style.marginLeft = "300px";


//draw
var modes = MapboxDraw.modes;
modes.draw_rectangle = DrawRectangle.default;
var draw = new MapboxDraw({
	displayControlsDefault: false,
	controls: {
	polygon: true,
	trash: true
	},
	modes: modes
	});
	var modes = MapboxDraw.modes;
	map.addControl(draw);
	 
	map.on('draw.create', updateArea);
	map.on('draw.delete', updateArea);
	map.on('draw.update', updateArea);