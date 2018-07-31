// Toggle меню
$('[class=toggles]').find('.toggle_btn, h4').click(function() {
    var $parent = $(this).closest('.toggle');
    $parent.toggleClass('opened');
    $parent.find('.toggle_body_text').toggle();
});
$('[class=toggles]').find('.toggle').each(function() {
    if ($(this).hasClass('opened')) {
        $(this).find('.toggle_body_text').show();
    } else {
        $(this).find('.toggle_body_text').hide();
    }
});

// Переключение цен
$('#rates .list_types').find('a').click(function() {
    var id = $(this).attr('data-id');
    if (id == 'price_1') {
        $('[data-coprice="3"]').show();
    } else {
        $('[data-coprice="3"]').hide();
    }
    $('[data-price]').addClass('hidden');
    $('[data-price=' + id + ']').removeClass('hidden');
    $(this).parent().find('a').removeClass('noactive');
    $(this).addClass('noactive');
    return false;
});

$('[data-tooltip]').hover(function() {
    var text = $(this).attr('data-tooltip');
    $(this).append('<span class="tooltip">' + text + '</span>');
}, function() {
    $(this).find('.tooltip').remove();
});



        // Модальные окна - скриншоты
        $(function() {
            $('[data-fancybox]').fancybox({
                // Options will go here
                baseClass: 'modal-view-container',
                thumbs: false,
                infobar: false,
                arrows: true,
                loop: true,
                zoom: false,
                btnTpl: {
                	zoom: '',
                	close:
			            '<div data-fancybox-close class="arrow_close" title="{{CLOSE}}"></div>',
                    arrowLeft:
                        '<div data-fancybox-prev class="arrow_left">' +
                            '<div class="arrow_info">' +
                                '<span class="arrow"></span>' +
                            '</div>' +
                        '</div>',
                    arrowRight:
                        '<div data-fancybox-prev class="arrow_right">' +
                            '<div class="arrow_info">' +
                                '<span class="arrow"></span>' +
                            '</div>' +
                        '</div>',
                },
                afterShow: function(instance, current) {
                    // console.log('test');
                },
                onInit: function() {
                    // console.log('test2')
                }
            });
        });


// Разовое обновление
$('#moreUpdate').click(function() {
    $('#newUpdate').fadeIn();
    return false;
});

// Читать подробнее технические требования
$('#moreTechReq').click(function() {
    // $('.tech_short').hide();
    // $('.tech_full').slideDown();

    $('#newTech').fadeIn();
    return false;
});

// Вебинары и обзоры
$('#openNewWebinary').click(function() {
    $('#newWebinary').fadeIn();
    return false;
});

// Отправить заявку
$('#button_request').click(function() {
    $('#newRequest').fadeIn();
    return false;
});

// Закрытие модального окна
$('.modal').find('.close, .modal_shadow, #close').click(function() {
    var name = $(this).attr('data-name');
    $('#' + name).fadeOut();
    $('body').removeClass('modal-open');
    $('#panel').show();
    // console.log($(this))
    return false;
});

$(document).keyup(function(e) {
    if (e.keyCode === 27) {
        // Пользователь нажал ESC
        $('.modal').fadeOut(); // Закрываем все открытые окна
        $('body').removeClass('modal-open');
        $('#panel').show();
    }
});

// Открытие окна с Вакансиями
$('body').find('[id=openNewHire]').click(function() {
    var title = $(this).attr('data-title');
    $('#newHire').fadeIn();
    $('#newHire').find('.title-info').text(title);
    return false;
});

// Плавная прокрутка к якорю
$(window).on('load', function() {
    // var top = $(window.location.hash).offset().top;
    // $('html,body').stop().animate({
    //   scrollTop: top
    // }, 1000);
});
$(document).ready(function() {
    $('input[name=form_text_7]').mask('+7(999) 999-9999');
    $('a.link_anchor').click(function(event) {
        // event.preventDefault();
        var blockID = $(this).attr('href').split('#')[1];
        var top = $('#' + blockID).offset().top,
            top_head = 200;
        top -= top_head; // Добавляем отступ сверху
        $('html,body').animate({
            scrollTop: top
        }, 1000);
        return false;
    });
});

