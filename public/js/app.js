(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

	$slide.css({'width': $el.width()/3 + 'px'});
	$wrapper.owlCarousel({
	    loop:true,
	    margin:0,
	    dots:true,
	    nav:false,
	    autoWidth: true,
	    items: 3,
	});
	$wrapper.on('resize.owl.carousel', function(event) {
		$slide.css({'width': $el.width()/3 + 'px'});
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


},{}]},{},[1])