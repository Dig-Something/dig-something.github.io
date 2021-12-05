$(document).ready(function(){
    $('.scrolltxt').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
        vertical: true,
        // draggable: false,
        verticalSwiping: true
    });
});

$(document).ready(function(){
    $('.slideChr').slick({
        slide: '.chr',
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        arrows: false,
        slidesToShow: 5
    });
});