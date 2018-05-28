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
