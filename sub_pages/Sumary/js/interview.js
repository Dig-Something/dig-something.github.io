// console.log('interview.js loaded');

$(window).ready(function() {
    // 인터랙션 줄 요소 로드: 인터뷰 카드를 담은 .interview-cards, 흘러가는 인터랙션 줄 인터뷰 카드인 .interviewer, 무한으로 흘러가게 하기 위한 .interviewer들의 복제 $clonedCard
    const $interviewBox = $('.content.interview-cards');
    const $card = $('.interview-cards-wrap');
    const $clonedCard = $card.clone();

    let cardWidth = 5;

    $card.each(function(i) {
        cardWidth += $(this, i).outerWidth(true);
    });

    // console.log(cardWidth);

    // .interviewer들의 복제 .interview-cards 내부에 삽입
    $clonedCard.addClass('cloned').appendTo($interviewBox);

    // .interviewer들과 .interviewer들의 복제 애니메이션: TimelineMax
    // force3D: transform 3D 제어
    // repeat: 반복적인 Timeline제어 (1: 2번 반복, -1: 무한 반복)
    // paused: 애니메이션의 정지 상태를 제어

    // TweenMax.to(target(Array), duration, {vars}, 대상간의 간격시간);

    let infinite = new TimelineMax({
        force3D: true,
        repeat: -1,
        paused: false
    });

    let time = 15;

    infinite.fromTo(
        $card, time, {x : 0},
        {x : -cardWidth, ease : Linear.easeNone}, 0);

    infinite.fromTo(
        $clonedCard, time, {x : cardWidth},
        {x : 0, ease : Linear.easeNone}, 0);
    
    infinite.set(
        $card, {x : cardWidth}
    );

    infinite.to(
        $clonedCard, time, {x : -cardWidth, ease : Linear.easeNone}, time
    );

    infinite.to(
        $card, time, {x : 0, ease : Linear.easeNone}, time
    );
});