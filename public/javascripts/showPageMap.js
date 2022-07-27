
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
// style: 'mapbox://styles/mapbox/light-v10', // this is light version of map, more of like black and white
center: campground.geometry.coordinates, // starting position [lng, lat]
zoom: 9, // starting zoom
projection: 'globe' // display the map as a 3D globe
});
map.on('style.load', () => {
map.setFog({}); // Set the default atmosphere style
});

map.addControl(new mapboxgl.NavigationControl());
// disable map zoom when using scroll
// map.scrollZoom.disable();

new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setHTML(
        `<h3>${campground.title}</h3><p>${campground.location}`
      )
  )
  .addTo(map)
