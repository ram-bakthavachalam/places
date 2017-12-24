// insert-places.js

// Inserts pre defined places data in to DB

const MongoClient    = require('mongodb').MongoClient;
const db             = require('./config/db');

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);
  	var places = new Set();
	places.add({ 
	  name: 'Yosemite National Park', 
	  shortdescription: 'Yosemite National Park is in California’s Sierra Nevada mountains. It’s famed for its giant, ancient sequoia trees, and for Tunnel View, the iconic vista of towering Bridalveil Fall and the granite cliffs of El Capitan and Half Dome.',
	  longdescription: 'Yosemite National Park is in California’s Sierra Nevada mountains. It’s famed for its giant, ancient sequoia trees, and for Tunnel View, the iconic vista of towering Bridalveil Fall and the granite cliffs of El Capitan and Half Dome. In Yosemite Village are shops, restaurants, lodging, the Yosemite Museum and the Ansel Adams Gallery, with prints of the photographer’s renowned black-and-white landscapes of the area.',  
	  crowdrank: '1',
	  city: '',
	  state: 'California',
	  country: 'United States',
	  zipcode: ''
	});
	places.add({ 
	  name: 'Disneyland', 
	  shortdescription: 'Disneyland Park, originally Disneyland, is the first of two theme parks built at the Disneyland Resort in Anaheim, California, opened on July 17, 1955',
	  longdescription: 'Disneyland Park, originally Disneyland, is the first of two theme parks built at the Disneyland Resort in Anaheim, California, opened on July 17, 1955. It is the only theme park designed and built under the direct supervision of Walt Disney.',  
	  crowdrank: '2',
	  city: '',
	  state: 'California',
	  country: 'United States',
	  zipcode: ''
	});
	places.add({ 
	  name: 'Golden Gate Bridge', 
	  shortdescription: 'The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide strait connecting San Francisco Bay and the Pacific Ocean.',
	  longdescription: 'The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide strait connecting San Francisco Bay and the Pacific Ocean.',  
	  crowdrank: '3',
	  city: '',
	  state: 'California',
	  country: 'United States',
	  zipcode: ''
	});
	places.add({ 
	  name: 'Lake Tahoe', 
	  shortdescription: 'Lake Tahoe is a large freshwater lake in the Sierra Nevada Mountains, straddling the border of California and Nevada.',
	  longdescription: 'Lake Tahoe is a large freshwater lake in the Sierra Nevada Mountains, straddling the border of California and Nevada. It’s known for its beaches and ski resorts. On the southwest shore, Emerald Bay State Park contains the 1929 Nordic-style mansion Vikingsholm. Along the lake’s northeast side, Lake Tahoe Nevada State Park includes Sand Harbor Beach and Spooner Lake, a gateway to the long-distance Tahoe Rim Trail.',  
	  crowdrank: '4',
	  city: '',
	  state: 'California',
	  country: 'United States',
	  zipcode: ''
	});
	for(let place of places){
		// Validate before creating
		const details = { 'name': place.name };
		database.collection('places').findOne(details, (err, item) => {
		  if (err) {
		    console.log({'error':'An error has occurred'});
		  } else {
		    if(item){
		      console.log("Place already exists in the system wiht id :: "+item._id);
		    }
		    else{
		    	console.log(place)
		      	database.collection('places').insert(place, (err, result) => {
		        if (err) { 
		          console.log({ 'error': 'An error has occurred' }); 
		        } else {
		          console.log(result.ops[0]);
		        }
		      });
		    }
		  }
		});
	}
	
})