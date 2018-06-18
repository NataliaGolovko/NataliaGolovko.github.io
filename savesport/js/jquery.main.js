articlesSlider = 0;
$(function(){

    if($('.slider').length) {

        if($(window).width() < 830) {
            $('.slider').css({
                'height':'385px',
                'overflow':'hidden'
            });
        } else {
            $('.slider').css({
                'height':'740px',
                'overflow':'hidden'
            });
        }

        $('.slider li img').css('opacity', 0);

        $('.slider ul').bxSlider({
            mode:'fade',
            controls: false
        })

    }

    $('.product-wrap .show-items').on('click', function(e){

        e.preventDefault();
        $(this).parent().find('.product-list').slideDown();
        $(this).remove();
    })

    if($(window).width() < 1000){
        radioList();
    }

    if($('.gallery').length){
        $('.gallery').bxSlider({
            mode:'fade',
            onSlideBefore: function($slideElement){
                $('.gallery .text-box').animate({
                    'opacity': '0',
                    'left': '10px'
                }, 500);
                setTimeout(function(){
                    $slideElement.find('.text-box').animate({
                        'opacity': '1',
                        'left': '0px'
                    },500)
                }, 500)
            },
            onSliderLoad: function($slideElement){
                $('.gallery .text-box').animate({
                    'opacity': '1',
                    'left': '0px'
                }, 500);
            }
        })
    }

    if($('.articles-slider').length){
        if($(window).width() > 1000){
            articlesSlider = $('.articles-slider').bxSlider({
                maxSlides: 2,
                minSlides: 2,
                slideWidth: 350,
                infiniteLoop: false,
                controls: false
            });
        } else {
            articlesSlider = $('.articles-slider').bxSlider({
                maxSlides:1,
                minSlides: 1,
                slideMargin: 20,
                controls: false
            })
        }

    }



    if($('.similar').length){
        similarSlider =  $('.similar').bxSlider({
            controls: false
        });
    }

    dropDown();
    itemHeight();
    headerSearch();
    headerFixed();
    panelFixed();
    accordion('.mob-nav>li>a', '>ul');
    accordion('.mob-nav>li>ul>li>a', '>ul');
    accordion('.footer-section.accordion .footer-ttl', '>ul');
    accordion('.sidebar-ttl', '.sidebar-body');
    accordion('.opener', '.drop');
    accordion('.question', '.answer');
    mobileMenu();
    popup();
    sidebarMob();
    sidebarPopup();
    tabs('.tab-menu li a', '.tab-content .tab');
    cartGallery();
    tabsAccordion();

    $(window).scroll(headerFixed);


    if($('.mob-tools').hasClass('light')){
        $(this).find('.search-container .holder .close').on('click', function(){
            $('.mob-tools').removeClass('light');
            $('.search-container').hide();
        })
    } else{
        $(this).find('.search').on('click', function(){
            $('.mob-tools').addClass('light');
            $('.search-container').show();
        });
        $(document).on('click', '.search-container .close', function(){
            $('.mob-tools').removeClass('light');
            $('.search-container').hide();
        })
    }

    $(window).load(function(){
        $('.slider').removeAttr('style');
        sliderImg();
    });

    $(window).resize(function(){
        sliderImg();
        tabsAccordion();


        if($('.articles-slider').length){
            if($(window).width() < 1000){
                articlesSlider.reloadSlider({
                    maxSlides:1,
                    moveSlides:1,
                    slideMargin: 20,
                    controls: false
//                    infiniteLoop: false
                });
            } else {
                articlesSlider.reloadSlider({
                    maxSlides: 2,
                    minSlides: 2,
                    slideWidth: 350,
                    infiniteLoop: false,
                    controls: false
                });
            }
        }

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
        });
    }

    if($('.sidebar').length) {
        topPosition = $('.sidebar').offset().top;
        stopFixed = $('.main-wrap').height() - 90;
        fixedSidebar();
    }

});

function sliderImg() {
    var num = 386,
        flag = false,
        img = $('.slider li img');

    if($('.slider').length){
        if($('.slider').height() < num) {
            flag = true;
        }
        if(flag) {
            img.css({
                'width':'auto',
                'left': '50%',
                'height':'385px',
                'margin-left': -img[0].naturalWidth/5 - 50 + 'px',
                'opacity':1
            })
        }
        if($(window).width() > 829) {
            $('.slider li img').removeAttr('style');
        }
    }
}

