$(document).ready(function() {


	//PART 1
	//1. Create an event handler for the "loadBookmarks" form submit event. 

	//2. In the body of the event handler, create an AJAX request that uses JSONP to GET all bookmarks for the user name (ex. iolab)
	//   The format of the URL to make the request to is http://feeds.delicious.com/v2/json/' + username + '?callback=?' 
	//   See http://api.jquery.com/jQuery.getJSON/ for more information on getJSON with JSONP

	//3. In the callback function of your GET request, add all of the bookmarks to the #bookmarks list. You may want to console.log the
	//   result first to see what you're getting back frm the API. Then, use the helper function below
	//   to generate a single list item for each bookmark object


	//PART 2
	//1. Write another form event handler, this time for the "saveBookmarks" form. 

	//2. In the event handler, create an AJAX request to POST each of the checked bookmarks to the second Delicious account
	//    by way of the the proxy file you uploaded to your ISchool account.
	//	  You'll need to extract the url and tags back from each bookmark <li>
	//    Review http://delicious.com/developers to figure out which API method to use and what parameters are required

	//IMPORTANT NOTE: In order to test the request, you will need to Upload the contents of this lab (browser.html, js directory, 
	//css directory) and run it from the web (ex. http://people.ischool.berkeley.edu/~yourname/browser.html) 

	//PART 3 (Advanced/extra)
	//1. Edit the HTML of the form and modify your JavaScript code to allow the user to add new tags to the selected bookmarks
	//


	function generateBookmarkListItem(markObj) {
		// markObj.u = url
	    // markObj.t = array of tags

	    var listItem = $('<li><div><input type="checkbox"> <a href="' + markObj.u + '">' + markObj.u 
	    	+ '</a></div><span class="tags">' + markObj.t + '</span></li>');
	    return listItem;

	}


});
