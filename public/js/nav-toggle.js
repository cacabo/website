// Handle toggling the navbar
function updateClasses() {
  $('#toggle').toggleClass('active');
  $('#menu').toggleClass('active');
}
function handleToggle() {
  $('#toggle').click(updateClasses);
}

$(document).ready(handleToggle);
