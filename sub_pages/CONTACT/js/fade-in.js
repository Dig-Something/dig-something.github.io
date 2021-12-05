var fadeEls; // fade in animation 적용할 요소
var winHeight; // window 브라우저의 높이

// 브라우저를 리사이즈 할 때마다 변수를 재정의 함으로써 위치 계산 오류에 대응함
function onResizeWindow() {
    fadeEls = document.querySelectorAll('.fade'); 
    winHeight = window.innerHeight; 

    addEvent();
}

// fade in animation 적용할 요소까지 스크롤 했을 때 애니메이션 부여
function onScrollCheckPos() {
    for(var i = 0; i < fadeEls.length; i++) {
        var fadeElsTop = fadeEls[i].getBoundingClientRect().top;
        // fade in animation 적용할 요소들이 화면 상단부터 얼마나 떨어져있는지를 fadeElsTop에 저장

        // getBoundingClientRect()가 구한 요소들의 위치는 문서가 아닌 화면(viewport) 기준으로 되어있음
        // 스크롤을 내려 fadeEls에 가까워질 수록 fadeElsTop은 점점 줄어듦
        // window 브라우저의 현재 높이 = fadeElsTop 일 때 : fadeEls 바로 위까지 스크롤 함
        // window 브라우저의 현재 높이 > fadeElsTop 일 때 : fadeEls를 지나서 스크롤 함

        if(winHeight > fadeElsTop) {
            fadeEls[i].classList.add('fade-in'); // 해당 fadeEls에 fade-in 애니메이션 클래스 추가
        }
    }
}

// 이벤트 리스너 추가 함수
function addEvent() {
    window.addEventListener('scroll', onScrollCheckPos);
    window.addEventListener('load', onScrollCheckPos);
    // 문서 로드, 스크롤 시 함수 onScrollCheckPos 호출
    window.addEventListener('resize', onResizeWindow);
    // 문서 리사이즈 시 함수 onResizeWindow 호출
}

// 초기화 함수
function init() {
    addEvent();
    onResizeWindow();
}

init();
