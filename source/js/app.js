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
        bx_area_h = $('#bx_incl_area_1').height(),
        slider_h = $('.slider').height(),
        $main = $('.header.header_main'),
        $main_fantom = $('.header-fantom.header_main'),
        $product = $('.header.header_product'),
        $product_fantom = $('.header-fantom.header_product'),
        product_h = $product.height();

    isDesktop = s_w > 768 ? true : false;
    main_h = isDesktop ? 80 : 68;
    main_hmin = isDesktop ? 80 : 68
    bx_area_h = bx_area_h ? bx_area_h : 0;
    panel_h = panel_h ? (panel_h + bx_area_h) : 0;
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

    var visible_panel_h = panel_h - top,
        top_product_h = main_h + panel_h - top;

    if (top > point_fade) {
        // Спустился из зоны
        top_product_h = main_hmin + panel_h - top;

        visible_panel_h = setNegativeToZero(visible_panel_h);
        top_product_h = setNegativeToZero(top_product_h);

        if (isProduct) {
            $main.css({ 'position': 'relative' });
            $main_fantom.hide();
            if (isDesktop) {
                $product.css({ 'top': top_product_h + 'px' });
            }
        } else {
            $main.css({ 'height': main_hmin + 'px', 'top': visible_panel_h + 'px' });
        }
    } else {
        // Находится в зоне
        top_product_h = main_h + panel_h - top;

        visible_panel_h = setNegativeToZero(visible_panel_h);
        top_product_h = setNegativeToZero(top_product_h);

        if (isProduct) {
            $main.css({ 'position': 'relative', 'top': '0px' });
            $main_fantom.hide();
        } else {
            $main.css({ 'height': main_h + 'px', 'top': visible_panel_h + 'px' });
        }
        if (isDesktop) {
            // console.log('main_h :: ' + main_h + ' panel_h :: ' + panel_h + ' top :: ' + top);
            $product.css({ 'top': top_product_h + 'px' });
        }
    }
}

// Если меньше ноля приравнять к нулю
function setNegativeToZero(a) {
    if ( a > 0 ) {
        return a
    }
    return 0
}


$(document).on('scroll', function() {
    initHeader();
});


// Init functions
initHeader();


