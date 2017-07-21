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