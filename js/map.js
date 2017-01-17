var labels = '';
var labelIndex = 0;
function initialize() {
  var ubicacion = { lat: -33.442419, lng: -70.626042 };
  var map = new google.maps.Map(document.getElementById('mapa'), {
    zoom: 15,
    center: ubicacion
  });
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
  });
  addMarker(ubicacion, map);
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h3 id="firstHeading" class="firstHeading">Foto</h3>'+
      '<div id="bodyContent">'+
      '<p>acá va la foto</p>'+
      '</div>'+
      '</div>';
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: ubicacion,
    map: map,
    title: 'Foto' 
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
function addMarker(location, map) {
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map
  });
}
google.maps.event.addDomListener(window, 'load', initialize);


