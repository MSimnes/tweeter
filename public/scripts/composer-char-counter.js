$(document).ready(function() {

  // toggle new tweet button in nav bar
  $("#toggle-new-tweet").on('click', function() {
    $(".new-tweet").slideDown("slow", function() {
      $(this).css("display", "flex");
      $("#tweet-text").focus();
    });
  });
  // handle textarea sizing and character counter
  $("#tweet-text").on("input", function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
    let tweetLength = $(this).val().length;
    let charactersLeft = 140 - tweetLength;
    $(".counter").text(charactersLeft);
    if (charactersLeft < 0) {
      $(".counter").css("color", "red");
    } else $(".counter").css("color", "#545149");
  });
});