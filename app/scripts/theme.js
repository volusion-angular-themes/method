'use strict';

$(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });

  $('#toTop').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 600); //Scroll time in ms
    return false;
  });

  // Dropdown Menu Fade
  $('.dropdown.th-mega-drop').hover(
    function() {
      $('.dropdown-menu', this).fadeIn('fast');
      $('.dropdown.th-mega-drop').addClass('active-mega-tab');
    },
    function() {
      $('.dropdown-menu', this).fadeOut('fast');
      $('.dropdown.th-mega-drop').removeClass('active-mega-tab');
    });
});
