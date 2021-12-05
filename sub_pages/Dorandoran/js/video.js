$(document).ready(function(){
	$('#btn-play').click(function(){
		var video = $('#video');
		video.attr('src', './video/video.mp4');
		video.get(0).play();
        $(this).addClass("blind");
	});
});