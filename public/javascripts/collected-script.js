jQuery(function(){
/** slide show **/
  var slides = [];
  var maxImages = image_count;
  var upperlimit = 100;
  if(maxImages > 100) {
    for(; maxImages > upperlimit; upperlimit *= 10){}
  }
  for (var i = 0; i < 100; i++) {
    var imageIndex = (Math.floor(Math.random() * upperlimit)) % maxImages;
    slides[i] = {image : MEDIA_URL + 'memories-images/' + imageIndex + '.JPEG'}
  }
  
  $.supersized({
    slide_interval		: 10000,
    transition			  : 1,
    transition_speed	: 750,
    slide_links			  : 'blank',
    slides 				    : slides,
    random            : true
  });
/** main-layout **/
  setTimeout(function(){
    $('.nav.portfolio .navMask ul.navContent').animate({right: '-200px'}, {queue:false, duration: 500});
    $('.navigation, .footer').animate({opacity: '0.1'}, {queue:false, duration: 500});
  }, 1000);
  
  $('.nav.portfolio .navMask ul.navContent, .navigation, .footer').hover(function() {
    $('.nav.portfolio .navMask ul.navContent').animate({right: '0px'}, {queue:false, duration: 500});
    $('.navigation, .footer').animate({opacity: '1'}, {queue:false, duration: 500});
  },
  function(){
    $('.nav.portfolio .navMask ul.navContent').animate({right: '-200px'}, {queue:false, duration: 500});
    $('.navigation, .footer').animate({opacity: '0.1'}, {queue:false, duration: 500});
  });
  $('.nav.portfolio .navMask ul.navContent li p.more a').click(function(){
      $(this).parent().parent().find('p.image a').click();
  });
  $('.nav.portfolio .navMask ul.navContent li p.image a').not('#progress-img').click(function(e) {
    $('.loading').fadeIn();
    var htmlUrl = '<img src="' + $(this).find('img').attr("alt") + '" alt="" class="background" />';
    $('#background').html(htmlUrl);
    $('#background img').load(function() {
      background_resize();
      $(this).fadeIn();
      $('.loading').fadeOut();
    });
  });
  $('.loading').fadeOut();

/** Quotes **/

});