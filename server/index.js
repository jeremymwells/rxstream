
var streams = require('./streams/compositeFactory');
var tweetLife = require('./streams/lifespan')('twitter');
var socketLife = require('./streams/lifespan')('ioRx');
var rx = require('rxjs/Rx');

streams.tweets.subscribe(function(tweet){
	tweetLife.record(tweet.id, {eol:true});
	console.log(socketLife.get());
});