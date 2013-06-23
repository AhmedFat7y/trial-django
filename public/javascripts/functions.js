
/**************************************************
	CONTENT HEIGHT
**************************************************/

function content_height() {
	
	jQuery('.sliderContent').css('min-height', jQuery(window).height() - 30);
	jQuery('.sidebar').css('min-height', jQuery(window).height() - 60);
	
	if (jQuery('.sidebar').height() < jQuery('.sliderContent').height()) {
		jQuery('.sidebar').css('min-height', jQuery('.sliderContent').height() - 30);
	}
}


/**************************************************
	BLOG HEIGHT
**************************************************/

function blog_height() {
	
	jQuery('.nav.blog').height(jQuery(window).height());

	if (jQuery('.nav.blog .navContent').height() < jQuery(window).height()) {
		jQuery('.nav.blog .navContent').css('top', (jQuery(window).height() - jQuery('.nav.blog .navContent').height()) / 2);
	}
}

/**************************************************
	PORTFOLIO HEIGHT
**************************************************/

function portfolio_height() {
	
	jQuery('.nav.portfolio').height(jQuery(window).height());
	
	if (jQuery('.nav.portfolio .navContent').height() < jQuery(window).height()) {
		jQuery('.nav.portfolio .navContent').css('top', (jQuery(window).height() - jQuery('.nav.portfolio .navContent').height()) / 2);
	}
}

/**************************************************
	WIDTH FIX - IE7
**************************************************/

function width_fix() {
	
	var sidebar_width = 0;
	
	if (jQuery.browser.msie && jQuery.browser.version=='7.0') {
		
		if (jQuery('.sliderContent').width() != null) {
			
			if (jQuery('.sidebar').width() != null) {
				sidebar_width = jQuery('.sidebar').width() + 41;
			}
			
			jQuery('.content').width(jQuery('.sliderContent').width() + 60 + sidebar_width);
		}
	}
}

/**************************************************
	MENU POSITION
**************************************************/

function menu_pos() {
	
	jQuery('.navigation').css('top', (jQuery(window).height() - jQuery('.navigation').height()) / 2);
	jQuery('.navigation').fadeIn();
}

/**************************************************
	SIDEBAR POSITION
**************************************************/

function sidebar_pos() {
	
	if (jQuery('.widgets').height() < jQuery(window).height() - 60) {
		jQuery('.widgets').css('position', 'fixed');
	}
	
	else {
		jQuery('.widgets').css('position', 'static');
	}
}

/**************************************************
	BACKGROUND
**************************************************/

function background_resize() {
	
	var image = '#background .background';
	var ratio = (jQuery(image).height() / jQuery(image).width()).toFixed(2);
	var browserwidth = jQuery(window).width();
	var browserheight = jQuery(window).height();
	var offset;
	
	var min_height = 0;
	var min_width = 0;
	var fit_landscape = 0;
	var fit_portrait = 0;
	var horizontal_center = 1;
	var vertical_center = 1;
	
	if (jQuery('.content').hasClass('portrait')) {
		var fit_portrait = 1;
	}
	
	if ((browserheight > min_height) || (browserwidth > min_width)){
		if ((browserheight/browserwidth) > ratio){
			if (fit_landscape && ratio <= 1){
				jQuery(image).width(browserwidth);
				jQuery(image).height(browserwidth * ratio);
			}
			
			else{
				jQuery(image).height(browserheight);
				jQuery(image).width(browserheight / ratio);
			}
		}
		
		else {
			if (fit_portrait && ratio > 1){
				jQuery(image).height(browserheight);
				jQuery(image).width(browserheight / ratio);
			}
			
			else{
				jQuery(image).width(browserwidth);
				jQuery(image).height(browserwidth * ratio);
			}
		}
	}
	
	if (horizontal_center){
		jQuery(image).css('left', (browserwidth - jQuery(image).width()) / 2);
	}
	
	if (vertical_center){
		jQuery(image).css('top', (browserheight - jQuery(image).height()) / 2);
	}
	
	jQuery(image).bind("contextmenu",function(){
		return false;
	});
	
	jQuery(image).bind("mousedown",function(){
		return false;
	});
}

/**************************************************
	DEPLOY
**************************************************/

