console.log("Script Load");

// const IMAGE_WIDTH = 1069;

(function($) {
    $(document).ready(function() {
        console.log('jQuery Ready');

        let isAni = false;
        let cuId = 0;
        let exId = 0;
        let max = void 0;
        let bannerWidth = 0;
        let bannerHeight = 0;

        const $win = $(window);
        const $project = $('#project-2');
        const $banner = $project.find('.img-banner');
        const $wrap = $banner.children('.img-wrap');
        const $images = $wrap.find('img');
        
        const $btnPaddle = $project.find('.img-arrow');
        const $btnPaddlePrev = $project.find('.prev-arrow');
        const $btnPaddleNext = $project.find('.next-arrow');

        function init() {
            setting();
            addEvent();
            reset();
        }

        function setting() {
            cuId = 0;
            exId = cuId;

            max = 5;
        }

        function addEvent() {
            $win.on('resize', handleResizeWindow).trigger('resize');
            $btnPaddle.on('click', handleClickPaddle);
        }

        function handleResizeWindow() {
            bannerWidth = $banner.width();
            bannerHeight = $banner.height();

            $images.width(bannerWidth).height(bannerHeight);

            slideAnimation(true);
        }

        // function. (event handler)
        function handleClickPaddle(e) {
            e.preventDefault();

            if (isAni) {
                return;
            }

            const $el = $(this);

            // const $el = $(e.currentTarget);
            if ($el.is($btnPaddlePrev)) {
                cuId -= 1;
                if (cuId < 0) {
                    cuId = 0;
                }

            } else if ($el.is($btnPaddleNext)) {
                cuId += 1;
                if (cuId > max - 1) {
                    cuId = max - 1;
                }
            }
            if (exId !== cuId) {
                slideAnimation();
            }
        }

        function slideAnimation(isResize = false) {

            const left = `${(bannerWidth * cuId) * -1}px`;

            if (!isResize) {
                // 애니메이션 기능.
                if (!isAni) {
                    isAni = true;
                }

                paddleActive();
                
                const duration = 500 + 100 * Math.abs(cuId - exId);
                const easing = 'easeInSine'
                $wrap.stop(true).animate({ left }, { duration, easing, complete: function() {
                    isAni = false;
                    exId = cuId;
                }});
            } else {
                // 리사이즈 기능.
                isAni = false;
                $wrap.stop(true).css({left});
                exId = cuId;
            }
        }

        function paddleActive() {
            $btnPaddlePrev.removeClass('disabled');
            $btnPaddleNext.removeClass('disabled');
            if (cuId === 0) {
                $btnPaddlePrev.addClass('disabled');
            } else if (cuId === max - 1) {
                $btnPaddleNext.addClass('disabled');
            }
        }

        function reset() {
            isAni = false;
            paddleActive();
        }

        init();
    });
})(jQuery);