function dropDown() {
    var drop = $('.drop-down'),
        menuItem = $('.main-nav a'),
        menuWrap = $('.drop-down .drop-menu'),
        recommend = $('.drop-down .recommend'),
        dropHeight,
        timer,
        timer2,
        href;

    var dropSpeed = 400,
        closeDropSpeed = 250,
        addActiveDelay = 100,
        removeActiveDelay = 600;


    menuItem.each(function(){
        $(this).mouseenter(function(){
            clearTimeout(timer2);
            var el = $(this);
            timer2 = setTimeout(function(){
                if(el.attr('href') != href) {
                    href = el.attr('href');
                    if(drop.height() == 0) {
                        $(href).show();
                        $(href).css('opacity', 0);
                        $(href).animate({
                            'opacity':1,
                            'top':0
                        }, dropSpeed);
                        setTimeout(function(){
                            recommend.animate({
                                'opacity':1
                            }, dropSpeed)
                        }, dropSpeed);
                        changeHeight();
                    } else {
                        menuWrap.hide();
                        $(href).show();
                        $(href).css({
                            'opacity': 0,
                            'top':'-30px'
                        });
                        $(href).animate({
                            'opacity':1,
                            'top':0
                        }, dropSpeed);
                        changeHeight()
                    }
                    setTimeout(function(){
                        $('.main-header, .main-header a.search-toggle').addClass('active');
                    }, addActiveDelay);
                }
            }, 200)
        }).mouseleave(function(){
            clearTimeout(timer2);
        });
    });

    function changeHeight() {
        dropHeight = drop.find('>.wrapper').height() + 225;
        drop.animate({
            'height':dropHeight
        }, dropSpeed);
    }

    function closeDrop() {
        clearTimeout (timer);
        timer = setTimeout(function(){

            $(href).animate({
                'opacity':0
            }, dropSpeed);

            recommend.animate({
                'opacity':0
            }, dropSpeed);

            setTimeout(function(){
                drop.stop().animate({
                    'height':0
                }, closeDropSpeed);
            }, dropSpeed);

            setTimeout(function(){
                $('.main-header, .main-header a.search-toggle').removeClass('active');
            }, removeActiveDelay);

            setTimeout(function(){
                menuItem.removeAttr('style');
                menuWrap.removeAttr('style');
                recommend.removeAttr('style');
                href = '';
            }, dropSpeed);
        }, 200);
    }

    drop.mouseleave(function(){
        closeDrop()
    });
    $('.top-header').mouseenter(function(){
        closeDrop()
    });

    drop.mouseenter(function(){
        clearTimeout (timer);
    });
    menuItem.mouseenter(function(){
        clearTimeout (timer);
    });

}


function itemHeight() {
    $('.catalog-list').each(function(){
        var highestItem = 0;

        $('.catalog-item', this).each(function(){
            if($(this).height() > highestItem) {
                highestItem = $(this).height();
            }
        });
        $('.catalog-item', this).height(highestItem);
    })
}

function headerSearch(){
    var opener = $('.search-toggle'),
        searchBlock = $('.header-search'),
        headerRow = $('.main-header'),
        nav = $('.main-nav');
        autocompliteBlock = $('.autocomplete', headerRow);


    opener.on('click', function(e){
        e.preventDefault();

        var btn = $(this);
        btn.hide();
        headerRow.find('.search-wrap').css('overflow', 'hidden');
        autocompliteBlock.css('opacity', '0');

        if(!($(this).hasClass('close'))){
            nav.hide();
            headerRow.addClass('open-search');
            headerRow.find('.search-wrap').show().find(searchBlock).animate({
                left: 0,
                opacity: 1
            }, 500, 'easeOutExpo');
            setTimeout(function(){
                btn.addClass('close').fadeIn(200);
                headerRow.find('.search-wrap').css('overflow', 'visible');
            }, 200);
            setTimeout(function(){
                autocompliteBlock.animate({
                    'opacity':1
                }, 200)
            }, 300);
        } else {
            headerRow.find('.search-wrap').find(searchBlock).animate({
                left: '80%',
                opacity: 0
            }, 500, 'easeOutExpo');
            setTimeout(function(){
                btn.removeClass('close').fadeIn(200);
                headerRow.removeClass('open-search');
                headerRow.find('.search-wrap').hide();
                nav.show();
            }, 200);
        }
    })
}

function headerFixed(){
    var top = 100,
        header = $('.top-header.fixed');

    if($(window).scrollTop() > top){
        header.fadeIn();
    } else{
        header.fadeOut();
    }
}