//после загрузки веб-страницы
function getCaptcha() {

  // максимальное количество файлов
/*  var countFiles = 5;
  // типы разрешённых файлов
  var typeFile = 'image.*';
  // максимльный размер
  var maxSizeFile = 524288; //512 Кбайт
  // отображаем на форме максимальное количество файлов
  $('#countFiles').text(countFiles);
  // при изменения значения элемента "Выбрать файл"
  $(document).on('change','input[name="images[]"]',function(e){
    // если выбран файл, то добавить ещё элемент "Выбрать файл"
    if ((e.target.files.length>0)&&($(this).next('p').next('input[name="images[]"]').length==0) && ($('input[name="images[]"]').length<countFiles)) {
      $(this).next('p').after('<input type="file" name="images[]"><p style="margin-top: 3px; margin-bottom: 3px; color: #ff0000;"></p>');
    }
    // если выбран файл, то..
    if (e.target.files.length>0) {
      // получить файл
      var file = e.target.files[0];
      // проверить размер файла
      if (file.size>maxSizeFile) {
        $(this).next('p').text('* Файл не будет отправлен, т.к. его размер больше 512Кбайт');
      }
      // проверить тип файла
      else if (!file.type.match(typeFile)) {
        $(this).next('p').text('* Файл не будет отправлен, т.к. его тип не соответствует разрешённому');
      }
      else {
        // убираем сообщение об ошибке
        if ($(this).next('p')) {
          $(this).next('p').text('');
        }
      }
    }
    else {
      // если после изменения файл не выбран, то сообщаем об этом пользователю
      $(this).next('p').text('* Файл не будет отправлен, т.к. он не выбран');
    }
  });*/

  // при отправке формы messageForm на сервер (id="messageForm")
  $('[name^=SIMPLE_FORM2]').submit(function (event) {
    event.preventDefault();
    var formValid = true;

    $('[name^=SIMPLE_FORM2] input,[name^=SIMPLE_FORM2] textarea').each(function () {
      var formGroup = $(this).parents('.form-group');
      var glyphicon = formGroup.find('.form-control-feedback');
      //валидация данных с помощью HTML5 функции checkValidity
      if (this.checkValidity()) {
        //добавить к formGroup класс .has-success и удалить .has-error
        formGroup.addClass('has-success').removeClass('has-error');
        glyphicon.addClass('glyphicon-ok').removeClass('glyphicon-remove');
      } else {
        formGroup.addClass('has-error').removeClass('has-success');
        glyphicon.addClass('glyphicon-remove').removeClass('glyphicon-ok');
        //если элемент не прошёл проверку, то отметить форму как не валидную
        formValid = false;
      }
    });

    //проверяем элемент, содержащий код капчи
    //1. Получаем капчу
    var captcha = grecaptcha.getResponse();
    //2. Если длина кода капчи, которой ввёл пользователь не равно 6,
    //   то сразу отмечаем капчу как невалидную (без отправки на сервер)
    if (!captcha.length) {
      // Выводим сообщение об ошибке
      $('#recaptchaError').text('* Вы не прошли проверку "Я не робот"');
    } else {
      // получаем элемент, содержащий капчу
      $('#recaptchaError').text('');
    }

    // если форма валидна и длина капчи не равно пустой строке, то отправляем форму на сервер (AJAX)
    if ((formValid) && (captcha.length)) {

      // получаем имя, которое ввёл пользователь
      var name = $("[name=form_text_5]").val();
      // получаем email, который ввёл пользователь
      var email = $("[name=form_text_6]").val();
      // получаем сообщение, которое ввёл пользователь
      var message = $("[name=form_text_7]").val();

      // объект, посредством которого будем кодировать форму перед отправкой её на сервер
      var formData = new FormData();
      // добавить в formData значение 'name'=значение_поля_name
      formData.append('form_text_5', name);
      // добавить в formData значение 'email'=значение_поля_email
      formData.append('form_text_6', email);
      // добавить в formData значение 'message'=значение_поля_message
      formData.append('form_text_7', message);
      // добавить в formData файлы
      // получить все элементы с атрибутом name="images[]"
      // var images = document.getElementsByName("images[]");
      // перебрать все элементы images с помощью цикла
      /*for (var i = 0; i < images.length; i++) {
        // получить список файлов элемента input с type="file"
        var fileList = images[i].files;
        // если элемент не содержит файлов, то перейти к следующей
        if (fileList.length > 0) {
          // получить первый файл из списка
          var file = fileList[0];
          // проверить тип файла и размер
          if ((file.type.match('image.*')) && (file.size<524288)) {
            // добавить его (файл (file) с именем file.name) в formData
            formData.append('images[]', file, file.name);
          }
        }
      }*/

      // добавить в formData значение 'g-recaptcha-response'=значение_recaptcha
      formData.append('g-recaptcha-response', captcha);

      // технология AJAX
      $.ajax({
        //метод передачи запроса - POST
        type: "POST",
        //URL-адрес запроса
        url: "/products/pau/",
        //передаваемые данные - formData
        data: formData,
        // не устанавливать тип контента, т.к. используется FormData
        contentType: false,
        // не обрабатывать данные formData
        processData: false,
        // отключить кэширование результатов в браузере
        cache: false,
        //при успешном выполнении запроса
        success: function (data) {
          // разбираем строку JSON, полученную от сервера
          var $data = JSON.parse(data);
          // устанавливаем элементу, содержащему текст ошибки, пустую строку
          $('#error').text('');

          // если сервер вернул ответ success, то значит двнные отправлены
          if ($data.result == "success") {
            // скрываем форму обратной связи
            $('[name^=SIMPLE_FORM2]').hide();
            // удаляем у элемента, имеющего id=msgSubmit, класс hidden
            $('#msgSubmit').removeClass('hidden');
          } else {
            // Если сервер вернул ответ error, то делаем следующее...
            $('#error').text('Произошла ошибка при отправке формы на сервер.');
            // Сбрасываем виджет reCaptcha
            grecaptcha.reset();
            // Если существует свойство msg у объекта $data, то...
            if ($data.msg) {
              // вывести её в элемент у которого id=recaptchaError
              $('#msg').text($data.msg);
            }
            if ($data.files) {
              $('#error').html($('#error').text()+'<br>'+$data.files);
            }
          }
        },
        error: function (request) {
          $('#error').text('Произошла ошибка ' + request.responseText + ' при отправке данных.');
        }
      });
    }
  });
}
