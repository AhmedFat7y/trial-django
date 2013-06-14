
/**************************************************
	SHORTCODES - GALLERY
**************************************************/

function shortcode_gallery() {
	
	jQuery('.gallery dl.gallery-item dt.gallery-icon a img').hover(function(){
		jQuery('.gallery dl.gallery-item dt.gallery-icon a img').not(this).animate(
			{opacity: '0.5'}, {queue:false, duration: 300}
		);
	},
	function(){
		jQuery('.gallery dl.gallery-item dt.gallery-icon a img').not(this).animate(
			{opacity: '1'}, {queue:false, duration: 300}
		);
	});
	
	var link = '.gallery dl.gallery-item dt.gallery-icon a';
	var file = jQuery(link).attr('href');
	var name = /^.+\.([^.]+)$/.exec(file);
	
	if (name != null) {
		jQuery(link).attr('rel', 'prettyPhoto[gallery]');
		jQuery(link).prettyPhoto({
			showTitle : false,
			theme : 'light_square'
		});
	}
}

/**************************************************
	SHORTCODES - ACCORDION
**************************************************/

function shortcode_accordion() {
	
	jQuery('.sc-accordion').accordion({
		header: 'h3'
	});
}

/**************************************************
	SHORTCODES - NIVO SLIDER
**************************************************/

function shortcode_nivo() {
	
	jQuery('.sc-nivo').nivoSlider();
}

/**************************************************
	SHORTCODES - LIGHTBOX
**************************************************/

function shortcode_lightbox() {
	
	jQuery("a[rel^='prettyPhoto']").prettyPhoto({
		showTitle : false,
		theme : 'light_square'
	});
}

/**************************************************
	SHORTCODES - TOOLTIP
**************************************************/

function shortcode_tooltip() {
	
	jQuery('.tooltip.top').tipsy({ gravity: 's' });
	jQuery('.tooltip.right').tipsy({ gravity: 'w' });
	jQuery('.tooltip.bottom').tipsy({ gravity: 'n' });
	jQuery('.tooltip.left').tipsy({ gravity: 'e' });
}

/**************************************************
	SHORTCODES - TOOLTIP
**************************************************/

function shortcode_divider() {
	
	jQuery('.sc-divider a').click(function() {
		jQuery('html, body').animate({scrollTop: 0}, 'slow');
		return false;
	});
}

/**************************************************
	DOCUMENT READY
**************************************************/

jQuery(document).ready(function() {
	
	shortcode_accordion();
	shortcode_gallery();
	shortcode_nivo();
	shortcode_lightbox();
	shortcode_tooltip();
	shortcode_divider();
});