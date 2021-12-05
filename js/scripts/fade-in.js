// console.log('fade-in.js loaded');

let activeEls;
let winHeight;

function onResizeWindow() {
    activeEls = document.querySelectorAll('.fade-this'); // class 추가할 요소
    
    winHeight = window.innerHeight; // window 브라우저의 높이
    addEvent();
}

// 요소에 스크롤 했을 때 class 부여
function onScrollCheckPos() {
    for(let i = 0; i < activeEls.length; i++) {
        let activeElsTop = activeEls[i].getBoundingClientRect().top;
        if(winHeight > activeElsTop) {
            activeEls[i].classList.add('fade-in');
        }
    }
}

function addEvent() {
    window.addEventListener('scroll', onScrollCheckPos);
    window.addEventListener('load', onScrollCheckPos);
    window.addEventListener('resize', onResizeWindow);
}

function init() {
    addEvent();
    onResizeWindow();
}

init();