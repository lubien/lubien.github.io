$(document).ready(function() {
  /*
   * Following Navbar
   * Author: gabrieleromanato
   * URL: https://jsfiddle.net/gabrieleromanato/tQANc/
  */
  $(window).scroll(function () {
    var navbar = $('#navbar');
    var height = $('#page-header').height() + navbar.height() * 2;

    if ($(window).scrollTop() > height) {
      navbar.addClass('navbar-fixed-top');
    }
    if ($(window).scrollTop() < height) {
      navbar.removeClass('navbar-fixed-top');
    }
  });

  /*
   * Jquery Smooth Scroll
   * Author: Chris Coyier
   * URL: https://css-tricks.com/snippets/jquery/smooth-scrolling/
  */
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - $('#navbar').height() * 3
        }, 1000);
        return false;
      }
    }
  });
});
