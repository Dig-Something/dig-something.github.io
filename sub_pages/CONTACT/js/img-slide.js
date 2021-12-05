var slideContainerEl = document.querySelector('.slide-section');
var sliderEl = document.querySelector('.img-slide');
// console.log(sliderEl);

var isMouseDown = false; // 마우스 다운 여부 체크할 변수
var startX; // 드래그 시작 x좌표
var howScrollLeft; // 드래그 된 x 거리

// 마우스 다운 시 현재 커서 위치를 확인하는 함수
function onMouseDownContainer(e) {
    // console.log("down");

    isMouseDown = true; // 마우스 다운 O 상태 저장
    startX = e.clientX - sliderEl.offsetLeft;
    // 현재 커서 X 위치에서 이미지 슬라이드의 왼쪽 여백을 뺀 값을 드래그 시작 X 값으로 저장

    // clientX : 현재 브라우저 상의 좌표(최상단부터 측정)
    // offsetX : 마우스가 눌린(이벤트 대상) 항목 상에서의 좌표
    // pageX : 브라우저 화면 기준으로 측정

    // startX = e.offsetX - sliderEl.getBoundingClientRect().left;
    // console.log("clientX:" + e.clientX);
    // console.log("offsetLeft:" + sliderEl.offsetLeft);
}

// 마우스 업 시 현재 마우스 다운 여부를 확인하는 함수
function onMouseUpContainer() {
    // console.log("up");
    isMouseDown = false; // 마우스 다운 X 상태 저장
}

// 마우스 드래그 시 이미지가 슬라이드 되는 함수
function onMouseMoveContainer(e) {
    e.preventDefault(); // 마우스 다운 시 이미지 내의 텍스트가 드래그 되는 것을 방지

    // 마우스를 다운하지 않았을 경우 슬라이드 되지 않도록 함
    if(!isMouseDown) {
        return;
    }
    
    // console.log("move");
    // 현재 마우스 커서 위치의 X 값에서 드래그 시작 X 값을 뺀 값을 howScrollLeft에 저장
    // 마우스 다운(startX) -> 마우스 다운 한 채로 드래그(e.clientX) : 사이의 간격을 계산
    howScrollLeft = e.clientX - startX;

    sliderEl.style.top = 0 + 'px'; // Y값 이동 0으로 고정
    sliderEl.style.left = howScrollLeft + "px"; // howScrollLeft 만큼 이미지 슬라이드 왼쪽으로 이동 (-X값은 왼쪽으로 이동하므로 굳이 -1을 곱할 필요 없음) 
    // sliderEl.style.transform = "translateX(" + (howScrollLeft * -1) + "px)";

    checkBoundary(); // 이미지 슬라이드의 경계를 체크하는 함수 checkBoundary 호출
}

// 이미지 슬라이드의 양쪽 경계를 체크하는 함수
function checkBoundary() {
    var container = slideContainerEl.getBoundingClientRect();
    // 이미지 슬라이드를 담은 컨테이너의 위치값 구함 (화면 기준)
    var slider = sliderEl.getBoundingClientRect();
    // 이미지 슬라이드의 위치값 구함 (화면 기중)

    if(parseInt(sliderEl.style.left) > 500) {
        // 이미지 슬라이드의 left 스타일 값이 500보다 커질 때(초기 상태에서 오른쪽으로 더 드래그 할 때)
        sliderEl.style.left = "500px"; // 이미지 슬라이드의 left 스타일 값 500px으로 고정
    }

    else if (slider.right < container.right) {
        // 이미지 슬라이드의 right 스타일 값이 이미지 슬라이드 컨테이너의 right 스타일 값보다 작아질 때 (이미지 슬라이드의 마지막 이미지가 완전히 노출된 상태에서 더 왼쪽으로 드래그 할때)
        sliderEl.style.left = -(slider.width - container.width) + "px";
        // 이미지 슬라이드의 left 스타일 값을 이미지 슬라이드의 넓이와 이미지 슬라이드 컨테이너의 넓이 차 만큼 왼쪽으로 이동(이미지 슬라이드의 끝 변을 이미지 슬라이드 컨테이너의 끝 변에 맞춤)
    }
}

// 이벤트 리스너 추가 함수
function addEvent() {
    slideContainerEl.addEventListener("mousedown", onMouseDownContainer);
    // 이미지 슬라이드 컨테이너 위에서 마우스 다운 시 onMouseDownContainer 함수 호출
    window.addEventListener("mouseup", onMouseUpContainer);
    // 브라우저 내에서 마우스 업 시 onMouseUpContainer 함수 호출(이미지 슬라이드 컨테이너 위에서 마우스 다운 후 커서를 이미지 슬라이드 컨테이너 밖에 위치시켰을 때의 오류 방지)
    slideContainerEl.addEventListener("mousemove", onMouseMoveContainer);
    // 이미지 슬라이드 컨테이너 위에서 마우스를 움직였을 때 onMouseMoveContainer 함수 호출
}

// 초기화 함수
function init() {
    addEvent();
}

init();