function deploy() {
	
	content_height();
	blog_height();
	portfolio_height();
	width_fix();
	menu_pos();
	sidebar_pos();
}

/**************************************************
	DOCUMENT RESIZE
**************************************************/

window.onresize = function() {
	
	deploy();
	background_resize();
};

/**************************************************
	SOCIAL ICONS
**************************************************/

function social() {

	jQuery('ul.social li').hover(function() {
		jQuery(this).animate(
			{opacity: '1'}, {queue:false, duration: 200}
		);
	},
	function() {
		jQuery(this).animate(
			{opacity: '0.5'}, {queue:false, duration: 200}
		);
	});
}

/**************************************************
	MENU
**************************************************/

function menu() {
	
	jQuery('div.navigation ul.menu li').hover(function() {
		jQuery(this).not('ul.sub-menu li').find('a:eq(0)').stop().animate({
			paddingLeft: '20px'}, {queue:false, duration: 200
		}).removeClass('theme_color_1').addClass('theme_color_2');
		
		jQuery(this).find('ul:eq(0)').show();
	},
	function(){
		jQuery(this).not('ul.sub-menu li').find('a:eq(0)').stop().animate({
			paddingLeft: '10px'}, {queue:false, duration: 200
		}).removeClass('theme_color_2').addClass('theme_color_1');
		
		jQuery(this).find('ul').hide();
	});
}

/**************************************************
	MENU - SEARCH
**************************************************/

function menu_search() {
	
	jQuery('.navigation .search').hover(function(){
		jQuery(this).animate({left: '0px'}, {queue:false, duration: 200});
	},
	function(){
		jQuery(this).animate({left: '-150px'}, {queue:false, duration: 200});
	});
}

/**************************************************
	LIGHTBOX - PRETTY PHOTO
**************************************************/

function lightbox() {
	
	jQuery("a[rel^='prettyPhoto'], a[rel^='lightbox']").prettyPhoto({
		showTitle : false,
		theme : 'facebook'
	});
}

/**************************************************
	CONTENT IMAGES
**************************************************/

function image() {

	jQuery("a[rel^='lightbox']").hover(function() {
		jQuery("a[rel^='lightbox']").not(this).animate(
			{opacity: '0.5'}, {queue:false, duration: 100}
		);
	},
	function() {
		jQuery("a[rel^='lightbox']").not(this).animate(
			{opacity: '1'}, {queue:false, duration: 100}
		);
	});
}

/**************************************************
	BLOG
**************************************************/
var loadingQuotesMutex = false;
function templateNewQuotes(jsonObj) {
  for(i = 0; jsonObj[i + '_content']; i++) {
    var newItem = '<li>\n'
			+ '<a href="#">'
			+ jsonObj[i + '_content']
			+ '<span class="date">Name: '  + jsonObj[i + '_owner_name'] + '</span>\n'
      + '</a>\n'
      + '</li>\n';
    newItem = $(newItem);
    // to show arrow on hover
    newItem.find('a').hover(function() {
			jQuery(this).animate({paddingRight: '20px'}, {queue:false, duration: 200});
		},
		function(){
			jQuery(this).animate({paddingRight: '10px'}, {queue:false, duration: 200});
		});
    
    $('#progress-quote').before(newItem);
  }
}

