$('[class=toggles]').find('.toggle_btn, h3').click(function(){
	$(this).parent().parent().toggleClass('opened');
});


// Открытие модального окна
$('[class=modal]').find('.close, .modal_shadow').click(function(){
	var name = $(this).attr('data-name');
	$('#'+name).fadeOut();
	console.log($(this))
});
$('#openNewHire').click(function(){
	var title = $(this).attr('data-title');
	$('#newHire').fadeIn();
	$('#newHire').find('.title-info').text(title);
});

// Выбор главного цвета на изображении
$('#main_products .cards').find('.card').each(function(){
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

	$(this).find('.slide').css({'width': $el.width() + 'px', 'height': $el.height() + 'px'});
	$(this).find('.slide_photo_img').css({'width': $el.width() + 'px', 'height': $el.height() + 'px'});
	var count = $wrapper.find('.slide_photo_img').length;
	$arrows.html('');
	for(var i = 0; i < count; i++) {
		if(i==0) {
			$arrows.append('<div class="sel active"></div>');
		} else {
			$arrows.append('<div class="sel"></div>')
		}
	}
	$(this).find('.slide').css({'width': $el.width() + 'px', 'height': $el.height() + 'px'});
	$wrapper.owlCarousel({
	    loop:true,
	    margin:0,
	    nav:false,
	    autoWidth: true,
	    items: 1,
	});
	$wrapper.on('resize.owl.carousel', function(event) {
		$(this).find('.slide').css({'width': $el.width() + 'px', 'height': $el.height() + 'px'});
		$(this).find('.slide_photo_img').css({'width': $el.width() + 'px', 'height': $el.height() + 'px'});
	});
	$wrapper.on('changed.owl.carousel', function(event) {
		// $count.text(event.page.index+1 + '/' + event.page.count);
		var count = event.page.count;
		$arrows.html('');
		for(var i = 0; i < count; i++) {
			if(i==event.page.index) {
				$arrows.append('<div class="sel active"></div>');
			} else {
				$arrows.append('<div class="sel"></div>')
			}
		}
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
			$('.header').addClass('fix-header');
		} else {
			$('.header').removeClass('fix-header');
		}
	}
});