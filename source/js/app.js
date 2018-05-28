$('[class=toggles]').find('.toggle_btn, h3').click(function(){
	$(this).parent().parent().toggleClass('opened');
	console.log('test');
});
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
