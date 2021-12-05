var scrollToEls = document.querySelectorAll('.scrollTo');

function onScrollSectionMove(idx, e) {
    // var sectionTop = window.pageYOffset + scrollToEls[idx].getBoundingClientRect().top;

    if (e.wheelDelta <= -120) {
        if (idx + 1 > scrollToEls.length - 1) {
            return;
        }

        window.scroll({
            top: window.pageYOffset + scrollToEls[idx + 1].getBoundingClientRect().top,
            behavior: 'smooth'
        });
        
        // console.log(e.wheelDelta, idx);
    }

    if (e.wheelDelta >= 120) {
        if (idx - 1 < 0) {
            return;
        }

        window.scroll({
            top: window.pageYOffset + scrollToEls[idx - 1].getBoundingClientRect().top,
            behavior: 'smooth'
        });  
    }
}

function addEvent() {
    for (var i = 0; i < scrollToEls.length; i++) {
        scrollToEls[i].addEventListener('mousewheel', onScrollSectionMove.bind(null, i));
    }
}

function init() {
    addEvent();
}

init();