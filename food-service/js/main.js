$(document).ready(function () {

	$('.js-slider').owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		animateOut: 'fadeOut',
		mouseDrag: false
	});

	$('.js-select-style').styler();
	$('.number-plus-minus input[type=number]').styler();

	mobileMenu();
	amountDrop();
	sidebarAccordion();
	slideBlock('Не указывать контактное лицо', 'Указывать контактное лицо');
	showPassword();
	orderDateDetails();
	ratingBar();
	menuDropdown();
	initPopups();
	if($(window).width() < 768) {
		scrollHeader();
	}

	$('.js-show-more').on('click', function(e){
		e.preventDefault();
		$(this).parent().addClass('alltext');
		$(this).remove();
	});

	if($( ".slider-range-bar").length){

		$('.slider-range-bar').each(function(){
			var $this = $(this);
			var min = $this.data('min');
			var max = $this.data('max');
			$this.slider({
				range: true,
				min: min,
				max: max,
				values: [ min, max ],
				create: function( event, ui ) {
					$this.parent().find('input.min').val(min);
					$this.parent().find('input.max').val(max);
				},
				slide: function( event, ui ) {
					$this.parent().find('input.min').val(ui.values[0]);
					$this.parent().find('input.max').val(ui.values[1]);
				},
				stop: function( event, ui ) {
					$this.parent().find('input.min').trigger('change');
				}
			});
			$('input.min').on('keydown', function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||(/65|67|86|88/.test(e.keyCode)&&(e.ctrlKey===true||e.metaKey===true))&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
			$('input.max').on('keydown', function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||(/65|67|86|88/.test(e.keyCode)&&(e.ctrlKey===true||e.metaKey===true))&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});

			$('input.min').keyup(function(){
				var maxVal = $('input.max').val();
				$this.slider({
					values: [ $(this).val(), maxVal ]
				})
			});
			$('input.max').keyup(function(){
				var minVal = $('input.min').val();
				$this.slider({
					values: [ minVal, $(this).val() ]
				})
			})
		});
	}

	if($('input.mask').length) {
		$('input.mask').inputmask({
			mask: '+7 999 999-99-99'
		});
	}

	if($('.sale-info').length) {
		$('.sale-info').each(function(){
			var el = $(this),
				p = el.find('p');
			p.css('max-height', el.innerHeight() - el.find('.sub-ttl').outerHeight() - el.find('.bottom-info').outerHeight() - 36).dotdotdot();
		})
	}

	if($('.tooltip').length) {
		$('.tooltip').each(function(){
			var el = $(this);
			if($(window).width() < 1000) {
				el.find('svg').click(function(){
					el.addClass('tooltip-info-shown');
				});
				el.find('.close-tooltip-mobiles').click(function(){
					$(this).parent().parent().removeClass('tooltip-info-shown');
				})
			} else {
				el.hover(function(){
					el.addClass('tooltip-info-shown');
				}, function(){
					el.removeClass('tooltip-info-shown');
				})
			}
		});
	}

});

function mobileMenu() {
	$('.js-menu-opener').on('click', function(e){
		e.preventDefault();
		$('body').toggleClass('menu-opened');
		$(this).toggleClass('active');
	});
	$('.menu-fader').on('click', function(){
		$('body').removeClass('menu-opened');
		$('.js-menu-opener').removeClass('active');
	})
}

function amountDrop() {
	var amountOpener = $('.js-amount-opener'),
		amountAdjuster = $('.js-amount-adjuster'),
		amountValue = $('.js-amount-value'),
		newAmount;

	amountOpener.on('click', function(){
		var el = $(this);
		if(el.parent().find(amountAdjuster).hasClass('opened-amountAdjuster')) {
			el.parent().find(amountAdjuster).removeClass('opened-amountAdjuster').css('top', '-9999em');
			newAmount = el.parent().find(amountAdjuster).find('input[type=number]').val();
			el.parent().find(amountValue).text(newAmount);
		} else {
			el.parent().find(amountAdjuster).addClass('opened-amountAdjuster').css('top', '90%');
		}
	});
	// $(document).on('mouseup', function(e){
	// 	if ($(e.target) != amountOpener && !$('.amount-box').find(e.target).length) {
	// 		var openedItem = $('.opened-amountAdjuster').closest('.amount-box');
	// 		newAmount = $('.opened-amountAdjuster').find('input[type=number]').val();
	// 		openedItem.find(amountValue).text(newAmount);
	// 		amountAdjuster.removeClass('opened-amountAdjuster').hide();
	// 	}
	// })
}

function sidebarAccordion() {
	var opener = $('.js-block-opener'),
		openedBlock = $('.js-opened-block');

	opener.on('click', function(e){
		e.preventDefault();
		var $this = $(this);
		$this.toggleClass('opened').next(openedBlock).stop().slideToggle();
	})
}

