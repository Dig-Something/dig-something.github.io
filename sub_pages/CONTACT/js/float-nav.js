var sectionEls = document.querySelectorAll('section');
var navListEl = document.querySelector('#list');
var dotListEls = document.querySelectorAll('.dot-menu');
var footerLogoEl = document.querySelector('.footer-logo');
// console.log(navListEl, dotListEls);
// console.log(sectionEls);

var cuId = 0; // 현재 순서
var exId = cuId; // 이전 순서

var sectionTop; // 스크롤 할 위치값

// 내비게이션 메뉴를 클릭할 때 해당 섹션으로 자동 스크롤되는 함수
function onClickDotListEls(idx, e) { // addEvent()에서 bind로 부여된 순서값을 전달받는 매개변수 idx와 이벤트 정보를 전달받는 매개변수 e를 설정

    e.preventDefault();
    // console.log('click', idx, el);

    // 이전순서와 클릭된 내비게이션 메뉴 순서가 같지 않을 경우
    if(idx !== exId) {
        // var sectionTop = sectionEls[idx].getBoundingClientRect().top; : 상대좌표
        sectionTop = window.innerHeight * idx;
        // 위치값을 계산해(100vh * 현재 순서) sectionTop에 저장
        // 0, 100vh, 200vh, ...

        // sectionTop 위치까지 부드럽게 스크롤
        window.scroll({
            top: sectionTop,
            behavior: 'smooth'
        });

        
        dotListEls[exId].classList.remove('dot-selected'); // 이전 순서의 메뉴 비활성화
        dotListEls[idx].classList.add('dot-selected'); // 클릭된 순서의 메뉴 활성화

        cuId = idx; // 클릭된 순서를 현재 순서로 재설정
        exId = cuId; // 이전 순서를 현재 순서로 재설정
        // console.log(cuId, sectionTop);
    }
}

// 스크롤 시 해당 섹션으로 자동 스크롤되는 함수
function onScrollWindow(e) {
    if(e.wheelDeltaY < -120) { // 아래로 스크롤 했을 때
        sectionTop = window.innerHeight * (cuId + 1); // 현재 순서의 다음 순서(+1) 위치 값을 sectionTop에 저장
        cuId = cuId + 1; // 현재 순서의 다음 순서(+1)를 cuId에 저장

        if (cuId > 4) { // 현재 순서가 4일 때 더 아래로 스크롤 할 경우 (footer에서 아래로 스크롤 할 경우)
            cuId = 4; // 현재 순서 4로 재설정
            exId = cuId; // 이전 순서 재설정
        }

        else {
            whereScrollWindow(sectionTop, cuId); // 함수 whereScrollWindow에 sectionTop과 cuId를 전달인자로 하여 호출
        }
    }

    if(e.wheelDeltaY > 120) { // 위로 스크롤 했을 때
        sectionTop = window.innerHeight * (cuId - 1); // 현재 순서의 이전 순서(-1) 위치값을 sectionTop에 저장
        cuId = cuId - 1; // 현재 순서의 이전 순서(-1)를 cuId에 저장

        if (cuId < 0) { // 현재 순서가 0일 때 더 위로 스크롤 할 경우 (main에서 위로 스크롤 할 경우)
            cuId = 0; // 현재 순서 0으로 재설정
            exId = cuId; // 이전 순서 재설정
        }

        else {
            whereScrollWindow(sectionTop, cuId); // 함수 whereScrollWindow에 sectionTop과 cuId를 전달인자로 하여 호출
        }
    }
    
    // console.log('scroll', e.wheelDeltaY, cuId);
}

// 현재 순서값과 위치값을 받아 특정 위치로 스크롤하는 함수
function whereScrollWindow(sectionTop, cuId) {
    // sectionTop(window.innerHeight * cuId)까지 부드럽게 스크롤
    window.scroll({
        top: sectionTop,
        behavior: 'smooth'
    });

    dotListEls[exId].classList.remove('dot-selected'); // 이전 순서 메뉴 비활성화
    dotListEls[cuId].classList.add('dot-selected'); // 현재 순서 메뉴 활성화

    cuId = cuId; // 현재 순서 재설정
    exId = cuId; // 이전 순서 재설정
}

// 이벤트 리스너 추가 함수
function addEvent() {
    window.addEventListener('mousewheel', onScrollWindow); // 마우스 휠 값이 있을 때 onScrollWindow 함수 호출

    for(var i = 0; i < dotListEls.length; i++) {
        dotListEls[i].addEventListener('click', onClickDotListEls.bind(null, i));
        // 내비게이션 메뉴들에게 이벤트 리스너 추가(순서 파악을 위해 현재 순서 값 i으로 bind 부여)
    }

    footerLogoEl.addEventListener('click', reset); // 푸터 로고 클릭시 최상단으로 이동
}

// 새로고침 시 순서 재설정 함수
function reset() {
    cuId = 0; // 현재 순서 0으로 재설정
    sectionTop = window.innerHeight * cuId; // 현재 순서 위치값 재설정
    whereScrollWindow(sectionTop, cuId); // 함수 whereScrollWindow 호출
}

// 초기화 함수
function init() {
    addEvent();
    reset();
}

init();
