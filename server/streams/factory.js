var ioRx = require('./io');
var twitterRx = require('./twitter');
var rx = require('rxjs/Rx');
var cfg = require(process.cwd() + '/common/config.json');
var tweetLife = require('./lifespan')('twitter');


var twitterStream = rx.Observable.combineLatest(twitterRx,ioRx,function(tweet, socket){
	tweetLife.record(tweet.id, {emitted:true})
	socket.server.emit(cfg.events.twitterTweetEmission, tweet);
	return tweet;
});



module.exports = {
	twitterStream:twitterStream
}