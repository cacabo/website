// Collapse nav when the contact button is clicked
$('document').ready(function() {
  $('#contact-btn').click(function() {
    console.log('click');
    $('#overview').removeClass('active');
    $('#menu').removeClass('active');
    $('#toggle').removeClass('active');
  });
});
