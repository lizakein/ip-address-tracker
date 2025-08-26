const ZOOM = 13;

let map = L.map('map', {
    center: [34.08057, -118.07285],
    zoom: ZOOM,
    zoomControl: false
});

const locationIcon = L.icon({
  iconUrl: './images/icon-location.svg',
  iconSize: [38, 50],
  iconAnchor: [19, 50]
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker = L.marker([34.08057, -118.07285], { icon: locationIcon }).addTo(map);


export function updateMap(data) {
  const lat = data.location.lat;
  const lng = data.location.lng;

  map.setView([lat, lng], ZOOM);

  if (marker) marker.setLatLng([lat, lng]);
  else marker = L.marker([lat, lng], {icon: locationIcon}).addTo(map);
}