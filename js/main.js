$(function () {
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});
/*
 * source: https://css-tricks.com/snippets/jquery/smooth-scrolling/ 
 */


$(init);

function init() {
    $('a[rel^="prettyPhoto"]').prettyPhoto({
        allow_resize: true,
//        theme: 'dark_rounded', /* light_rounded / dark_rounded / light_square / dark_square / facebook */                                                        
        ie6_fallback: true,
        social_tools: false

    });
    $.fn.animateRotate = function (angle, duration, easing, complete) {
        var args = $.speed(duration, easing, complete);
        var step = args.step;
        return this.each(function (i, e) {
            args.complete = $.proxy(args.complete, e);
            args.step = function (now) {
                $.style(e, 'transform', 'rotate(' + now + 'deg)');
                if (step)
                    return step.apply(e, arguments);
            };

            $({deg: 0}).animate({deg: angle}, args);
        });
    };
    setListeners();    
}

function setListeners() {
    $('a.float-trigger').on('click', function (e) {
        e.preventDefault();
        $el = $('.float-bar');

        if ($el.hasClass('visible')) {
            d = '0';
            $('.float-trigger').css({
                '-moz-transform': 'rotate(' + d + 'deg)',
                '-webkit-transform': 'rotate(' + d + 'deg)',
                '-o-transform': 'rotate(' + d + 'deg)',
                '-ms-transform': 'rotate(' + d + 'deg)',
                'transform': 'rotate(' + d + 'deg)'
            });
            $('.ball').animateRotate(720);
            $el.removeClass('visible');
            $('.float-bar').animate({
                width: '0px'
            }, function () {
                $('.float-bar').hide();
            });
            $('.float-trigger i').addClass('animated');
        } else {
            d = '-90';
            $('.float-trigger').css({
                '-moz-transform': 'rotate(' + d + 'deg)',
                '-webkit-transform': 'rotate(' + d + 'deg)',
                '-o-transform': 'rotate(' + d + 'deg)',
                '-ms-transform': 'rotate(' + d + 'deg)',
                'transform': 'rotate(' + d + 'deg)'
            });
            $el.addClass('visible');
            $('.float-trigger i').removeClass('animated');
            $('.float-bar').show().animate({
                width: '250px'
            });
            $('.ball').animateRotate(-720);
        }
    });

    var amountScrolled = $(window).height();

    $(window).scroll(function () {
        if ($(window).scrollTop() > amountScrolled) {
            $('.float-trigger').fadeIn('slow');
        } else {
            $('.float-trigger').fadeOut('slow');
        }
    });
}
