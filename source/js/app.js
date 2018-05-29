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

var holder_image = document.getElementByClassName('holder_image');

Holder.run({
	themes: {
		'simple': {
			bg: "#fff",
			fg: '#000',
			size: 12
		}
	},
  images: holder_image
});

// Реализация слайдера
class Slider {
	constructor(el, type = 0) {
		this.el = el;
		this.wrapper = this.el.find('.swrapper');
		this.arrows = this.el.find('.arrows');
		this.slides = this.el.find('.slide');
		this.count = this.slides.length;
		this.current = 0;
	}
	sizer() {
		// Изменение размеров
		this.wrapper.css({'width' : this.el.width() * this.count});
	}
	init() {
		// Первый запуск
		let arr = '';
		for(let i = 0; i < this.count; i++) {
			arr += '<div class="sel"></div>'
		}
		this.arrows.html(arr);
		setActive(this.current);

		this.sizer();
	}
	setActive(i) {
		// Переключение к слайду
		this.arrows.find('.sel').removeClass('active');
		this.arrows.find('.sel').eq(i).addClass('active');
		let translateWidth = -this.el.width() * (i);
        this.wrapper.css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        this.current = i;

	} 
}

$(document).ready(function(){
	let el = $('.slider').find('.sinner');
	let slider = new Slider(el);
	slider.init(el);
})