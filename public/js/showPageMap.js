maptilersdk.config.apiKey = maptilerApiKey;
console.log("hello");
console.log(`key: ${maptilerApiKey}`);
console.log(campground);

const map = new maptilersdk.Map({
  container: "map",
  style: maptilersdk.MapStyle.BRIGHT,
  center: campground.features.geometry.coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});

new maptilersdk.Marker()
  .setLngLat(campground.features.geometry.coordinates)
  .setPopup(
    new maptilersdk.Popup({ offset: 10 }).setHTML(
      `<h3>${campground.features.title}</h3><p>${campground.features.location}</p>`
    )
  )
  .addTo(map);
