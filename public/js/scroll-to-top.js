$('document').ready(function() {
  $('#scroll-to-top').click(function() {
    $('body, html').animate({
        scrollTop: 0
    }, 400);
  });
});
