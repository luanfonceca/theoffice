// Full page carousel
var item = $('.carousel .item'); 
var height = $(window).height() - 100;

item.eq(0).addClass('active');
item.height(height); 
item.addClass('full-screen');

$('.carousel img').each(function() {
  var src = $(this).attr('src');
  var color = $(this).attr('data-color');
  $(this).parent().css({
    'background-image' : 'url(' + src + ')',
    'background-color' : color
  });
  $(this).remove();
});

$(window).on('resize', function (){
  height = $(window).height();
  item.height(height);
});

$('.carousel').carousel({
  interval: 6000,
  pause: "false"
});

var map;
var infoWindow;
var service;

function initMap() {
  var position = new google.maps.LatLng(-5.817595, -35.214317);
  map = new google.maps.Map($('#map')[0], {
    zoom: 15,
    scrollwheel: false,
    center: position
  });

  google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(position);
  });

  infoWindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.getDetails({
    placeId: 'ChIJyUasBfb_sgcRYvsewdiOxm4'
  }, function(place, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      alert(status);
      return;
    }

    var marker = new google.maps.Marker({
      map: map,
      title: place.name,
      position: place.geometry.location,
      icon: {
        url: 'static/img/map-marker.svg',
        scaledSize: new google.maps.Size(25, 35)
      },
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(
        '<strong>' + place.name + '</strong>' +
        "<br>" + place.formatted_address
      );
      infoWindow.open(map, marker);
    });
  });
}

google.maps.event.addDomListener(window, 'load', initMap);
