$(document).ready(function() {

  // toggle new tweet button in nav bar
  $("#toggle-new-tweet").on('click', function() {
    $(".new-tweet").slideDown("slow", function() {
      $(this).css("display", "flex");
      $("#tweet-text").focus();
    });
  });

  // new tweet submission
  $("#tweet-form").submit(function(event) {
    event.preventDefault();
    const tweetText = $('#tweet-text').val().trim();
    const encodedTweetText = encodeURIComponent(tweetText);
    if (encodedTweetText.length === 0) {
      $("#new-tweet-h2").hide();
      $("#error-too-short").show();
      $('#tweet-text').on('input', function() {
        if ($(this).val().length > 0) {
          $("#error-too-short").hide();
          $("#new-tweet-h2").show();
        }
      });
    } else if (tweetText.length > 140) {
      $("#new-tweet-h2").hide();
      $("#error-too-long").show();
      $('#tweet-text').on('input', function() {
        if ($(this).val().length < 141) {
          $("#error-too-long").hide();
          $("#new-tweet-h2").show();
        }
      });
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize(),
        success: function() {
          loadTweets();
        },
        error: function(err) {
          console.log("Error --", err);
        }
      });
      $("#tweet-text").val('');
    }
  });

  // jump to top icon appears on scroll
  $(window).scroll(function() {
    const scrollPos = $(window).scrollTop();
    if (scrollPos > 200) {
      $('#jump-to-top').css("display", "block");
    } else {
      $('#jump-to-top').css("display", "none");
    }
  });

  // scroll to top after clicking icon
  $("#jump-to-top").on("click", function() {
    $("html, body").animate({scrollTop:0}, "slow");
  });
});