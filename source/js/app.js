// Toggle меню
$('[class=toggles]').find('.toggle_btn, h4').click(function(){
	var $parent = $(this).closest('.toggle');
	$parent.toggleClass('opened');
	$parent.find('.toggle_body_text').toggle();
});
$('[class=toggles]').find('.toggle').each(function() {
	if($(this).hasClass('opened')) {
		$(this).find('.toggle_body_text').show();
	} else {
		$(this).find('.toggle_body_text').hide();
	}
});

// Переключение цен
$('#rates .list_types').find('a').click(function() {
	var id = $(this).attr('data-id');
	if(id == 'price_1') {
		$('[data-coprice="3"]').show();
	} else {
		$('[data-coprice="3"]').hide();
	}
	$('[data-price]').addClass('hidden');
	$('[data-price='+ id +']').removeClass('hidden');
	$(this).parent().find('a').removeClass('noactive');
	$(this).addClass('noactive');
	return false;
});

$('[data-tooltip]').hover(function() {
	var text = $(this).attr('data-tooltip');
	$(this).append('<span class="tooltip">'+text+'</span>');
}, function() {
	$(this).find('.tooltip').remove();
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
$('.modal').find('.close, .modal_shadow, #close').click(function(){
	console.log('test');
	var name = $(this).attr('data-name');
	$('#'+name).fadeOut();
	$('body').removeClass('modal-open');
	$('#panel').show();
	// console.log($(this))
	return false;
});
// Открытие окна с Вакансиями
$('body').find('[id=openNewHire]').click(function(){
	var title = $(this).attr('data-title');
	$('#newHire').fadeIn();
	$('#newHire').find('.title-info').text(title);
	return false;
});

// Плавная прокрутка к якорю
$(window).on('load', function(){
  // var top = $(window.location.hash).offset().top;
  // $('html,body').stop().animate({
  //   scrollTop: top
  // }, 1000);
});
$(document).ready(function() {
	$('input[name=form_text_7]').mask('+7(999) 999-9999');
	$('a.link_anchor').click(function(event){
		event.preventDefault();
		var blockID = $(this).attr('href').split('#')[1];
		var top = $('#'+blockID).offset().top,
			top_head = 160;
		top -= top_head; // Добавляем отступ сверху
		$('html,body').animate({
			scrollTop: top
		}, 1000);
	});
});

// Открытие окна с Скриншотом
$('body').find('[id=openNewScreen]').click(function() {
	var $newScreen = $('#newScreen'),
		$openNewScreen = $('#screen').find('[id=openNewScreen]'),
		title = $(this).attr('data-title'),
		link = $(this).attr('data-link'),
		current = 0, // Текущий
		prev = 0, next = 0,
		countClone = $('#screen').find('.cloned [id=openNewScreen]').length,
		count = $openNewScreen.length - countClone, // Количество
		i = 0;
	$openNewScreen.each(function() {
		if(!$(this).closest('.cloned').hasClass('cloned')) {
			i++;
			if($(this).attr('data-link') == link) {
				// Это текущий слайд
				current = i;
				return false;
			}
		}
	});
	// Считаем предыдущий и следующий слайд
	if(current+1 > count) {
		// Это последний слайд
		next = 1;
	} else {
		next = current + 1;
	}
	if(current - 1 < 1) {
		// Это первый слайд
		prev = count;
	} else {
		prev = current - 1;
	}
	// Устанавливаем ссылки
	$newScreen.find('.arrow_left').attr({'data-prev': prev});
	$newScreen.find('.arrow_right').attr({'data-next': next});

	$newScreen.find('.arrow_left .counter').text(prev + '/' + count);
	$newScreen.find('.arrow_right .counter').text(next + '/' + count);
	$newScreen.fadeIn();
	$newScreen.find('.title h3').text(title);
	$newScreen.find('.photo').html('<img src="'+link+'" alt="" />');
	$('body').addClass('modal-open');
	$('#panel').hide();
	return false;
});
// Переключение на следующий и предыдущий Обзоры сервиса
$('body').find('#newScreen .arrow_left, #newScreen .arrow_right, #newScreen .close').click(function() {
	if($(this).hasClass('close')) {
		var name = $(this).attr('data-name');
		$('#'+name).fadeOut();
		$('body').removeClass('modal-open');
		$('#panel').show();
		return true;
	}
	var $newScreen = $('#newScreen'),
		$openNewScreen = $('#screen').find('[id=openNewScreen]'),
		current = parseInt($(this).attr('data-prev')), // Текущий
		prev = 0, next = 0,
		title = '', // Название окна
		link  = '', // ID - видео ютуба
		countClone = $('#screen').find('.cloned [id=openNewScreen]').length,
		count = $openNewScreen.length - countClone, // Количество
		i = 0;
	// Проверяем пользователь нажал на предыдущий или следующий слайд
	current = $(this).hasClass('arrow_left') ? current : parseInt($(this).attr('data-next'));
	// console.log(current);
	if(current) {
		// Есть ссылка на слайд, значит можем переключиться
		$openNewScreen.each(function() {
			if(!$(this).closest('.cloned').hasClass('cloned')) {
				i++;
				if(i == current) {
					// Это текущий слайд
					title = $(this).attr('data-title');
					link = $(this).attr('data-link');

					return false;
				}
			}
		});
		// Считаем предыдущий и следующий слайд
		if(current + 1 > count) {
			// Это последний слайд
			next = 1;
		} else {
			next = current + 1;
		}
		if(current - 1 < 1) {
			// Это первый слайд
			prev = count;
		} else {
			prev = current - 1;
		}

		// Устанавливаем ссылки
		$newScreen.find('.arrow_left').attr({'data-prev': prev});
		$newScreen.find('.arrow_right').attr({'data-next': next});

		$newScreen.find('.arrow_left .counter').text(prev + '/' + count);
		$newScreen.find('.arrow_right .counter').text(next + '/' + count);
		$newScreen.fadeIn();
		$newScreen.find('.title h3').text(title);
		$newScreen.find('.photo').html('<img src="'+link+'" alt="" />');
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
		prev = 0, next = 0,
		count = $openNewVideo.length, // Количество
		i = 0;
	$openNewVideo.each(function() {
		i++;
		if($(this).attr('data-link') == link) {
			// Это текущий слайд
			current = i;
			return false;
		}
	});
	if(count == 0) {
		$newVideo.find('.arrow_left').hide();
		$newVideo.find('.arrow_right').hide();
	}
	// Считаем предыдущий и следующий слайд
	if(current+1 > count) {
		// Это последний слайд
		next = 1;
	} else {
		next = current + 1;
	}
	if(current - 1 < 1) {
		// Это первый слайд
		prev = count;
	} else {
		prev = current - 1;
	}
	// Устанавливаем ссылки
	$newVideo.find('.arrow_left').attr({'data-prev': prev});
	$newVideo.find('.arrow_right').attr({'data-next': next});

	$newVideo.find('.arrow_left .counter').text(prev + '/' + count);
	$newVideo.find('.arrow_right .counter').text(next + '/' + count);
	$newVideo.fadeIn();
	$newVideo.find('.title h3').text(title);
	$newVideo.find('.video').html('<iframe width="100%" height="600" src="https://www.youtube.com/embed/'+
		link
		+'?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
	$('body').addClass('modal-open');
	$('#panel').hide();
	return false;
});
// Переключение на следующий и предыдущий Обзоры сервиса
$('body').find('#newVideo .arrow_left, #newVideo .arrow_right').click(function() {
	var $newVideo = $('#newVideo'),
		$openNewVideo = $('#overview').find('[id=openNewVideo]'),
		current = parseInt($(this).attr('data-prev')), // Текущий
		prev = 0, next = 0,
		title = '', // Название окна
		link  = '', // ID - видео ютуба
		count = $openNewVideo.length, // Количество
		i = 0;
	// Проверяем пользователь нажал на предыдущий или следующий слайд
	current = $(this).hasClass('arrow_left') ? current : parseInt($(this).attr('data-next'));
	// console.log(current);
	if(current) {
		// Есть ссылка на слайд, значит можем переключиться
		$openNewVideo.each(function() {
			i++;
			if(i == current) {
				// Это текущий слайд
				title = $(this).attr('data-title');
				link = $(this).attr('data-link');

				return false;
			}
		});
		// Считаем предыдущий и следующий слайд
		if(current + 1 > count) {
			// Это последний слайд
			next = 1;
		} else {
			next = current + 1;
		}
		if(current - 1 < 1) {
			// Это первый слайд
			prev = count;
		} else {
			prev = current - 1;
		}

		// Устанавливаем ссылки
		$newVideo.find('.arrow_left').attr({'data-prev': prev});
		$newVideo.find('.arrow_right').attr({'data-next': next});

		$newVideo.find('.arrow_left .counter').text(prev + '/' + count);
		$newVideo.find('.arrow_right .counter').text(next + '/' + count);
		$newVideo.fadeIn();
		$newVideo.find('.title h3').text(title);
		$newVideo.find('.video').html('<iframe width="100%" height="600" src="https://www.youtube.com/embed/'+
			link
			+'?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
		$('body').addClass('modal-open');
		$('#panel').hide();
		
	}

	return false;
});


// Выбор главного цвета на изображении
$('.s-color.cards').find('.card').each(function(){
	$(this).hover(function() {
		var c = $(this).attr('data-color');
		var tc = $(this).attr('data-tcolor');
		if(tc) {
			$(this).find('.card_title a, .card_text').css({'color': tc});
		}
		$(this).css({'background': c});
	},function() {
		$(this).find('.card_title a, .card_text').css({'color': '#373737'});
		$(this).css({'background': '#fff'})
	})
});

$('.slider').each(function() {
	var $el = $(this).find('.slider_inner'), 
	$count = $(this).find('.count'),
	$arrows = $(this).find('.arrows'),
	$wrapper = $(this).find('.slider_wrapper');
	$(this).parent().prev('header').removeClass('h-top');

	$(this).find('.slide_photo_img').css({'width': $el.width() + 'px', 'height': $el.height() + 'px'});
	$(this).find('.slide').css({'width': $el.width() + 'px', 'height': $el.height() + 'px'});
	$wrapper.owlCarousel({
	    loop:true,
	    margin:0,
	    nav:false,
	    dots: true,
	    autoWidth: true,
	    items: 1,
	});
	$wrapper.on('resize.owl.carousel', function(event) {
		$(this).find('.slide').css({'width': $el.width() + 'px', 'height': $el.height() + 'px'});
		$(this).find('.slide_photo_img').css({'width': $el.width() + 'px', 'height': $el.height() + 'px'});
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
	    loop:true,
	    margin:0,
	    dots:true,
	    nav:false,
	    autoWidth: false,
	    responsive:{
        0:{
            items:1
        },
        768:{
            items:2
        },
        992:{
            items:3
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

	$slide.css({'width': $el.width() + 'px'});
	$wrapper.owlCarousel({
	    loop:true,
	    margin:0,
	    dots:true,
	    nav:false,
	    autoWidth: true,
	    items: 1,
	});
	$wrapper.on('resize.owl.carousel', function(event) {
		$slide.css({'width': $el.width() + 'px'});
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
	if($el.hasClass('gallery')) {
		// Это галерея в О Компании
		$wrapper.owlCarousel({
		    loop:true,
		    margin:0,
		    dots:true,
		    nav:false,
		    autoWidth: true,
		    autoplay: true,
		    items: 3,
		});
	} else {
		$wrapper.owlCarousel({
		    loop:true,
		    margin:0,
		    dots:true,
		    nav:false,
		    autoWidth: true,
		    items: 3,
		});
	}

});


var $topE = 0; // Высота прокрутки
$('.menu_mobile').on('click', function() {
	$('.menu_top').show();
	$('body').css({'overflow': 'hidden'});
	$topE = $(window).scrollTop();
})
$('.menu_top .close').on('click', function() {
	$('.menu_top').hide();
	$('body').css({'overflow':'auto'});
	console.log($topE);
	$('html, body').animate({
        scrollTop: $topE
    }, 0);
});


$(document).on('scroll', function() {
	var s_w = $(window).width(),
		top = $(window).scrollTop(),
		point_fade = 200,
		isDesktop = s_w > 768;
	if(isDesktop) {
		point_fade = 500;
	}
	if(top > point_fade) {
		$('.header.header_main').addClass('fix-header');
		$('.header_main.header-fantom').addClass('visible');
		if(isDesktop) {
			$('.header.header_product').addClass('fix-header');
			$('.header_product.header-fantom').addClass('visible');
		}
	} else {
		$('.header.header_main').removeClass('fix-header');
		$('.header_main.header-fantom').removeClass('visible');
		if(isDesktop) {
			$('.header.header_product').removeClass('fix-header');
			$('.header_product.header-fantom').removeClass('visible');
		}
	}
});

