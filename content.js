// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if( request.message === "clicked_browser_action" ) {
		var facebookFriendsLink = 'https://m.facebook.com/friends/center/friends';

		// send a message that the user clicked on the tab
	    chrome.runtime.sendMessage({"message": "open_new_tab", "url": facebookFriendsLink});
    }
});

const friendList = Array.from(document.querySelectorAll('#friends_center_main div[data-sigil="undoable-action"]'));

// get current friends listed on the page 
var friends = []
friendList.forEach((element) => {
	var friendInfo = {}
	var friendName = element.querySelector('h3 a').innerHTML;
	friendInfo['friendName'] = friendName;

	var regexImage = /\(([^)]+)\)/;
	var imageUrlToBeCleaned = element.querySelector('div div div a i').getAttribute('style')
	var cleanedImageUrl = regexImage.exec(imageUrlToBeCleaned)[1];

	friendInfo['imageUrl'] = cleanedImageUrl;

	friends.push(friendInfo);
});

// clear the viewport
document.getElementById('viewport').style.display = "none";

// add in a card
var view = {
  imageUrl: friends[0]['imageUrl'],
  friendName: friends[0]['friendName']
};
var card = 
	'<div class="card" style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);transition: 0.3s;">' + 
  	'<img src={{imageUrl}} alt="Avatar" style="no-repeat center;background-size:100% 100%;-webkit-background-size:100% 100%;width:68px;height:68px;">' +
  	'<div class="container style=padding: 2px 16px;">' +
  	'<h4><b>{{friendName}}</b></h4>' +
   	'<p>Architect & Engineer</p>'+
  	'</div>'+ 
	'</div>';

var output = Mustache.render(card, view);
console.log(output);



