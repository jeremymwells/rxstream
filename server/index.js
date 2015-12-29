
var streams = require('./streams/factory');
var tweetLife = require('./streams/lifespan')('twitter');

streams.twitterStream.subscribe(
	function(tweet){ 
		tweetLife.record(tweet.id, {eol:true});
	},
	function(e){
		tweetLife.record(tweet.id, {error:e});
	}
);

