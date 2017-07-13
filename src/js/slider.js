/* ========================================================================
 * Front Street: slider.js v1.0.0
 * ========================================================================
 * Copyright 2017 Theme Blvd
 * Licensed under MIT
 * ========================================================================
 * Our slider implementations rely on the OwlCarousel script.
 * @author David Deutsch
 * @link http://owlcarousel2.github.io/OwlCarousel2/
 * ======================================================================== */

+function ($) {

	'use strict';

	if ( ! FrontStreet.doComponent('slider') ) {
		return;
	}

	if ( ! $.fn.owlCarousel ) {
		return;
	}

	$(window).on('load', function() {

		$('.fs-simple-slider, .fs-gallery-slider, .fs-block-slider').each(function() {

			var $wrap 			= $(this),
				$slider 		= $wrap.find('.fs-slider'),
				items			= parseInt($wrap.data('items')) ? parseInt($wrap.data('items')) : 4,
				speed 			= parseInt($wrap.data('speed')) ? parseInt($wrap.data('speed')) : 500,
				autoplayTimeout = parseInt($wrap.data('autoplay')) ? parseInt($wrap.data('autoplay')) : 0,
				margin			= parseInt($wrap.data('margin')) ? parseInt($wrap.data('margin')) : 1,
				autoplay		= autoplayTimeout ? true : false,
				pause			= ($wrap.data('pause') == 'true' || $wrap.data('pause') == '1') ? true : false,
				loop			= ($wrap.data('loop') == 'false' || $wrap.data('loop') == '0') ? false : true,
				animate			= ($wrap.data('fade') == 'true' || $wrap.data('fade') == '1') ? 'fadeOut' : false,
				autoWidth		= $wrap.hasClass('fs-gallery-slider') ? true : false,
				center			= $wrap.hasClass('fs-gallery-slider') ? true : false,
				$nav 			= $wrap.find('.fs-slider-nav, .fs-slider-thumbs'),
				$arrows 		= $wrap.find('.fs-slider-arrows'),
				navCounter		= 0,
				timeout			= null;

			// Toggle "hovered" class on/off for any CSS
			// hover effects.
			$wrap
				.on('mouseenter', function() {
					$(this).addClass('hovered');
				})
				.on('mouseleave', function() {
					$(this).removeClass('hovered');
				});

			// Add slide-to data to each nav item.
			$nav.find('li').each(function() {
				$(this).data('slide-to', navCounter);
				navCounter++;
			});

			if ( $wrap.hasClass('fs-simple-slider') ) {
				margin = 0;
				items = 1;
			} else if ( $wrap.hasClass('fs-gallery-slider') ) {
				items = 1;
			}

			$slider.owlCarousel({
				items: items,
				nav: false,
				dots: true, // Must be enabled for e.page.index to work.
				loop: loop,
				smartSpeed: speed,
				autoplay: autoplay,
				autoplayTimeout: autoplayTimeout,
				autoplayHoverPause: pause,
				animateOut: animate,
				autoWidth: autoWidth,
				margin: margin,
				center: center,
				rtl: $('body').hasClass('rtl') ? true : false,
				onInitialized: function(e) {

					$nav.find('li:first-child').addClass('active');
					$wrap.addClass('loaded');

					if ( ! loop ) {
						$arrows.find('li').addClass('fade');
					}
				},
				onChanged: function(e) {

					// Make sure next and prev buttons don't show
					// when at start and end of cycle, if there's
					// no looping.

					if ( ! loop ) {

						var index = $wrap.hasClass('fs-block-slider') ? e.item.index : e.page.index;

						if ( index == 0 || index == -1 ) {
							$arrows.find('li.prev').removeClass('in');
							$arrows.find('li.next').addClass('in');
						} else if ( e.page.index + 1 == e.page.count ) {
							$arrows.find('li.next').removeClass('in');
							$arrows.find('li.prev').addClass('in');
						} else {
							$arrows.find('li').addClass('in');
						}

					}

					// Standard navigation dots.
					$nav.find('li').removeClass('active');
					$nav.find('li:nth-child(' + (e.page.index + 1) + ')').addClass('active');

				}
			});

			// Bind standard slider nav and thumb nav.
			$nav.find('li').on('click', function() {

				var $current = $(this);

				$slider
					// .trigger( 'stop.owl.autoplay' ) // Doesn't work right as of v2.2.1.
					.trigger( 'to.owl.carousel', $current.data('slide-to') );

				$current.closest('ul, ol').find('li').removeClass('active');
				$current.addClass('active');

			});

			// Bind slider arrow next/prev nav.
			$arrows.find('li').on('click', function() {

				// $slider.trigger('stop.owl.autoplay'); // Doesn't work right as of v2.2.1.

				if ( $(this).hasClass('next') ) {
					$slider.trigger('next.owl.carousel');
				} else {
					$slider.trigger('prev.owl.carousel');
				}

			});

		}); // End .each()

	}); // End .on('load')

}(jQuery);
