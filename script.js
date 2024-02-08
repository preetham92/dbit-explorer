var map = L.map('map').setView([12.882198889775518, 77.444965839386], 85);
var routeControl; //  routeControl variable

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">Project by Team Code diggers</a> contributors'
}).addTo(map);

var places = [
    { name: 'a block', latlng: [12.881665490575516, 77.44455814361574] },
    { name: 'playground', latlng: [12.882324395304593, 77.44564175605775] },
    { name: 'cafeteria', latlng: [12.880964748724105, 77.44523406028749] },
    // Add more places 
];

map.on('click', function(e) {
    var name = prompt("Enter place name:");
    if (name) {
        var marker = L.marker(e.latlng, { draggable: true }).addTo(map);
        marker.bindPopup(name);
        places.push({ name: name, latlng: e.latlng });
    }
});

function searchPlace() {
    var searchValue = document.getElementById("searchInput").value;
    var foundPlace = places.find(function(place) {
        return place.name.toLowerCase() === searchValue.toLowerCase();
    });
    if (foundPlace) {
        var startPoint;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                startPoint = L.latLng(position.coords.latitude, position.coords.longitude);
                // to Remove existing route if present
                if (routeControl) {
                    map.removeControl(routeControl);
                }
                getRoute(startPoint, foundPlace.latlng);
            });
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    } else {
        alert("Place not found!");
    }
}

function getRoute(startPoint, endPoint) {
    //to Create new route control and add it to the map
    routeControl = L.Routing.control({
        waypoints: [startPoint, endPoint],
        routeWhileDragging: true,
        lineOptions: {
            styles: [{ color: 'blue', opacity: 0.8, weight: 5 }]
        }
    }).addTo(map);
}
