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


// Плагин открытия окон
$.fn.emodal = function (props) {
    if ( props == 'open' ) {
        $('body').addClass('modal-open');
        this.fadeIn();
    } else if ( props == 'close' ) {
        var name = this.attr('data-name');
        $('#' + name).fadeOut();
        $('body').removeClass('modal-open');
        $('#panel').show();
    } else if ( props == 'close-all' ) {
        $('.modal').fadeOut();
        $('body').removeClass('modal-open');
        $('#panel').show();
    }
};

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

// Всплывающая подсказка
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
            close: '<div data-fancybox-close class="arrow_close" title="{{CLOSE}}"></div>',
            arrowLeft: '<div data-fancybox-prev class="arrow_left">' +
                '<div class="arrow_info">' +
                '<span class="arrow"></span>' +
                '</div>' +
                '</div>',
            arrowRight: '<div data-fancybox-prev class="arrow_right">' +
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
    $('#newUpdate').emodal('open');
    return false;
});

// Читать подробнее технические требования
$('#moreTechReq').click(function() {
   $('#newTech').emodal('open');
    return false;
});

// Вебинары и обзоры
$('#openNewWebinary').click(function() {
    $('#newWebinary').emodal('open');
    return false;
});

// Отправить заявку
$('#button_request').click(function() {
    $('#newRequest').emodal('open');
    return false;
});

// Закрытие модального окна
$('.modal').find('.close, .modal_shadow, #close').click(function() {
    $(this).emodal('close');
    return false;
});

$(document).keyup(function(e) {
    if (e.keyCode === 27) {
        // Пользователь нажал ESC
        $('.modal').emodal('close-all');
    }
});

// Открытие окна с Вакансиями
$('body').find('[id=openNewHire]').click(function() {
    var title = $(this).attr('data-title');
    $('#newHire').emodal('open');
    $('#newHire').find('.title-info').text(title);
    return false;
});

// Плавная прокрутка к якорю
$(window).on('load', function() {
    var top = $(window.location.hash).offset().top;
    $('html,body').stop().animate({
      scrollTop: top
    }, 1000);
});

$(document).ready(function() {
    $('input[id=phone_masked]').mask('+7(999) 999-9999');
    var url = location.href;
    if (url.includes('successRequest')) {
        // Успешно отправлена Заявка
        $('#successRequest').fadeIn();

    } else if (url.includes('successVacancies')) {
        // Успешно отправлена Вакансия
        $('#successRequest').fadeIn();

    }
    // Переключение по якорям
    $('a.link_anchor').click(function(event) {
        // event.preventDefault();
        var blockID = $(this).attr('href').split('#')[1];
        var top = $('#' + blockID).offset().top,
            top_head = 200;
        top -= top_head; // Добавляем отступ сверху
        $('html, body').animate({
            scrollTop: top
        }, 1000);

        return false;
    });
    $('.form_errors11').each(function() {
        var v = $(this).text();
        var errors = [
            'Файл: неверный тип файла',
            'Файл: слишком большой файл',
            'Неверно введены символы с картинки',
            'Не заполнены следующие обязательные поля:',
            'Имя: слишком короткое значение',
            'Контактная информация: слишком короткое значение',
            'Не заполнены следующие обязательные поля:',
            '» "Дополнительно"',
        ];
        if (v.contains(errors[0]) || v.contains(errors[1])) {
            $('["name"^="form" "type"="file"]').addClass('error');
        } else if (v.contains(errors[1])) {
            $('[name=captcha_word]').addClass('error');
        }
    });
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

    $menu.css({ top: menu_top + panel_h + 'px' });
    $close.css({ top: close_top + panel_h + 'px' });
    return false;
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
        panel_h = $('#panel').height(),
        slider_h = $('.slider').height(),
        $main = $('.header.header_main'),
        $main_fantom = $('.header-fantom.header_main'),
        $product = $('.header.header_product'),
        $product_fantom = $('.header-fantom.header_product'),
        product_h = $product.height();

    isDesktop = s_w > 768 ? true : false;
    main_h = isDesktop ? 80 : 68;
    main_hmin = isDesktop ? 80 : 68
    panel_h = panel_h ? panel_h : 0;
    isProduct = product_h ? true : false;
    isMainSlider = $main.hasClass('h-slide');

    point_fade = main_h - main_hmin + panel_h;

    if (isMainSlider) {
        if (top > panel_h) {
            $main.removeClass('h-slide');
            $main.addClass('h-top');
        } else {
            $main.addClass('h-slide');
            $main.removeClass('h-top');
        }
    }

    $product_fantom.css({ 'height': product_h + 'px' });

    if (top > point_fade) {
        var tt = panel_h - top,
            ttp = main_hmin + panel_h - top;

        tt = tt > 0 ? tt : 0;
        ttp = ttp > 0 ? ttp : 0;

        if (isProduct) {
            $main.css({ 'position': 'relative' });
            $main_fantom.hide();
        } else {
            $main.css({ 'height': main_hmin + 'px', 'top': tt + 'px' });
        }
        if (isDesktop) {
            $product.css({ 'top': ttp + 'px' });
        }
    } else {
        var tt = panel_h - top,
            ttp = main_h + panel_h - top;

        tt = tt > 0 ? tt : 0;
        ttp = ttp > 0 ? ttp : 0;

        if (isProduct) {
            $main.css({ 'position': 'relative', 'top': '0px' });
            $main_fantom.hide();
            if (isDesktop) {

            }
        } else {
            $main.css({ 'height': main_h + 'px', 'top': tt + 'px' });
        }
        if (isDesktop) {
            console.log('main_h :: ' + main_h + ' panel_h :: ' + panel_h + ' top :: ' + top);
            $product.css({ 'top': main_h + 'px' });
        }
    }

}


$(document).on('scroll', function() {
    initHeader();
});


// Init functions
initHeader();