// console.log('navigation.js loaded');

$(window).ready(function() {
    // 사용자의 스크롤 상태 여부 체크
    let didScroll;

    let lastScrollTop = 0;
    let delta = 5;
    let navbarHeight = $('header').outerHeight();

    let $navListEls = $('header').find('a');

    // 스크롤 이벤트가 있을 때 didScroll 변수를 true로 설정
    $(window).scroll(function(event) {
        didScroll = true;
        // console.log(didScroll);
    });

    // 내비게이션 이동 함수인 hasScrolled() 실행 및 didScroll 상태 재설정
    // 매 250ms마다 didScroll의 변수 값을 체크하여 동작 실행, 이후 didScroll 변수 값 false로 설정
    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        // 현재 스크롤 값을 scrollTop 변수에 저장
        let scrollTop = $(this).scrollTop();
        
        // 마지막 스크롤 위치 - 현재 스크롤 위치의 절댓값이 delta 값 보다 작을 경우 메소드 이탈
        if (Math.abs(lastScrollTop - scrollTop) <= delta) {
            return;
        }

        // 현재 스크롤 값이 이전 스크롤 값보다 크고 내비게이션의 높이보다 많이 스크롤하였을 경우
        if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
            // Scroll Down
            $('header').addClass('nav-up');
        } else {
            // Scroll Up
            // 문서를 스크롤하지 않은 경우
            // 현재 스크롤 값과 브라우저의 높이 값이 문서 전체의 높이 값보다 작을 경우
            if (scrollTop + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up');
            }
        }

        // 현재 스크롤 위치를 마지막 스크롤 위치에 저장
        lastScrollTop = scrollTop;
    }

    // 내비게이션 리스트 클릭 시 부드럽게 스크롤
    $navListEls.click(function () {
        $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
        }, 800);
        return false;
      });
});