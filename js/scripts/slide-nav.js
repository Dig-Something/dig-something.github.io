var btnMenuEl = document.querySelector('#btn-menu');
var sideMenuEl = document.querySelector('.side-menu');
var sideMenuItemEl = sideMenuEl.querySelectorAll('li');

// 메뉴가 활성화 비활성화 여부 체크
var isOpenMenu = false;
// 현재 애니메이션 여부 체크
var isAni = false;

// 이벤트 핸들러.
function onClickBtnMenu(e) {
    e.preventDefault();
    console.log(isOpenMenu, 'click menu');
    if(isAni) { // 애니메이션 중에 클릭X
        return;
    }
    if(!isOpenMenu) { // 메뉴가 비활성화된 경우
        btnMenuEl.classList.add('active');
        sideMenuEl.classList.add('open');
        isAni = true;
        setTimeout(function() {
            for(var i = 0; i < sideMenuItemEl.length; i++) {
                menuItemActive(i);
            }
        }, 380);
        
        isOpenMenu = true;
    } else { // 메뉴가 활성화된 경우
        closeMenu();
    }
}

function closeMenu() {
    btnMenuEl.classList.remove('active');
    sideMenuEl.classList.remove('open');
    isAni = true;
    setTimeout(function(){
        menuItemReset();
        isAni = false;
    }, 280)
    isOpenMenu = false;
}

// animation 제어
// side-menu ul li의 모든요소를 비활성화
function menuItemReset() {
    for(var i = 0; i < sideMenuItemEl.length; i++) {
        sideMenuItemEl[i].classList.remove('ani');
    }
}

// side-menu ul li 가 개별적으로 활성화
function menuItemActive(id) {
    setTimeout(function() {
        sideMenuItemEl[id].classList.add('ani');
        if (id === sideMenuItemEl.length - 1){
            isAni = false;
        }
        isAni = !(id === sideMenuItemEl.length - 1);
    }, 50 * id);
    // 50 * 0
    // 50 * 1
    // 50 * 2
    // ...
}

function onClickListMenu(e) {
    e.preventDefault();
    const listAnchor = this.querySelector('a').getAttribute('href');
    const listAnchorTop = document.querySelector(listAnchor).offsetTop;
    // console.log(listAnchor, typeof listAnchor, listAnchorTop);

    closeMenu();
    window.scrollTo({
        top: listAnchorTop,
        left: 0,
        behavior: 'smooth'
    });
}

// 이벤트 추가
function addEvent() {
    btnMenuEl.addEventListener('click', onClickBtnMenu);
    for(i = 0; i < sideMenuItemEl.length; i++) {
        sideMenuItemEl[i].addEventListener('click', onClickListMenu);
    }
}

// 초기화
function init() {
    addEvent();
}

init();