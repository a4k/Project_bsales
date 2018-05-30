$('[class=toggles]').find('.toggle_btn, h3').click(function(){
	$(this).parent().parent().toggleClass('opened');
});



$('[class=modal]').find('.close, .modal_shadow').click(function(){
	var name = $(this).attr('data-name');
	$('#'+name).fadeOut();
	console.log($(this))
});
$('#openNewHire').click(function(){
	var title = $(this).attr('data-title');
	$('#newHire').fadeIn();
	$('#newHire').find('.title-info').text(title);
})



// Реализация слайдера
class Slider {
	constructor(el, type = 1, h_sizer = 0) {
		this.el = el;
		this.type = type;
		this.wrapper = this.el.find('.swrapper');
		this.arrows = this.el.find('.arrows');
		this.slides = this.el.find('.slide');
		this.count = this.slides.length;
		this.current = 0;
		this.pages = Math.ceil(this.count / this.type);
		this.c_page = Math.round(this.current * this.type);
		this.time = 5000;
		this.h_sizer = h_sizer/100;
	}
	sizer() {
		// Изменение размеров
		let w_slide = ((1/this.type)*this.el.width() - (1 - 1/this.type)*(this.el.width()*0.02)),
			h_slide = w_slide * this.type * this.h_sizer;
		this.slides.css({'width': w_slide + 'px', 'padding-top': h_slide + 'px'});
		this.wrapper.css({'width' : (1/this.type)*this.el.width() * this.count});
		let translateWidth = -this.el.width() * (this.c_page);
        this.wrapper.css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
	}
	init() {
		// Первый запуск
		let $this = this;
		let arr = '';
		for(let i = 0; i < this.pages; i++) {
			arr += '<div class="sel" data-id="' + (i) +'"></div>'
		}
		this.arrows.html(arr);
		this.setActive(this.current);

		this.sizer();
		this.swipe();

		$(window).on('resize', function() {
			$this.sizer();
		});

		this.arrows.find('.sel').click(function(){
			// Клик по переключателю
			$this.setActive(parseInt($(this).attr('data-id')));
		});
	}
	swipe() {
		// Функция перелистывания слайдов пальцем
		let $this = this;
		let swipeleft = false, swiperight = false, page_x = 0, page_y = 0,
			touch_start_x = 0, touch_start_y = 0,
			touch_event = false,
			d_x = 120, d_y = 30;

		$this.el.on('touchstart', function(e){
			let parent = e.target.parentElement;
			if($(e.target).closest('.sinner').attr('class')) {
				touch_event = true;
				touch_start_x = e.originalEvent.touches[0].pageX;
				touch_start_y = e.originalEvent.touches[0].pageY;
			}
		}).on('touchmove', function(e){
			if(touch_event){
				if(e.type === "touchmove"){
					page_x = e.originalEvent.changedTouches[0].pageX;
					page_y = e.originalEvent.changedTouches[0].pageY;
					if((touch_start_x-page_x) > 0 && Math.abs(touch_start_x-page_x) >= d_x && Math.abs(touch_start_y-page_y) <= d_y){
						if(!swipeleft){
							swipeleft = true;
							swiperight = false;
						}
					};
					if(touch_start_x-page_x < 0 && Math.abs(touch_start_x-page_x) >= d_x && Math.abs(touch_start_y-page_y) <= d_y){
						if(!swiperight){
							swiperight = true;
							swipeleft = false;
						}
					}
				}
			}
		}).on('touchend', function(){
			if(touch_event) {
				// Для навигации
				if(swipeleft){
					$this.setActive($this.current + 1);
					swipeleft = false;
				};
				if(swiperight){
					$this.setActive($this.current - 1);
					swiperight = false;
				};
			}
			touch_event = false;
		})
	}
	setActive(i) {
		// Переключение к слайду
		if(i > this.pages - 1) {
			// Проверяем выход за границу
			i = 0;
		} else if(i < 0) {
			i = this.pages - 1;
		}
		this.stopCountDown();
		this.arrows.find('.sel').removeClass('active');
		this.arrows.find('.sel[data-id="' + i + '"]').addClass('active');
		let translateWidth = -this.el.width() * (i);
        this.wrapper.css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        this.current = i;
        this.c_page = i;
        this.startCountDown();
	}
	startCountDown() {
		// Обратный отсчет времени
		let $this = this;
		$this.time = setTimeout(() => {
			$this.setActive(this.current + 1);
		}, 5000);
	}
	stopCountDown() {
		let $this = this;
		clearTimeout($this.time);
	}
}

$(document).ready(function(){
	$('body').find('.sinner').each(function() {
		let type = $(this).attr('data-view'), h_sizer = $(this).attr('data-hsizer');
		let slider = new Slider($(this), type, h_sizer);
		slider.init($(this));
	});
})