let socket = io();
console.log("Socket client initialized");

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("send-location", { latitude, longitude });
    },
    (error) => {
      console.log(error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    }
  );
}

const map = L.map("map").setView([0, 0], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{x}/{y}/{z}.png", {
  attribution: "Prakash_celt..!",
}).addTo(map);

const markers = {};

socket.on("receive-location", (data) => {
  const { id, latitude, longitude } = data;
  
  // Remove existing marker if present
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  } else {
    // Create a new marker and add a click event listener
    markers[id] = L.marker([latitude, longitude]).addTo(map)
      .on('click', () => {
        console.log(`Marker ID: ${id}, Latitude: ${latitude}, Longitude: ${longitude}`);
      });
  }
});

socket.on("user-disconnected", (id) => {
  if (markers[id]) {
    map.removeLayer(markers[id]);
    delete markers[id];
  }
}); 