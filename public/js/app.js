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
	constructor(el, type = 0) {
		this.el = el;
		this.wrapper = this.el.find('.swrapper');
		this.arrows = this.el.find('.arrows');
		this.slides = this.el.find('.slide');
		this.count = this.slides.length;
		this.current = 0;
		this.time = 5000;
	}
	sizer() {
		// Изменение размеров
		this.wrapper.css({'width' : this.el.width() * this.count});
	}
	init() {
		// Первый запуск
		let $this = this;
		let arr = '';
		for(let i = 0; i < this.count; i++) {
			arr += '<div class="sel" data-id="' + (i) +'"></div>'
		}
		this.arrows.html(arr);
		this.setActive(this.current);

		this.sizer();

		$(window).on('resize', function() {
			$this.sizer();
		});

		this.arrows.find('.sel').click(function(){
			// Клик по переключателю
		})
	}
	setActive(i) {
		// Переключение к слайду
		if(i > this.count - 1) {
			// Проверяем выход за границу
			i = 0;
		} else if(i < 0) {
			i = this.count - 1;
		}
		this.arrows.find('.sel').removeClass('active');
		this.arrows.find('.sel').eq(i).addClass('active');
		let translateWidth = -this.el.width() * (i);
        this.wrapper.css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        this.current = i;
        this.time = 5000;
        this.startCountDown(this.time - 1000);
	}
	startCountDown(cd) {
		// Обратный отсчет времени
		let $this = this;
		if(cd == 0) {
			$this.setActive(this.current + 1);
		} else {
			setTimeout(() => {
				$this.startCountDown(cd-1000)
			}, 1000);
		}
	}
}

$(document).ready(function(){
	let el = $('.slider').find('.sinner');
	let slider = new Slider(el);
	slider.init(el);
})
