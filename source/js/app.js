$('[class=toggles]').find('.toggle_btn, h3').click(function(){
	var $parent = $(this).parent().parent();
	$parent.toggleClass('opened');
	$parent.find('.toggle_body_text').toggle();
});
$('[class=toggles]').find('.toggle').each(function() {
	if($(this).hasClass('opened')) {
		$(this).find('.toggle_body_text').show();
	} else {
		$(this).find('.toggle_body_text').hide();
	}
})

// Закрытие модального окна
$('[class=modal]').find('.close, .modal_shadow').click(function(){
	var name = $(this).attr('data-name');
	$('#'+name).fadeOut();
	$('body').removeClass('modal-open');
	$('#panel').show();
	// console.log($(this))
});
// Открытие окна с Вакансиями
$('body').find('[id=openNewHire]').click(function(){
	var title = $(this).attr('data-title');
	$('#newHire').fadeIn();
	$('#newHire').find('.title-info').text(title);
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
	var s_w = $(window).width();
	var top = $(window).scrollTop();

	if(s_w < 900) {
		if(top > 200) {
			$('.header_main').addClass('fix-header');
		} else {
			$('.header_main').removeClass('fix-header');
		}
	}
});

