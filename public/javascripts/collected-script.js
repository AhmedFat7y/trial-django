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
var opacityTimer;
  function templateTheQuoetContent(data) {
    $("#complete-quote-content").find('.quote-content').text(data.quote_content);
    if(/^[\x00-\xFF]{2}/.test(data.quote_content)) {
      $("#complete-quote-content").find('p').css({
        direction: "ltr"
      });
    } else {
      $("#complete-quote-content").find('p').css({
        direction: "rtl"
      });      
    }
    $("#complete-quote-content").find('span').text(data.owner_name);
  }
  function getQuoteContent(quoteID) {
   if (currentQuoteRequest) {
    currentQuoteRequest.abort();
   }
   quoteID = quoteID.split('-')[1];
    currentQuoteRequest = $.ajax({
      url: getQuoteContentURL.slice(0, getQuoteContentURL.length - 1) + quoteID,
      data: {}
    })
    .done(function(data, textStatus, jqXHR) {
      templateTheQuoetContent(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      $("#complete-quote-content").fadeOut();
    })
    .always(function (jqXHR, textStatus, errorThrown) {
      $("#complete-quote-content div.loading").fadeOut();
    });
  }
  $('.nav.blog .navMask .navContent li a').click(function(){
    var self = $(this);
    var quoteDiv = $('#complete-quote-content');
    var startright = 0;
    $.each($('.nav.blog .navMask .navContent li a'), function(){
      var self = $(this);
      if(self.width() > startright) {
        startright = self.width()
      }
    });
    var startleft = $('#menu-main-menu>li').width();
    var freewidth = $(window).width() - (startright + startleft);
    $('#complete-quote-content').css({
        left     : startleft + 10,
        width    : freewidth - 40,
        top      : $(window).height() / 4,
        opacity  : 1,
        position : 'absolute'
    });
    opacityTimer = setTimeout("$('#complete-quote-content').animate({opacity: 0.5}, {duration: 500, queue: false})", 3000);
    $('#complete-quote-content').fadeOut(10, 'linear').fadeIn();
    $("#complete-quote-content div.loading").fadeIn();
    getQuoteContent(self.attr("id"));
  });
  $("#complete-quote-content").hover(function(){
    var self = $(this);
    self.animate({opacity: 1}, {duration: 500, queue: false});
    if(opacityTimer) {
      clearTimeout(opacityTimer);
      opacityTimer = 0;
    }
  },
  function(){
    var self = $(this);
    self.animate({opacity: 0.5}, {duration: 500, queue: false});
    if(opacityTimer) {
      clearTimeout(opacityTimer);
      opacityTimer = 0;
    }
  });
});