# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

# Screenshots

Responsive design for three media sizes

Mobile:
!["Mobile with tweet composer open"] (https://github.com/MSimnes/tweeter/blob/master/docs/mobile-tweet-form.png?raw=true)
Tablet:
!["Tablet layout with tweet composer hidden"] (https://github.com/MSimnes/tweeter/blob/master/docs/tablet-tweet-view.png?raw=true)
Desktop:
!["Desktop layout with tweet composer hidden"] (https://github.com/MSimnes/tweeter/blob/master/docs/desktop-tweet-view.png?raw=true)

## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

# Functionality

Clicking the "Create new tweet" button will expose the tweet composer. Attempting to post an empty text field will prompt an error message. This will disappear after typing a character into the text field. 

The character counter will count down as you type and turn red when you're over the limit. If you try to post an over-limit tweet an error message will show. It will disappear once you are back within the character limit.

Once a successful tweet is submitted it will appear as the latest tweet in the chronologically displayed tweet section.

The page has some hover effects as well as a scroll-to-top icon that will appear after scrolling and will return the user to the top of the page when clicked.

## Dependencies

- Express
- Node 5.10.x or above
- timeago.js
- md5
- Chance 

