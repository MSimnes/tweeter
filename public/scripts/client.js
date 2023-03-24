$(document).ready(function() {
  $("#tweet-form").submit(function(event) {
    event.preventDefault();
    const tweetData = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: tweetData,
    });
  });
  
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
    for (const entry of tweets) {
      markup += createTweetElement(entry);
    }
    $("#tweet-section").append(markup);
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
              <p class="display-tweet">${object.content.text}</p>
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
  
  // Test / driver code (temporary). Eventually will get this from the server.
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com?73hZDYK.png",
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 12
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1679267767141
  //   },
  //   {
  //     "user": {
  //       "name": "John Cena ",
  //       "avatars": "https://i.imgur.com?73hZDYK.png",
  //       "handle": "@JohnCena"
  //     },
  //     "content": {
  //       "text": "Ya'll can't see me"
  //     },
  //     "created_at": 4
  //   }
  // ];

  // renderTweets(data);
});
