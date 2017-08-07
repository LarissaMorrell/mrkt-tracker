





$(document).on('click', '#edit-store-location', function(event) {
  console.log('in event listener');
    $('.toggle-details').toggle();
});

$(".nav a").on("click", function(){
   $(".nav").find(".active").removeClass("active");
   $(this).parent().addClass("active");
});