// Открытие окна с Скриншотом
$('body').find('[id=openNewScreen]').click(function() {
    var $newScreen = $('#newScreen'),
        $openNewScreen = $('#screen').find('[id=openNewScreen]'),
        title = $(this).attr('data-title'),
        link = $(this).attr('data-link'),
        current = 0, // Текущий
        prev = 0,
        next = 0,
        countClone = $('#screen').find('.cloned [id=openNewScreen]').length,
        count = $openNewScreen.length - countClone, // Количество
        i = 0;
    $openNewScreen.each(function() {
        if (!$(this).closest('.cloned').hasClass('cloned')) {
            i++;
            if ($(this).attr('data-link') == link) {
                // Это текущий слайд
                current = i;
                return false;
            }
        }
    });
    // Считаем предыдущий и следующий слайд
    if (current + 1 > count) {
        // Это последний слайд
        next = 1;
    } else {
        next = current + 1;
    }
    if (current - 1 < 1) {
        // Это первый слайд
        prev = count;
    } else {
        prev = current - 1;
    }
    // Устанавливаем ссылки
    $newScreen.find('.arrow_left').attr({ 'data-prev': prev });
    $newScreen.find('.arrow_right').attr({ 'data-next': next });

    $newScreen.find('.arrow_left .counter').text(prev + '/' + count);
    $newScreen.find('.arrow_right .counter').text(next + '/' + count);
    $newScreen.fadeIn();
    $newScreen.find('.title h3').text(title);
    $newScreen.find('.photo').html('<img src="' + link + '" alt="" />');
    $('body').addClass('modal-open');
    $('#panel').hide();
    return false;
});
// Переключение на следующий и предыдущий Обзоры сервиса
$('body').find('#newScreen .arrow_left, #newScreen .arrow_right, #newScreen .close').click(function() {
    if ($(this).hasClass('close')) {
        var name = $(this).attr('data-name');
        $('#' + name).fadeOut();
        $('body').removeClass('modal-open');
        $('#panel').show();
        return true;
    }
    var $newScreen = $('#newScreen'),
        $openNewScreen = $('#screen').find('[id=openNewScreen]'),
        current = parseInt($(this).attr('data-prev')), // Текущий
        prev = 0,
        next = 0,
        title = '', // Название окна
        link = '', // ID - видео ютуба
        countClone = $('#screen').find('.cloned [id=openNewScreen]').length,
        count = $openNewScreen.length - countClone, // Количество
        i = 0;
    // Проверяем пользователь нажал на предыдущий или следующий слайд
    current = $(this).hasClass('arrow_left') ? current : parseInt($(this).attr('data-next'));
    // console.log(current);
    if (current) {
        // Есть ссылка на слайд, значит можем переключиться
        $openNewScreen.each(function() {
            if (!$(this).closest('.cloned').hasClass('cloned')) {
                i++;
                if (i == current) {
                    // Это текущий слайд
                    title = $(this).attr('data-title');
                    link = $(this).attr('data-link');

                    return false;
                }
            }
        });
        // Считаем предыдущий и следующий слайд
        if (current + 1 > count) {
            // Это последний слайд
            next = 1;
        } else {
            next = current + 1;
        }
        if (current - 1 < 1) {
            // Это первый слайд
            prev = count;
        } else {
            prev = current - 1;
        }

        // Устанавливаем ссылки
        $newScreen.find('.arrow_left').attr({ 'data-prev': prev });
        $newScreen.find('.arrow_right').attr({ 'data-next': next });

        $newScreen.find('.arrow_left .counter').text(prev + '/' + count);
        $newScreen.find('.arrow_right .counter').text(next + '/' + count);
        $newScreen.fadeIn();
        $newScreen.find('.title h3').text(title);
        $newScreen.find('.photo').html('<img src="' + link + '" alt="" />');
        $('body').addClass('modal-open');
        $('#panel').hide();

    }

    return false;
});


