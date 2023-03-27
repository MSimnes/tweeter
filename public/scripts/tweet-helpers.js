// Helper functions associated with the creation, loading and rendering of tweets
const loadTweets = function() {
  $.ajax({
    method: "GET",
    url: "/tweets",
  })
    .then(response => {
      renderTweets(response);
    })
    .catch(err => console.log("Error --", err));
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
const escape = function(str) {
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
