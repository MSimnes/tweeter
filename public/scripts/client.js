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
    } else if (encodedTweetText.length > 140) {
      $("#new-tweet-h2").hide();
      $("#error-too-long").show();
      $('#tweet-text').on('input', function() {
        if ($(this).val().trim().length < 141) {
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
          console.log("There was an error", err);
        }
      });
    }
    $("#tweet-text").val('');
  });
  // jump to top appear on scroll
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

  // helper functions
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
    })
      .then(response => {
        console.log("this is response --", response);
        renderTweets(response);
      })
      .catch(error => console.log("Error --", error));
  };
  loadTweets();

  // Create and render tweets from DB
  const renderTweets = function(tweets) {
    let markup = "";
    $("#tweet-section").empty();
    for (const entry of tweets) {
      markup += createTweetElement(entry);
    }
    $("#tweet-section").append(markup);
  };
  // prevent cross site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(object) {
    const timeAgoString = timeago.format(new Date(object.created_at));
    const $markup = `
            <article class="tweet-container">
              <header>
                <div class="user-avatar-name">
                  <i class="fa-regular fa-user"></i>
                  <span>${object.user.name}</span>
                </div>
                <div class="userID">${object.user.handle}</div>
              </header>
              <p class="display-tweet">${escape(object.content.text)}</p>
              <footer>
                <div class="time-posted">${timeAgoString}</div>
                <div class="interaction-icons">
                  <i class="fa fa-flag icon" aria-hidden="true"></i>
                  <i class="fa fa-retweet icon" aria-hidden="true"></i>
                  <i class="fa-solid fa-heart icon" aria-hidden="true"></i>
                </div>
              </footer>
            </article>`;
    return $markup;
  };
});
