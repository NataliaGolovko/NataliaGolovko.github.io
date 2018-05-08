$(document).ready(function(){
	var scrolled;
	$('.js-menu-opener').on('click', function(e){
		e.preventDefault();
		var menuOpener = $(this),
			body = $('body');
		if(menuOpener.hasClass('opened')) {
			menuOpener.removeClass('opened');
			body.removeClass('fixed');
			$('html, body').scrollTop(scrolled);
		} else {
			scrolled = $(window).scrollTop();
			menuOpener.addClass('opened');
			body.addClass('fixed')
		}
	})
});

$(window).scroll(function(){
	var topHeader = $('.top-header');
	if($(window).scrollTop() > 50) {
		topHeader.addClass('bg-white')
	} else {
		topHeader.removeClass('bg-white')
	}
})