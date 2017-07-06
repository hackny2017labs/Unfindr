// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
		var facebookFriendsLink = 'https://m.facebook.com/friends/center/friends';
      	console.log('https://m.facebook.com/friends/center/friends');

		// This line is new!
	    chrome.runtime.sendMessage({"message": "open_new_tab", "url": facebookFriendsLink});
    }
  }
);