$(function(){
    // 데스크탑 헤더 이벤트
    var $hd = $("#hd");
    var ACTIVE = "active";
    $(".gnb").hover(function(){
        if ($(window).width() > 1024){
            $hd.addClass(ACTIVE);
        }
    }, function(){
        if ($(window).width() > 1024){
            $hd.removeClass(ACTIVE);
        }
    });
    
    $(".leng").on("click", function(){
        $(this).toggleClass(ACTIVE);
    });

    $(".sitemap").on("click", function(){
        $(this).toggleClass(ACTIVE);
        $hd.toggleClass("allmenu");
        $("body").toggleClass("lay");
        return false;
    });

   

    
    var $section2 = $("#section2");
    var $sections = $('.section');

    var $window_view = $(window).height() + $hd.height(); 

    function scroll_move() {
        var rect = $section2[0].getBoundingClientRect();

        var isFullView = (rect.top >= $hd.height() && rect.top <= window.innerHeight)
            && (rect.bottom >= rect.height && rect.bottom <= window.innerHeight);
        
        // 현재 화면에 전부 보여지고 있지 않으면
        if (!isFullView) {
            if (rect.top < $hd.height()) {
                $("#section2 .container .move_hole").css('top', '98%');
            } else {
                $("#section2 .container .move_hole").css('top', 0);
            }
            return;
        }

        var total = window.innerHeight - rect.height - $hd.height();

        var ratio = (total - rect.top) / total;

        var position = $section2.height()*ratio + $hd.height();

        $("#section2 .container .move_hole").css('top', position);
    }

    function scrolling() {
        if ($(window).scrollTop() === 0 ) {
            $("#hd").removeClass("scrolling");
        } else {
            $("#hd").addClass("scrolling");
        }
    }

    function section_ani() {
        $sections.each(function () {
            var rect = this.getBoundingClientRect();
            if ((rect.top  <= 400) && (rect.bottom >= 0)) {
                $(this).addClass("active");
            } 
             return
            // else (($window_view - all_section[1].top >= 0) || ($window_view - all_section[1].bottom >= 0)) {
            //     $("#section2 .cell_wrap").addClass("active");
            // }
            
        })
        
        

    }
    
    scrolling();
    section_ani();

    $(window).on("scroll", function(){
        scrolling();
        scroll_move();
        section_ani();

    });


    

    // 모바일 헤더 이벤트


    function mo_h_event(){
        if ($(window).width() <= 1024){
                $(this).toggleClass(ACTIVE).siblings().removeClass(ACTIVE)
                return false
            }
    }
    $(".gnb > li").on("click", mo_h_event);

    // 헤더 스크롤 이벤트

    var target = $("#hd");
    var clien_rect = target[0].getBoundingClientRect().top;

    $(window).scroll(function(){
        target.addClass("a_active");
        if (clien_rect == 0) {
            target.removeClass("a_active");
        }
    });

 
    
    // $(".slide_wrap li").hide().first().show();

    $(".sel_btn a").on("click", function(){
        $(this).parent().addClass("active").siblings().removeClass("active");
        $(this.hash).show().siblings().hide();

        return false;
    });
    $(".family_site").on("click", function(){
        $(this).children("ul").slideToggle();
    });
});