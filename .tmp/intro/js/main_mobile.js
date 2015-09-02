window.addEventListener('load', function() {
	setTimeout(scrollTo, 0, 0, 1);
}, false);

$(function() {
	//Function to Fix Pages Height
	function fixPagesHeight() {
		console.log($(window).height())
		if ($(window).height() < 380) {
			$('.swiper-warning').show();
		} else {
			$('.swiper-warning').hide();
			$('.swiper-pages, .swiper-warning').css({
				height : $(window).height()
			});
		}
	}


	$(document).bind('touchmove', function(e) {
		e.preventDefault();
	});

	window.addEventListener("orientationchange", function() {
		fixPagesHeight()
		switch(window.orientation) {
		case -90:
		case 90:
			$('.swiper-warning').show();
			break;
		default:
			$('.swiper-warning').hide();
			break;
		}
	}, false);
	$(window).on('resize', function() {
		fixPagesHeight()
	})
	fixPagesHeight()

	//Init Pages
	var swiper = new Swiper('.swiper-pages', {
		scrollContainer : false,
		loop : true,
		mode : 'horizontal',
		offsetPxAfter : 2,
		offsetSlidesAfter : 2,
		pagination : '.swiper-pagination',
		useCSS3Transforms : true
	})

	updateAndroidMarketLinks();
	// some more core here ...

	function updateAndroidMarketLinks() {
		var ua = navigator.userAgent.toLowerCase();
		if (0 <= ua.indexOf("android")) {
			// we have android
			$("a").each(function() {
				this.href = this.href.replace(/^http:\/\/market\.android\.com\//, "market://");
			});
		}
	}

})