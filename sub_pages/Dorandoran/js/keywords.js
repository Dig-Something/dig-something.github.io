$(document).ready(function () {
    var $children = $(".key, .key-w, .key-s");
    var interval = setInterval(function () {
        var $d = $children.not(".selected");
        var $el = $d.eq(Math.floor(Math.random() * $d.length));
        $el.addClass('selected');
        setTimeout(function() { $el.removeClass('selected'); }, 3000 );
        if ($d.length == 1) {
            clearInterval(interval);
        }
    }, Math.floor((Math.random() * 4500) + 500));
});