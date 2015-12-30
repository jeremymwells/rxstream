var _ = require('lodash');


module.exports = function($state, streams){

	function link(scope, element, attrs) {
		// streams.twitter.subscribe(function(tweet){
		// 	console.log(tweet);
		// });
	}

	return {
      restrict: 'E',
      templateUrl:'/directives/streamOutput.template.html',
      link:link
    };
}
