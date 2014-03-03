$(document).ready(function(){
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });

  $('#toTop').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600); //Scroll time in ms
    return false;
  });
});

// Dropdown Menu Fade
jQuery(document).ready(function(){
    $(".dropdown.vn-mega-drop").hover(
        function() {
          $('.dropdown-menu', this).fadeIn("fast"),
          $('.dropdown.vn-mega-drop').addClass('active-mega-tab');
        },
        function() {
          $('.dropdown-menu', this).fadeOut("fast"),
          $('.dropdown.vn-mega-drop').removeClass('active-mega-tab');
    });
});
