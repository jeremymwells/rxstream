

module.exports = function($compile, streams){

	function link(scope, element, attrs) {

		var twitterSub = streams.twitter.subscribe(function(tweet){
			scope.tweet = tweet;
			var template = $compile('<div class="tweet"><p>x: {{tweet.user.name}}</p><p>{{tweet.created_at}}<p><p>{{tweet.text}}</p></div>')(scope);
			console.log(tweet.id, template.html());
			element.append(template.html());
		});
	}

	return {
      restrict: 'E',
      link:link
    };
}