function loadNewQuotes() {
    var urlJSON = getNewQuotesURL;
    var dataJSON = {
        totalQuotes: $('.nav.blog .navMask .navContent li').length,
    };
    
    var requestJSON = $.ajax({
        url: urlJSON,
        data: dataJSON,
        
    })
    .done(function(data, textStatus, jqXHR) {
      templateNewQuotes(data);
      $('#progress-quote').fadeOut();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
    })
    .always(function (jqXHR, textStatus, errorThrown) {
      loadingQuotesMutex = false;
      $('#progress-quote').fadeOut();
    });
}
function checkForNewQuotes() {
    var urlGET = checkForNewQuotesURL;
    var dataGET = {
        totalQuotes: $('.nav.blog .navMask .navContent li').length,
    };
    
    var requestGET = $.ajax({
        url: urlGET,
        data: dataGET,
    })
    .done(function(data, textStatus, jqXHR) {
        if (parseInt(data) > 0) {
          $('#progress-quote').fadeIn();
          loadNewQuotes();
        } else {
          $('#progress-quote').fadeOut();
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        $('#progress-quote').fadeOut();
        loadingQuotesMutex = false;
    });
}
function tryLoadNewQuotes() {
    if(loadingQuotesMutex) {
        return;
    } else {
        loadingQuotesMutex = true;
    }
    checkForNewQuotes();
}
function blog() {
	
	if (!(jQuery('body').is('.mobile'))) {
		
		jQuery('.nav.blog .navContent li a').hover(function() {
			jQuery(this).animate({paddingRight: '20px'}, {queue:false, duration: 200});
		},
		function(){
			jQuery(this).animate({paddingRight: '10px'}, {queue:false, duration: 200});
		});
		
		var numberOfDownPresses = 0;
    var animationMutex = false;
		jQuery(document).keydown(function(e) {
            var upCode = 38;
            var downCode = 40;
            if (e.which != upCode && e.which != downCode && e.keyCode != upCode && e.keyCode != downCode) {
              return ;
            } else {
              if(!e.which) {
                e.which = e.keycode;
              }
            }
            var height = $(window).height();
            var galleryHeight = jQuery('.nav.blog .navMask .navContent').height();
            if (galleryHeight > height && (e.which == upCode || e.which == downCode)) {
              var totalNumberOfQuotes = $('.nav.blog .navMask .navContent li').length;
              var heightOfOneQuote = 35;
              var numberOfVisibleQuotes = height / heightOfOneQuote;
              var amountOfOneAnimation = - heightOfOneQuote;
              
              var temp = numberOfDownPresses;
              if(e.which == upCode) {
                  temp = numberOfDownPresses - 1;
              } else if (e.which == downCode) {
                  temp = numberOfDownPresses + 1;
              }
              
              var destY = amountOfOneAnimation * temp;
              if(destY > 0) {
                  destY = 0;
              } else if (Math.abs(destY) > galleryHeight - height) {
                  destY = -(galleryHeight - height);
              } else {
                  numberOfDownPresses = temp
              }
              
              console.log('numberOfDownPresses: ' + numberOfDownPresses);
              console.log('destY: ' + destY);
              console.log('height of nav: ' + jQuery('.nav.blog .navMask .navContent').height());
              jQuery('.nav.blog .navMask .navContent').animate({top: destY}, {duration: 50});
              if (totalNumberOfQuotes - (numberOfDownPresses + Math.floor(numberOfVisibleQuotes)) < 5) {
                  tryLoadNewQuotes();
              }
            }
                
		});
	}
}

/**************************************************
	PORTFOLIO
**************************************************/
var loadingImagesMutex = false;

function templateNewImages(jsonObj) {
  for(i = 0; jsonObj[i + '_situation']; i++) {
    var newItem = '<li class="item">\n'
			+'<h4>' + jsonObj[i + '_situation'] + '</h4>\n'
			+'<p class="image"><a href="javascript:void(0)">\n'
			+'<img src="' + jsonObj[i + '_thumb_image'] + '" alt="' + jsonObj[i + '_image'] + '" title=""></a></p>\n'
			+'<p class="details">' + jsonObj[i + '_situation'] + '</p>\n'
      +'<p class="more"><a href="javascript:void(0);">VIEW DETAILS</a></p>\n'
      +'</li>\n';
    newItem = $(newItem);
    // to show arrow on hover
    newItem.find('p.image img').hover(function(){
    jQuery(this).animate({opacity: '0.5'}, {queue:false, duration: 200});
    },
    function(){
      jQuery(this).animate({opacity: '1'}, {queue:false, duration: 200});
    });
    //
    newItem.hover(function(){
			jQuery(this).animate({right: '0px'}, {queue:false, duration: 200});
		},
		function(){
			jQuery(this).animate({right: '-10px'}, {queue:false, duration: 200});
		});
    ////
    newItem.find('p.image a').click(function(e) {
      $('.loading').fadeIn();
      var htmlUrl = '<img src="' + $(this).find('img').attr("alt") + '" alt="" class="background" />';
      $('#background').html(htmlUrl);
      $('#background img').load(function() {
        background_resize();
        $(this).fadeIn();
        $('.loading').fadeOut();
      });
    });
    ////////
    newItem.find('p.more a').click(function(){
            $(this).parent().parent().find('p.image a').click();
        });
    $('#progress-img').before(newItem);
  }
}

function loadNewImages() {
    var urlJSON = getNewMemoriesURL;
    var dataJSON = {
        totalImages: $('.image').length,
    };
    
    var requestJSON = $.ajax({
        url: urlJSON,
        data: dataJSON,
        
    })
    .done(function(data, textStatus, jqXHR) {
      templateNewImages(data);
      $('#progress-img').fadeOut();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
    })
    .always(function (jqXHR, textStatus, errorThrown) {
      loadingImagesMutex = false;
      $('#progress-img').fadeOut();
    });
}
function checkForNewImages() {
    var urlGET = checkForNewMemoriesURL;
    var dataGET = {
        totalImages: $('.image').length,
    };
    
    var requestGET = $.ajax({
        url: urlGET,
        data: dataGET,
    })
    .done(function(data, textStatus, jqXHR) {
        if (parseInt(data) > 0) {
          $('#progress-img').fadeIn();
          loadNewImages();
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        $('#progress-img').fadeOut();
        loadingImagesMutex = false;
    });
}
function tryLoadNewImages() {
    if(loadingImagesMutex) {
        return;
    } else {
        loadingImagesMutex = true;
    }
    checkForNewImages();
}


function portfolio() {
	
	if (!(jQuery('body').is('.mobile'))) {
		
		jQuery('.nav.portfolio .navMask ul.navContent li').not('.paging').hover(function(){
			jQuery(this).animate({right: '0px'}, {queue:false, duration: 200});
		},
		function(){
			jQuery(this).animate({right: '-10px'}, {queue:false, duration: 200});
		});
		
		jQuery('.nav.portfolio .navMask ul.navContent li p.image img').hover(function(){
			jQuery(this).animate({opacity: '0.5'}, {queue:false, duration: 200});
		},
		function(){
			jQuery(this).animate({opacity: '1'}, {queue:false, duration: 200});
		});
        var numberOfDownPresses = 0;
        var animationMutex = false;
		jQuery(document).keydown(function(e) {
            var upCode = 38;
            var downCode = 40;
            if (e.which != upCode && e.which != downCode && e.keyCode != upCode && e.keyCode != downCode) {
              return ;
            } else {
              if(!e.which) {
                e.which = e.keycode;
              }
            }
            var height = $(window).height();
            var galleryHeight = jQuery('.nav.portfolio .navMask .navContent').height();
            if (galleryHeight > height) {
              var totalNumberOfImages = $('.image').length;
              var heightOfOneImage = 80;
              var numberOfVisibleImages = height / 80;
              var amountOfOneAnimation = -heightOfOneImage;
              
              var temp = numberOfDownPresses;
              if(e.which == upCode) {
                  temp = numberOfDownPresses - 1;
              } else if (e.which == downCode) {
                  temp = numberOfDownPresses + 1;
              }
              
              var destY = amountOfOneAnimation * temp;
              if(destY > 0) {
                  destY = 0;
              } else if (Math.abs(destY) > galleryHeight - height) {
                  destY = -(galleryHeight - height);
              } else {
                  numberOfDownPresses = temp
              }
              
              console.log('numberOfDownPresses: ' + numberOfDownPresses);
              console.log('destY: ' + destY);
              console.log('height of nav: ' + jQuery('.nav.portfolio .navMask .navContent').height());
              jQuery('.nav.portfolio .navMask .navContent').animate({top: destY}, {duration: 50});
              if (totalNumberOfImages - (numberOfDownPresses + Math.floor(numberOfVisibleImages)) < 5) {
                  tryLoadNewImages();
              }
            }
                
		});
	}
}

/**************************************************
	BACKGROUND
**************************************************/

function background() {
	
	jQuery(window).load(function() {
		jQuery('#background img').fadeIn();
		background_resize();
	});
}

/**************************************************
	HEADERS
**************************************************/

function headers() {
	
	jQuery('.sliderContent > h1, .sliderContent > h2, .sliderContent > h3').wrapInner('<span class="title"></span>');
}

/**************************************************
	DOCUMENT READY
**************************************************/

jQuery(document).ready(function() {
	
	social();
	menu();
	menu_search();
	lightbox();
	image();
	blog();
	portfolio();
	background();
	headers();
	deploy();
	
	jQuery(window).load(function() {
		deploy();
	});
});
