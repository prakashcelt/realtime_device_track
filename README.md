﻿# realtime_device_track

Geolocation Support: Checked if the browser supports geolocation.

Geolocation Options: Configured geolocation options for high accuracy, a 5-second timeout, and no caching.

Continuous Location Tracking: Used watchPosition to track the user's location continuously and emit latitude and longitude via a socket with the "send-location" event. Logged any errors to the console.

Map Initialization: Initialized a Leaflet map centered at coordinates (0, 0) with a zoom level of 15 and added OpenStreetMap tiles.

Markers Object: Created an empty markers object to store and manage markers on the map.

Handling Location Data: When receiving location data via the socket, extracted the id, latitude, and longitude. Centered the map on the new coordinates.

Marker Management: Updated an existing marker's position if it exists; otherwise, created a new marker at the given coordinates and added it to the map. Removed and deleted markers for disconnected users.
