
module.exports = function($compile, streams){

	function link(scope, element, attrs) {

		var twitterSub = streams.twitter.subscribe(function(tweet){
			element.prepend($compile(
				`
				
				`
				))
			scope.$apply();
		});
	}

	return {
      restrict: 'E',
      link:link
    };
}