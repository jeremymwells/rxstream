module.exports = function($state, streams, $scope){
    
	this.tweets = [], self = this;
	var twitterSub = streams.twitter.subscribe(function(tweet){
		//console.log(tweet);
		$scope.$apply(self.tweets.push(tweet));
	});
	
	console.log('CHILD CONTROLLER');

	$scope.$on("$destroy", function() {
	  twitterSub.dispose();
	});
}