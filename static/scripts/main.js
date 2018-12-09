$('body').addClass('js-loading');

$(window).on('load', function() {
	$("#loading").fadeOut("fast");
	$('body').removeClass('js-loading');
});