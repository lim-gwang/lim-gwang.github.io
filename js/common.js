var AC = "active", 
    FX = "fixed", 
    ALL = "allmenu" 

// 모바일 아이패드 프로 기준(1024)
function mobile() {
    var $winW = window.innerWidth
    return $winW < 1025 ? 1 : 0 
}

//active클래스
function active(obj, toggle, title){

    //toggle인경우                      active(this, 1)
    //toggle이면서 접근성(title)        active(this, 1, 1)
    //toggle이 아닌경우                 active(this)
    //toggle이 아니면서 접근성          active(this, 0, 1)

    if(toggle){
        $(obj).parent().toggleClass(AC).siblings().removeClass(AC)
        $("body").on("click", function () {
            $(obj).parent().removeClass(AC)
            if(title) $(obj).attr("title", "" + $(obj).text() + " 열기")       
        })
        if(title){
            var txt = $(obj).parent().hasClass(AC) ? " 닫기" : " 열기"
            $(obj).attr("title", "" + $(obj).text() + txt + "")
        }
    }else{
        $(obj).parent().addClass(AC).siblings().removeClass(AC)
    }
    event.stopPropagation()
    event.preventDefault()
}

function tabs(obj, cont){

    //tab메뉴에 콘텐츠가 포함된경우          tabs(this)
    //tab메뉴와 콘텐츠가 분리된 경우         tabs(this, 1)

    $(obj).attr('title', '선택된 탭메뉴').parent().addClass(AC)
    .siblings().removeClass(AC).children().attr('title','비활성 탭메뉴')
    if(cont){
        $(obj.hash).show().siblings("div").hide()
        event.preventDefault()
    }
}


$(document).ready(function () {
    var $wrap = $("#wrap"),
        $header = $(".header"),
        $depth1 = $(".topmenu .depth1"),
        $sch_layer = $(".sch_layer"),
        $goTop = $(".go_top"),
        $footer = $(".footer")        

    //scroll fixed    
    $(window).on("scroll", function () {
        var scrollTop = $(window).scrollTop()
        scrollTop > 0 ? $header.add($goTop).addClass(FX) : $header.add($goTop).removeClass(FX)
        scrollTop > $footer.offset().top - $(window).height() ? $goTop.addClass("stick") : $goTop.removeClass("stick")
    })

    //gnb  
    var SB = ".submenu"
    $depth1.on("mouseenter focusin", function () {
        if (!$wrap.hasClass(ALL)) {
            $header.addClass(AC)
            active(this)
            $(this).children(SB).stop(true, true).slideDown()
        }
    }).on("mouseleave", function () {
        if (!$wrap.hasClass(ALL)) {
            if(!$sch_layer.hasClass(AC)) $header.removeClass(AC)
            $(this).removeClass(AC).children(SB).hide()            
        }        
    }).children("a").on("click keydown", function (e) {
        if (mobile()) active(this)
        if(e.keyCode == 9 && e.shiftKey) $header.removeClass(AC).find(SB).hide()
    }).find("a:last").on("keydown", function(e){
        if(e.keyCode == 9) $header.removeClass(AC).find(SB).hide()
    })    
    $(".depth3").each(function () {
        $(this).parent().addClass("is-depth3")
    })
    $header.on("click", ".is-depth3>a", function () {
        if (mobile()) active(this,1)
    })
    $(".nav .pop_close").click(function () {
        $wrap.removeClass(ALL)
        $depth1.removeClass(AC)
    })

    //search
    $(".btn_sch_open").on("click", function () {
        $sch_layer.add($header).addClass(AC)  
    })
    $(".btn_sch_close").on("click", function () {
        $sch_layer.add($header).removeClass(AC)
    })

    //allmenu
    $(".btn_allmenu").on("click", function () {
        $wrap.addClass(ALL)
        if (mobile()) $depth1.eq(0).addClass(AC) //모바일메인에서 첫번째 서브메뉴가 펼쳐져 있는 형태
    })

    //top  
    $goTop.on("click", function (e) {
        $("html,body").stop().animate({ scrollTop: 0 }, 800)
        e.preventDefault()
    })
    
    // footer
    $(".relate_site .title").on("click", function () {  
        active(this, 1, 1)
    })   

    // web accessibility
    $("[class*='xi-']").attr("aria-hidden", "true")
    $("a[target='_blank']").attr("title", "새창으로 열림")
 

})