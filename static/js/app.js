// Full page carousel
var item = $('.carousel .item'); 
var height = $(window).height() - 92;

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

// Affix navbar
$('.navbar-lead').affix({
  offset: {
    top: $('.navbar-lead').offset().top
  }
}).on('affix.bs.affix', function(e) {
  $('#about').css('margin-top', $('.navbar-lead').height());
}).on('affix-top.bs.affix', function(e) {
  $('#about').css('margin-top', 0);
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

// https://api.instagram.com/oauth/authorize/?client_id=28174406217d462f9e0b6fff4fd17bf2&redirect_uri=http://127.0.0.1:8000&response_type=token
var feed = new Instafeed({
  get: 'user',
  // userId: '1396994756',
  // accessToken: '1396994756.2817440.0017197cce83439dbcf25e8bf7ff28e2',
  userId: '4549450399',
  accessToken: '4549450399.2817440.8eff94ad52434d5caffa3c8c61544e4d',
  clientId: '28174406217d462f9e0b6fff4fd17bf2',
  sortBy: 'most-recent',
  limit: 12,
  template: '<a target="_blank" href="{{link}}"><img src="{{image}}" /></a>'
});
feed.run();

$('form').ajaxChimp({
  url: 'http://theofficeco.us15.list-manage.com/subscribe/post?u=dc012226ccd97e468496f29f5&amp;id=21390fd4e0',
  callback: function (response) {
    $('form .alert').addClass('hide');
    if (response.result == 'success') {
      $('form .alert-success').removeClass('hide');
    } else {
      var is_already_subscriber = response.msg.indexOf(
        'is already subscribed') != -1;
      if (is_already_subscriber) {
        $('form .alert-warning').removeClass('hide');
      } else {
        $('form .alert-danger').removeClass('hide');
      }
    }
  },
});

$('#pricing-Carousel').carousel({
  interval: null
});

$('#pricing .carousel .item').each(function(){
  $(this).height(
    $(this).find('.pricing-item').height()
  );
});

var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
if (width >= 768) {
  $('#pricing .carousel .item').each(function(){
    var next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    if (next.next().length > 0) {
      next.next().children(':first-child').clone().appendTo($(this)).addClass('rightest');
    }
    else {
      $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
    }
  });
}