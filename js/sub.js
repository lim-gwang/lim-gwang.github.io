$(document).ready(function () { 
    //sns
    $(".sns_btn").click(function () {
        active(this, 1, 1)       
    })    

	/* 서브메뉴를 모바일로 변경할 경우 */    
    var $depth2Active = $("#snb .depth2 > li.active"),
        $depth3Active = $("#snb .depth3 > li.active")
    $depth2Active.add($depth3Active).click(function(){
        if (mobile()){
            active(this, 1, 1)               
        }
    })    

    // 탭메뉴
    $('.tabs>li>a').on('click', function () {
        tabs(this, 1)
    })

    //아코디언
	$(".accordion>li>a").on("click", function(){
		active(this, 1, 1)   
	})


})