// Открытие окна с Обзором сервиса
$('body').find('[id=openNewVideo]').click(function() {
    var $newVideo = $('#newVideo'),
        $openNewVideo = $('#overview').find('[id=openNewVideo]'),
        title = $(this).attr('data-title'),
        link = $(this).attr('data-link'),
        current = 0, // Текущий
        prev = 0,
        next = 0,
        count = $openNewVideo.length, // Количество
        i = 0;
    $openNewVideo.each(function() {
        i++;
        if ($(this).attr('data-link') == link) {
            // Это текущий слайд
            current = i;
            return false;
        }
    });
    if (count == 0) {
        $newVideo.find('.arrow_left').hide();
        $newVideo.find('.arrow_right').hide();
    }
    // Считаем предыдущий и следующий слайд
    if (current + 1 > count) {
        // Это последний слайд
        next = 1;
    } else {
        next = current + 1;
    }
    if (current - 1 < 1) {
        // Это первый слайд
        prev = count;
    } else {
        prev = current - 1;
    }
    // Устанавливаем ссылки
    $newVideo.find('.arrow_left').attr({ 'data-prev': prev });
    $newVideo.find('.arrow_right').attr({ 'data-next': next });

    $newVideo.find('.arrow_left .counter').text(prev + '/' + count);
    $newVideo.find('.arrow_right .counter').text(next + '/' + count);
    $newVideo.fadeIn();
    $newVideo.find('.title h3').text(title);
    $newVideo.find('.video').html('<iframe width="100%" height="600" src="https://www.youtube.com/embed/' +
        link +
        '?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
    $('body').addClass('modal-open');
    $('#panel').hide();
    return false;
});
// Переключение на следующий и предыдущий Обзоры сервиса
$('body').find('#newVideo .arrow_left, #newVideo .arrow_right').click(function() {
    var $newVideo = $('#newVideo'),
        $openNewVideo = $('#overview').find('[id=openNewVideo]'),
        current = parseInt($(this).attr('data-prev')), // Текущий
        prev = 0,
        next = 0,
        title = '', // Название окна
        link = '', // ID - видео ютуба
        count = $openNewVideo.length, // Количество
        i = 0;
    // Проверяем пользователь нажал на предыдущий или следующий слайд
    current = $(this).hasClass('arrow_left') ? current : parseInt($(this).attr('data-next'));
    // console.log(current);
    if (current) {
        // Есть ссылка на слайд, значит можем переключиться
        $openNewVideo.each(function() {
            i++;
            if (i == current) {
                // Это текущий слайд
                title = $(this).attr('data-title');
                link = $(this).attr('data-link');

                return false;
            }
        });
        // Считаем предыдущий и следующий слайд
        if (current + 1 > count) {
            // Это последний слайд
            next = 1;
        } else {
            next = current + 1;
        }
        if (current - 1 < 1) {
            // Это первый слайд
            prev = count;
        } else {
            prev = current - 1;
        }

        // Устанавливаем ссылки
        $newVideo.find('.arrow_left').attr({ 'data-prev': prev });
        $newVideo.find('.arrow_right').attr({ 'data-next': next });

        $newVideo.find('.arrow_left .counter').text(prev + '/' + count);
        $newVideo.find('.arrow_right .counter').text(next + '/' + count);
        $newVideo.fadeIn();
        $newVideo.find('.title h3').text(title);
        $newVideo.find('.video').html('<iframe width="100%" height="600" src="https://www.youtube.com/embed/' +
            link +
            '?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
        $('body').addClass('modal-open');
        $('#panel').hide();

    }

    return false;
});


// Выбор главного цвета на изображении
$('.s-color.cards').find('.card').each(function() {
    $(this).hover(function() {
        var c = $(this).attr('data-color');
        var tc = $(this).attr('data-tcolor');
        if (tc) {
            $(this).find('.card_title a, .card_text').css({ 'color': tc });
        }
        $(this).css({ 'background': c });
    }, function() {
        $(this).find('.card_title a, .card_text').css({ 'color': '#373737' });
        $(this).css({ 'background': '#fff' })
    })
});

$('.slider').each(function() {
    var $el = $(this).find('.slider_inner'),
        $count = $(this).find('.count'),
        $arrows = $(this).find('.arrows'),
        $wrapper = $(this).find('.slider_wrapper');
    $(this).parent().prev('header').removeClass('h-top');

    $(this).find('.slide_photo_img').css({ 'width': $el.width() + 'px', 'height': $el.height() + 'px' });
    $(this).find('.slide').css({ 'width': $el.width() + 'px', 'height': $el.height() + 'px' });
    $wrapper.owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        autoWidth: true,
        autoplay: true,
        autoplay: true,
        autoplayTimeout: 5000,
        slideBy: 1,
        autoplayHoverPause: false,
        items: 1,
    });
    $wrapper.on('resize.owl.carousel', function(event) {
        $(this).find('.slide').css({ 'width': $el.width() + 'px', 'height': $el.height() + 'px' });
        $(this).find('.slide_photo_img').css({ 'width': $el.width() + 'px', 'height': $el.height() + 'px' });
    });

    $(this).find('.arrow_right').click(function() {
        $wrapper.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $(this).find('.arrow_left').click(function() {
        $wrapper.trigger('prev.owl.carousel');
    })
});
$('.qslider').each(function() {
    var $el = $(this),
        $count = $(this).find('.count'),
        $arrows = $(this).find('.arrows'),
        $wrapper = $(this).find('.swrapper'),
        $slide = $wrapper.find('.slide');

    // $slide.css({'width': $el.width()/3 + 'px'});
    $wrapper.owlCarousel({
        loop: true,
        margin: 0,
        dots: true,
        nav: false,
        autoWidth: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });
    $wrapper.on('resize.owl.carousel', function(event) {
        // $slide.css({'width': $el.width()/3 + 'px'});
    });

    $(this).find('.arrow_right').click(function() {
        $wrapper.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $(this).find('.arrow_left').click(function() {
        $wrapper.trigger('prev.owl.carousel');
    })
});

$('.rslider').each(function() {
    var $el = $(this),
        $count = $(this).find('.count'),
        $arrows = $(this).find('.arrows'),
        $wrapper = $(this).find('.swrapper'),
        $slide = $wrapper.find('.slide');

    $slide.css({ 'width': $el.width() + 'px' });
    $wrapper.owlCarousel({
        loop: true,
        margin: 0,
        dots: true,
        nav: false,
        autoWidth: true,
        items: 1,
    });
    $wrapper.on('resize.owl.carousel', function(event) {
        $slide.css({ 'width': $el.width() + 'px' });
    });

    $(this).find('.arrow_right').click(function() {
        $wrapper.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $(this).find('.arrow_left').click(function() {
        $wrapper.trigger('prev.owl.carousel');
    })
});

// Галерея скриншотов
$('#screens').each(function() {
    var $el = $(this),
        $wrapper = $(this).find('.swrapper'),
        $slide = $wrapper.find('.item');
    if ($el.hasClass('gallery')) {
        // Это галерея в О Компании
        $wrapper.owlCarousel({
            loop: true,
            margin: 0,
            dots: true,
            nav: false,
            autoWidth: true,
            autoplay: true,
            items: 3,
            autoplay: true,
            autoplayTimeout: 5000,
            slideBy: 3,
            autoplayHoverPause: true,
        });
        $wrapper.trigger('play.owl.autoplay', [5000]);
    } else {
        $wrapper.owlCarousel({
            loop: true,
            margin: 0,
            dots: true,
            nav: false,
            autoWidth: true,
            items: 3,
            autoplay: true,
            slideBy: 3,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
        });
        $wrapper.trigger('play.owl.autoplay', [5000]);
    }

});


var isMainSlider = false; // Есть главный слайдер
var $topE = 0; // Высота прокрутки



$('.menu_mobile').on('click', function() {
    $('.menu_top').show();
    $('body').css({ 'overflow': 'hidden' });
    $topE = $(window).scrollTop();

    var panel_h = $('#panel').height(),
    	$menu = $(this).find('ul'),
    	$close = $(this).find('.close'),
    	menu_top = $menu.offset().top,
    	close_top = $close.offset().top;

    $menu.css({top: menu_top+panel_h+'px'});
    $close.css({top: close_top+panel_h+'px'});
})
$('.menu_top .close').on('click', function() {
    $('.menu_top').hide();
    $('body').css({ 'overflow': 'auto' });
    $('html, body').animate({
        scrollTop: $topE
    }, 0);
});



// Шапка сайта
function initHeader() {
    var s_w = $(window).width(),
        top = $(window).scrollTop(),
        point_fade = 40,
        panel_h = $('#panel').height(),
        main_h = 80, // развернутое состояние
        main_hmin = 80, // свернутое состояние
        slider_h = $('.slider').height(),
        $main = $('.header.header_main'),
        $product = $('.header.header_product'),
        product_h = $product.height(),
        isDesktop = s_w > 768;
    if (isDesktop) {
        main_h = 80;
        main_hmin = 80;
    } else {
        main_h = 68;
        main_hmin = 68;
    }

    point_fade = main_h - main_hmin + panel_h;
    if ($main.hasClass('h-slide') || isMainSlider) {
        isMainSlider = true;
        if (top > panel_h) {
            $main.removeClass('h-slide');
            $main.addClass('h-top');
        } else {
            $main.addClass('h-slide');
            $main.removeClass('h-top');
        }
    }

    $('.header-fantom.header_product').css({'height': product_h+'px'});
   if (top > point_fade) {
        var tt = panel_h - top,
        	ttp = main_hmin + panel_h - top;
        if (tt < 0) {
            tt = 0;
        }
        $main.css({ 'height': main_hmin + 'px', 'top': tt + 'px' });
        if(isDesktop) {
            $product.css({ 'top': tt + main_hmin + 'px' });
        } else {
	        // $product.css({ 'top': tt + main_hmin + 'px' });
	        // $product.css({ 'top': ttp + main_hmin + 'px' });
	    }
    } else {
        var tt = panel_h - top,
        	ttp = main_h + panel_h - top;
        if (tt < 0) {
            tt = 0;
        }
        $main.css({ 'height': main_h + 'px', 'top': tt + 'px' });
        if(isDesktop) {
            $product.css({ 'top': tt + main_h + 'px' });
        } else {
	        // $product.css({ 'top': tt + main_h + 'px' });
        	// $product.css({'top': ttp + 'px'});
        }
    }

}


$(document).on('scroll', function() {
    initHeader();
});


// Init functions
initHeader();