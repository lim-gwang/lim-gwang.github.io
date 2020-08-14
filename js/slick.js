$(function(){
    $(".responsive").slick({
      infinite: true,
  speed: 300,
  slidesToShow: 2,
  centerPadding: '20',
  centerMode: true,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '0',
        slidesToShow: 1
      }
    }

  ]
    });
    
});
