var mainEl = document.querySelector('#section1');
var vidEl = document.querySelector('video');
// console.log(vidEl);

// section1 마우스 엔터 시 애니메이션 초기화하는 함수
function onEnterMainEl() {
    // console.log('enter');
    gsap.killTweensOf(vidEl); // 이전에 적용된 애니메이션 제거
}

// section1 위에서 마우스를 움직일 때 동영상에 애니메이션 적용하는 함수
function onMoveMainEl(e) {
    // console.log('move');

    var posX = e.clientX; // 마우스 커서의 현재 X 위치를 posX에 저장
    var posY = e.clientY; // 마우스 커서의 현재 Y 위치를 posY에 저장

    // console.log(posX, posY)

    // 동영상 이동 제한 (위 아래 동영상 여백 방지)
    if (posX < 500) {
        posX = 500;
    }
    
    if (posX > 1000) {
        posX = 1000;
    }

    if (posY < 300) {
        posY = 300;
    }

    if (posY > 600) {
        posY = 600;
    }
    
    gsap.killTweensOf(vidEl); // 이전에 적용된 애니메이션 제거
    gsap.to(vidEl, {top: posY, left: posX, duration: 0.5, ease: 'power1.out'});
    // posX와 posY의 위치로 power1.out의 easing만큼 동영상 애니메이션
}

// 이벤트 리스너 추가 함수
function addEvent() {
    mainEl.addEventListener('mouseover', onEnterMainEl);
    // section1에 마우스 오버 시 함수 onEnterMainEl 호출
    mainEl.addEventListener('mousemove', onMoveMainEl);
    // section1 위에서 마우스 이동 시 함수 onMoveMainEl 호출
}

// 초기화 함수
function init() {
    addEvent();
}

init();