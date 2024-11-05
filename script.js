document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript is loaded and running!");
});

// Set map from Leaflet 1.9.4
var map = L.map("map").setView([-21, 147], 5.4);

// Mouse event listener
map.on("click", onMapClick);

var marker;

function onMapClick(e) {
  // Remove previous marker
  marker?.remove();

  // Add new marker at mouse click position
  marker = new L.Rectangle(
    [
      [e.latlng.lat - 1, e.latlng.lng - 1],
      [e.latlng.lat + 1, e.latlng.lng + 1],
    ],
    { opacity: 0.1 }
  );

  map.addLayer(marker);
  const latlngs = marker.getLatLngs();
  document.getElementById(
    "coordinates"
  ).textContent = `Coordinates: ${latlngs}`;
}

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 17,
  minZoom: 5,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
