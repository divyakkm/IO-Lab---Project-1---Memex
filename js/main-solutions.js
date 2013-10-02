$(document).ready(function() {

		var username;
		//PART 1
		//1. Write an event handler for the "loadBookmarks" form submit event. 
		//2. In the event handler, create an AJAX request using JSONP to GET all bookmarks for the given user name
		//   The format of the URL is http://feeds.delicious.com/v2/json/' + username + '?callback=?' 
		//   See http://api.jquery.com/jQuery.getJSON/ for more information getJSON with JSONP
		//3. In the AJAX callback function, add all of the bookmarks to the #bookmarks list. You may want to console.log the result first to
		//   see what you're getting back frm the API. Then, use the helper function below
		//   to generate a single list item for each bookmark object

		$('#loadBookmarks').submit(function(e) {

			username = $('#sourceUser').val();
			var url = 'http://feeds.delicious.com/v2/json/' + username + '?callback=?';
			//clear bookmarks list and filtered list items and tag search textfield
			$('#bookmarks li').remove();
			$('#bookmarks br').remove();
			
			

			
			$.getJSON(url, function(data) {
				
				for (var i = 0; i < data.length; i++) {
					var li = generateBookmarkListItem(data[i]);
					 $(this).parent('li').remove();
					 $(this).parent('br').remove();
					$('#bookmarks').append(li);
				}

			});
	

			return false;
			
		});
 
		$('#searchByTagName').submit(function(e){
			var tagName = $('#tagName').val();
			var url='http://feeds.delicious.com/v2/json/'+username+'/'+tagName+'?callback=?';
			//$('#tagName').val("");
			
			$('#bookmarks li').remove();
			$('#bookmarks br').remove();
			$.getJSON(url,function(data){

				for(var j=0;j<data.length;j++){
					var li = filterBookmarkListItem(data[j]);

					$('#bookmarks').append(li);
				}
			});
			return false;
		});


		//PART 2
		//1. Write another form event handler, this time for the "saveBookmarks" form. 
		//2. In the event handler, create an AJAX request to POST each of the checked bookmarks to the second Delicious account
		//    by way of the the proxy file you uploaded to your ISchool account.
		//	  You'll need to extract the url and tags back from each bookmark <li>
		//    Review http://delicious.com/developers to figure out which API method to use and what parameters are required

		//IMPORTANT NOTE: In order to test the request, you will need to Upload the contents of this lab (browser.html, js directory, 
		//css directory) and run it from the web (ex. http://people.ischool.berkeley.edu/~yourname/browser.html) 

		//PART 3 (Advanced/Extra)
		//1. Edit the HTML of the form and modify your JavaScript code to allow the user to add new tags to the selected bookmarks
		//
		

		$('#saveBookmarks').submit(function() {
			
			//alert("IN SAVE BOOKMARKS");

			var listItems = $('li');
			var counter = 0;
			var flag=0;
			
			var user = $('#targetUser').val();
			var pass = $('#password').val();
			$('#targetUser').val("");
			$('#password').val("");
			var trailName = $('#trailName').val();
			$('#trailName').val("");
			if(trailName=="")
			{
				alert("Please enter the trail name");
				return false;
			}
			
			

			listItems.each(function() {
				if ($(this).find(':checked').length > 0) {
					flag=0;
					
					counter=counter+1;
					
					var tagvalue=$(this).find('.tags').text()+ " Trail: "+ trailName + " Step: "+ counter;
					
					



					var deliciousData = {
						username : user,
						password : pass,
						method : 'posts/add',
						url : $(this).find('a').attr('href'),
						tags : tagvalue
					}

					$.ajax({
						url: 'delicious_proxy.php',
						type: 'get',
						data: deliciousData,
						success: function(data) {
							
							if (data.result_code == "done") {
									
									flag=flag+1;
									
									
									$("#targetUser").val('');
									$("#password").val('');
									$("#trailName").val('');
									
									

									if(counter==flag)
									{
										alert("Bookmarks were successfully posted to delicious");
										$('#blankSection').css("background", "url(css/meme.jpg) no-repeat");  
										
									}

								}
								
							
						}, error: function(e){
							console.log("Error",e);
						}

					});
				}
			});
				return false;
			});
			
			


	

		//PART 3 (If you have time)
		//1. Edit the HTML of the form and modify your JavaScript code to allow the user to add new tags to the selected bookmarks
		//


		function generateBookmarkListItem(markObj) {
			// markObj.u = url
            // markObj.t = array of tags

            var listItem = $('<li><input type="checkbox"> <a href="' + markObj.u + '">' + markObj.u + '</a><span class="tags">' + markObj.t + '</span></li>');
            
            return listItem;

		}
		function filterBookmarkListItem(filter){
			var listItem = $('<li><input type="checkbox"> <a href="' + filter.u + '">' + filter.u + '</a><span class="tags">' + filter.t + '</span></li>');
           
            return listItem;
		}
	
});