// console.log('active.js loaded');

let activeEls;
let winHeight;

function onResizeWindow() {
    activeEls = document.querySelectorAll('.active-this'); // class 추가할 요소
    fadeKeywords = document.querySelectorAll('.active-this-keyword');
    fadeEls = document.querySelectorAll('.fade-this');

    winHeight = window.innerHeight; // window 브라우저의 높이
    addEvent();
}

// 요소에 스크롤 했을 때 class 부여
function onScrollCheckPos() {
    for(let i = 0; i < activeEls.length; i++) {
        let activeElsTop = activeEls[i].getBoundingClientRect().top;
        if(winHeight > activeElsTop) {
            activeEls[i].classList.add('active');
        }
    }

    for(let i = 0; i < fadeKeywords.length; i++) {
        let fadeElsTop = fadeKeywords[i].getBoundingClientRect().top;
        if(winHeight > fadeElsTop) {
            fadeKeywords[i].classList.add('active-keyword');
        }
    }

    for(let i = 0; i < fadeEls.length; i++) {
        let fadeElsTop = fadeKeywords[i].getBoundingClientRect().top;
        if(winHeight > fadeElsTop) {
            fadeEls[i].classList.add('fade');
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