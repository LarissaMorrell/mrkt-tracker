console.log('in app.js');

$(document).on('click', '#edit-store-location', function(event) {
  console.log('in event listener');
    $(this).toggle();
});
