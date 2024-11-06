// Sample data for "assets"
const sampleData = [
  [-27.5, 153, "Brisbane"],
  [-28, 153, "Gold Coast"],
  [-26.4, 153, "Sunshine Coast"],
  [-19, 146, "Townsville"],
  [-17, 145.8, "Cairns"],
  [-27, 151, "Toowoomba"],
  [-21, 149, "Mackay"],
  [-23.4, 150.5, "Rockhampton"],
  [-25.3, 152.8, "Hervey Bay"],
  [-20.4, 139.3, "Mount Isa"],
  [-23.5, 148.2, "Emerald"],
  [-28, 145.7, "Cunnamulla"],
  [-23.4, 144.3, "Longreach"],
];

// Set map from Leaflet 1.9.4
var map = L.map("map").setView([-21, 147], 5.4);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 17,
  minZoom: 5,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

map.on("click", onMapClick);

var vis_layer = [];

// Return the markers within the specified area
function revealNodes(north, south, east, west) {
  var new_layer = [];

  // replace with call to DB in future
  sampleData.forEach((e) => {
    if (e[1] > north && e[1] < south && e[0] < east && e[0] > west) {
      var x = new L.Marker([e[0], e[1]], { title: e[2] });
      new_layer.push(x);
    }
  });

  return new_layer;
}

var nodeGroup;
var marker;

// Draw a square surrounding the cursor point and update visible markers
function onMapClick(e) {
  // Remove previous marker
  marker?.remove();
  nodeGroup?.remove();

  // Add new marker at mouse click position
  marker = new L.Rectangle(
    [
      [e.latlng.lat - 2, e.latlng.lng - 2],
      [e.latlng.lat + 2, e.latlng.lng + 2],
    ],
    { opacity: 0.1 }
  );

  vis_layer = revealNodes(
    e.latlng.lng - 2,
    e.latlng.lng + 2,
    e.latlng.lat + 2,
    e.latlng.lat - 2
  );

  // Write asset names to screen
  asset_text = "";
  vis_layer.forEach(
    (e) => (asset_text += (asset_text ? ", " : "") + e.options.title)
  );
  document.getElementById("assets").textContent = `${asset_text}`;

  map.addLayer(marker);
  nodeGroup = L.featureGroup(vis_layer).addTo(map);
}
