// Collapse nav when the contact button is clicked
$('document').ready(function() {
  $('#contact-btn').click(function() {
    $('#overview').removeClass('active');
    $('#menu').removeClass('active');
    $('#toggle').removeClass('active');
  });
});