function accordion(element, drop){

    $(element).on('click', function(){
        if($(this).hasClass('active')) {
            $(this).parent().find(drop).stop().slideUp().removeClass('opened');
            $(this).removeClass('active')
        } else {
            $(this).parent().find(drop).stop().slideDown().addClass('opened');
            $(this).addClass('active');
            if($('.similar').length){
                similarSlider.reloadSlider();
            }
        }
    })
}

function mobileMenu(){
    var opener = $('.header .mob-menu-open'),
        menu = $('.mob-menu'),
        page = $('.page');

    opener.on('click', function(){
        if($(this).hasClass('active')){
            page.animate({
                'left': '0px'
            }, 400);
            $(this).removeClass('active')
        } else{
            page.animate({
                'left': menu.width()
            }, 400);
            $(this).addClass('active')
        }
    })
}

function popup(){
    var opener = $('.open-popup'),
        closer = $('.popup .btn-close'),
        popup = $('.popup');

    opener.on('click', function(e){
        e.preventDefault();
        popup.fadeIn(50).animate({
            'top': '20px',
            'opacity': '1'
        }, 100);
    });

    closer.on('click', function(e){
        e.preventDefault();
        popup.animate({
            'top': '10px',
            'opacity': '0'
        }, 100).fadeOut();
    });
}

function fixedSidebar() {
    if($('.sidebar').length){
        if($(window).width() > 1000) {

            var sidebar = $('.sidebar-content'),
                fixedClass = 'fixed-sidebar',
                sidebarHeight = sidebar.height();

            if($(window).scrollTop() > topPosition && $(window).height() > sidebarHeight) {
                sidebar.addClass(fixedClass);
            } else {
                sidebar.removeClass(fixedClass);
            }
            if($(window).scrollTop() > stopFixed) {
                sidebar.addClass('stop');
            } else {
                sidebar.removeClass('stop');
            }

        }
    }
}


$(window).scroll(function(){
    fixedSidebar();
    panelFixed();
});

$(window).resize(function(){
    fixedSidebar();
});

function sidebarMob(){
    var opener = $('.right-btn-filtr'),
        closer = $('.btn-close-sidebar'),
        sidebar = $('.sidebar');

    opener.on('click', function(e){
        e.preventDefault();
        sidebar.fadeIn(200)
    });
    closer.on('click', function(e){
        e.preventDefault();
        sidebar.fadeOut(200)
    });

}

function sidebarPopup(){
    $('.sidebar-content').on('change','input', function(){
        $('.sidebar-content .result span').html(Math.ceil(Math.random() * 1000));
        $('.sidebar-content .result').fadeIn();
        var position = $(this).closest('.row').position().top - 19;
        $('.sidebar-content .result').css('top', position + 'px');
        setTimeout(function(){
            $('.sidebar-content .result').fadeOut(500);
        }, 1200);
    });
}

function tabs(tabLink, tabContent) {
    $(tabLink).on('click', function(e){
        e.preventDefault();
        $(tabLink).removeClass('active');
        $(this).addClass('active');
        $(tabContent).hide();
        $($(this).attr('href')).show();
    });

    $(tabContent).hide();
    $(tabContent).first().show();
}

function cartGallery(){
    var link = $('.card-list a'),
        photo = $('.card-photo .photo');

    link.on('click', function(e){
        e.preventDefault();
        link.removeClass('active');
        $(this).addClass('active');
        photo.removeClass('active');
        $($(this).attr('href')).addClass('active');

    })
}

function tabsAccordion(){
    var tab = $('.tab-content .tab');

    if($(window).width() < 820){
        tab.removeAttr('style');
        if(!tab.find('.drop').hasClass('opened')){
            tab.find('.drop').hide();
        }
    } else {
        tab.hide().find('.drop').removeAttr('style').removeClass('opened');
        tab.first().show();
        tab.find('.opener').removeClass('active');
    }
    /*if($('.similar').length){
        similarSlider.reloadSlider();
    }*/
}

function radioList() {
    var btn = $('.radio-list label');

    btn.on('click', function(e){
        $(this).closest('ul').toggleClass('opened');
        btn.parent().removeClass('active');
        $(this).parent().addClass('active');

    })
}

function panelFixed(){
    var top = 700,
        panel = $('.fixed-items');

    if($(window).width() < 820){
        if($(window).scrollTop() > top){
            panel.slideDown();
        } else{
            panel.slideUp();
        }
    } else{
        panel.slideUp();
    }
}








