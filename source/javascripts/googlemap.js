AOS = {};

AOS.map = {
  center: [47.102485, 51.925345],
  locations: [],
  gLatLng: [],
};

$(document).ready(function() {
  if (typeof google === "undefined") {
    return;
  }

  google.maps.event.addDomListener(window, 'load', init);

  function init() {
    var map,
      mapOptions = {
      center: new google.maps.LatLng(AOS.map.center[0], AOS.map.center[1]),
      zoom: 16,
      zoomControl: true,
      disableDoubleClickZoom: true,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      },
      scaleControl: false,
      scrollwheel: true,
      panControl: false,
      streetViewControl: false,
      draggable : true,
      overviewMapControl: true,
      overviewMapControlOptions: {
        opened: false,
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    },
    mapElement = document.getElementById('googlemap');

    map = new google.maps.Map(mapElement, mapOptions);

    AOS.map.locations.forEach(function(l) {
      var coordinates = l.coordinates,
          gLatLng = new google.maps.LatLng(coordinates[0], coordinates[1]);

      l.marker = new google.maps.Marker({map: map, position: gLatLng});
      l.infoWindow = new google.maps.InfoWindow({content: l.info});
    });

    // City selector
    $('#googlemap-city-selector a').click(function(e) {
      var indexString = e.target.hash.match(/\d+/)[0],
          index = parseInt(indexString, 10),
          l = AOS.map.locations[index];
      e.preventDefault();

      map.setCenter(l.marker.getPosition());
      l.infoWindow.open(map, l.marker);
    });

    // Trigger initial click when map is fully loaded
    google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
      $('#googlemap-city-selector a:first').trigger('click');
    });
  }

});