function slideBlock(openedText, closedText) {
	var opener = $('.js-more-info-opener'),
		slide = $('.js-more-info-block');

	opener.each(function(){
		var el = $(this);
		if(el.hasClass('opened')) {
			el.text(openedText);
			el.next(slide).show();
		} else {
			el.text(closedText);
		}
	});

	opener.on('click', function(){
		var el = $(this);
		if(el.hasClass('opened')) {
			el.text(closedText).removeClass('opened').next(slide).slideUp(300);
		} else {
			el.text(openedText).addClass('opened').next(slide).slideDown(300);
		}
	});
}

function showPassword() {
	var passwordBlock = $('.js-password'),
		showPasswordBtn = passwordBlock.find('.js-show-password'),
		passwordField = passwordBlock.find('.js-password-field');

	if(passwordBlock.length) {
		showPasswordBtn.on('click', function(){
			var el = $(this);
			if(el.hasClass('show')) {
				el.removeClass('show').find('img').attr('src', 'images/icons-29.svg');
				passwordField.attr('type', 'password');
			} else {
				el.addClass('show').find('img').attr('src', 'images/icons-30.svg');
				passwordField.attr('type', 'text');
			}
		})
	}
}

function orderDateDetails() {
	var opener = $('.js-order-date-opener'),
		slider = $('.js-order-date-details');
	if(opener.length) {
		opener.on('click', function(){
			$(this).toggleClass('opened');
			$(this).closest('tr').next(slider).toggle();
		})
	}
}

function ratingBar() {
	var item = $('.js-rating-bar li');

	item.on('click', function () {
		item.removeClass('active');
		$(this).prevAll().addBack().addClass('active');
	})
}

function menuDropdown() {
	var opener = $('.js-dropdown-opener'),
		dropdown = $('.js-dropdown');

	opener.on('click', function(){
		$(this).parent().toggleClass('opened').find(dropdown).stop().slideToggle();
	})
}

function initPopups() {
	var opener = $('.open-popup'),
		lightbox = $('.popup'),
		fader = $('.fader'),
		closer = $('.popup .close-popup'),
		id;

	lightbox.each(function(){
		var el = $(this);
		if(el.hasClass('show-me-onload')) {
			popupPosition(el);
			el.fadeIn();
			fader.fadeIn();
		} else {
			el.hide();
		}
	});

	opener.on('click', function(e){
		if($(this).parents('.popup')) {
			$(this).parents('.popup').hide();
		}
		id = $(this).attr('href').substr('1');
		lightbox.each(function(){
			var lightbox_box = $(this);
			if(id == $(this).attr('id')) {
				popupPosition(lightbox_box);
				lightbox_box.fadeIn();
				fader.fadeIn();
			}
		});
		e.preventDefault();
	});

	function disappearLightbox() {

		lightbox.fadeOut();
		setTimeout(function(){
			lightbox.removeAttr('style');
			if($('.page').attr('style')){
				$('body').addClass('open-menu');
			}
		}, 500);
		setTimeout(function(){
			fader.fadeOut();
		}, 100)
	}

	function closeLightbox(element) {
		element.click(function(e){
			disappearLightbox();
			e.preventDefault();
		})
	}

	closeLightbox(fader);
	closeLightbox(closer);

	$(window).keydown(function(eventObject){
		if (eventObject.which == 27){
			disappearLightbox()
		}
	});

}

function popupPosition(popup){

	if(popup.height() > $(window).height()) {
		popup.css({
			'position': 'absolute',
			'top': $(window).scrollTop() + 20,
			'margin-top': 0 + 'px',
			'tranform': 'translateY(0)'

		});
	} else {
		popup.css({
			'top': '50%',
			'margin-top':-popup.height()/2 + 'px',
			'position':'fixed',
			'tranform': 'translateY(-50%)'
		});
	}
}

function scrollHeader() {
	// Hide Header on on scroll down
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('.top-header').outerHeight();

	$(window).scroll(function(event){
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	function hasScrolled() {
		var st = $(this).scrollTop();

		// Make sure they scroll more than delta
		if(Math.abs(lastScrollTop - st) <= delta)
			return;

		// If they scrolled down and are past the navbar, add class .nav-up.
		// This is necessary so you never see what is "behind" the navbar.
		if (st > lastScrollTop && st > navbarHeight){
			// Scroll Down
			$('.top-header').removeClass('nav-down').addClass('nav-up');
		} else {
			// Scroll Up
			if(st + $(window).height() < $(document).height()) {
				$('.top-header').removeClass('nav-up').addClass('nav-down');
			}
		}

		lastScrollTop = st;
	}
}