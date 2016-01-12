var _ = require('lodash');


module.exports = function($state, streams){

	streams.createANumberOfStreams.subscribe((s)=>{console.log('emitted create stream event for stream: ',s)});

	function link(scope, element, attrs) {

		element
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
