// Focus on the first name input field when the modal is triggered
$('#contactModal').on('shown.bs.modal', function() {
  $('#firstName').trigger('focus');
});
