
    mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',// /dark-v11 for dark maps
        //projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
        zoom: 9,
        center: listing.geometry.coordinates// lng, lat
    });

    // // Create a default Marker and add it to the map.
    const marker = new mapboxgl.Marker({ color: 'red'})
        .setLngLat(listing.geometry.coordinates)//Listing.geometry.coordinates
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML(`<h4>${listing.title}</h4><p>Exact location will be provided after booking!</p>`))
        .addTo(map);