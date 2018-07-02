// Handle submitting the contact form modal
$(document).ready(function setModalListener() {
  // Isolate elements
  var $message = $('#message');
  var $contactForm = $('#contactForm');
  var $modal = $('#contactModal');
  var $button = $('#contactFormButton');

  // When the contact form is submitted
  $contactForm.submit(function handleSubmit(event) {
    // Prevent the default action
    event.preventDefault();

    // Style button
    $button.addClass('disabled');
    $button.val('Sending...');

    // Parse and format form data
    var str = $(this).serialize();

    // Actually make the request
    $.post('/contact', str, function handleResponse(data) {
      if (!data.success) {
        // If sending the message was unsuccessful
        $message.html(`<div class="alert alert-danger">${data.error}</div>`);

        // Reset the button
        $button.removeClass('disabled');
        $button.val('Send');
      } else {
        // If sending the message was successful
        $message.html('<div></div>');
        $contactForm.html('<div class="modal-body"><div class="alert alert-success marg-bot-0">Your email was sent successfully! I will get back to you as quickly as possible.</div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div>');

        // Hide the modal after 2 seconds
        setTimeout(function hideModal() {
          $modal.modal('hide');
        }, 3000);
      }
    }).fail(function handleFailure() {
      // If there was some other error
      $message.html('<div class="alert alert-danger">Something went wrong. Check the form and try again.</div>');

      // Reset the button
      $button.removeClass('disabled');
      $button.val('Send');
    });
  });
});

// Handle submitting the contact page
$(document).ready(function setFormListener() {
  // Isolate elements
  var $contactMessage = $('#contact-page-message');
  var $contactPageForm = $('#contact-form');
  var $submitButton = $('#submit-button');

  if ($contactPageForm) {
    // When the contact form is submitted
    $contactPageForm.submit(function handleSubmit(event) {
      // Prevent the default action
      event.preventDefault();

      // Style button
      $submitButton.addClass('disabled');
      $submitButton.val('Sending...');

      // Parse and format form data
      var str = $(this).serialize();

      // Actually make the request
      $.post('/contact', str, function handleResponse(data) {
        if (!data.success) {
          // If sending the message was unsuccessful
          $contactMessage.html(`<div class="alert alert-danger marg-bot-1">${data.error}</div>`);

          // Reset the button
          $submitButton.removeClass('disabled');
          $submitButton.val('Send');
        } else {
          // If sending the message was successful
          $contactMessage.html('<div></div>');
          $contactPageForm.html('<div><div class="alert alert-success marg-bot-1">Your email was sent successfully! I will get back to you as quickly as possible.</div><a href="/" class="btn btn-primary">Back to home</a></div>');
        }
      }).fail(function handleFailure() {
        // If there was some other error
        $contactMessage.html('<div class="alert alert-danger marg-bot-1">Something went wrong. Check the form and try again.</div>');

        // Reset the button
        $submitButton.removeClass('disabled');
        $submitButton.val('Send');
      });
    });
  }
});
