$(document).ready(function() {
// character counter
  $("#tweet-text").on("input", function() {
    let tweetLength = $(this).val().length;
    let charactersLeft = 140 - tweetLength;
    $(".counter").text(charactersLeft);
    if (charactersLeft < 0) {
      $(".counter").css("color", "red");
    } else $(".counter").css("color", "#545149");
  });
  $('.icon').on('click', function() {
    $(this).addClass('clicked');
  });


});