
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

function blog() {
	
	if (!(jQuery('body').is('.mobile'))) {
		
		jQuery('.nav.blog .navContent li a').hover(function() {
			jQuery(this).animate({paddingRight: '20px'}, {queue:false, duration: 200});
		},
		function(){
			jQuery(this).animate({paddingRight: '10px'}, {queue:false, duration: 200});
		});
		
		jQuery('.nav.blog .navMask ul.navContent').mousemove(function(e) {
			var _top = parseInt(jQuery('.nav.blog').offset().top);
			var _contentH = parseInt(jQuery('.nav.blog .navMask').height()) + 5;
			var _H = jQuery('.nav.blog').height() - 20;
			var _scH = _contentH - _H;
			var _ypos = e.pageY - _top;
			
			if(_scH > 0) {
				var _contentY = -(_scH / _H)*_ypos + 10;
				jQuery('.nav.blog .navMask .navContent').animate({top: _contentY}, { queue:false, duration: 1000 });
			}
		});
	}
}

/**************************************************
	PORTFOLIO
**************************************************/

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
            var height = $(window).height();
            var galleryHeight = 4000;//jQuery('.nav.portfolio .navMask .navContent').height();
            
            if(galleryHeight > height) {
                var heightOfOneImage = 80;
                var numberOfVisibleImages = height / 80;
                var amountOfOneAnimation = -heightOfOneImage;
                var upCode = 38;
                var downCode = 40;
                
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
