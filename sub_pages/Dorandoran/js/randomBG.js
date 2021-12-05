var bg = new Array();
bg[bg.length] = './images/bg/bg1.png';
bg[bg.length] = './images/bg/bg1-2.png';
bg[bg.length] = './images/bg/bg1-3.png';

var size = Math.floor(Math.random()*(bg.length));
$('#section1').parallax({imageSrc: bg[size]});