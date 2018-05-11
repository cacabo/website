// Handle submitting the contact form
$(document).ready(function() {
  // Isolate elements
  var $message = $('#message');
  var $contactForm = $('#contactForm');
  var $modal = $('#contactModal');

  // When the contact form is submitted
  $contactForm.submit(function(event) {
    // Prevent the default action
    event.preventDefault();

    // Parse and format form data
    // var array = $(this).serializeArray();
    // var obj = {};
    // array.forEach(element => obj[element.name] = element.value);
    var str = $(this).serialize();

    // Actually make the request
    $.post('/contact', str, function(data) {
      if (!data.success) {
        // If sending the message was unsuccessful
        $message.html(`<div class="alert alert-danger">${data.error}</div>`);
      } else {
        // If sending the message was successful
        $message.html('<div></div>');
        $contactForm.html('<div class="modal-body"><div class="alert alert-success marg-bot-0">Your email was sent successfully! I will get back to you as quickly as possible.</div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div>');

        // Hide the modal after 2 seconds
        setTimeout(function() {
          $modal.modal('hide');
        }, 3000);
      }
    })
      .fail(function() {
        // If there was some other error
        $message.html('<div class="alert alert-danger">Something went wrong. Check the form and try again.</div>');
      });
  });
});
