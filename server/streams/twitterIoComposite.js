var ioRx = require('./io');
var twitterRx = require('./twitter');

var rx = require('rxjs/Rx');
var cfg = require(process.cwd() + '/common/config.json');
var life = require('./lifespan');
var tweetLife = life(twitterRx.name);
var socketLife = life(ioRx.name);

var mappedIoStream = ioRx.stream.map(function(socket){

	socketLife.record(socket.id, {streamAnnounceRegistered:true});	
	//emit stream existence to clients--->
	socket.server.emit(cfg.events.streamAnnounce, twitterRx.name);

	socketLife.record(socket.id, {twitterFeedSubjectChangeHandlerAdded:true});
	//handle subject change event-->
	return socket.on(cfg.events.twitterFeedSubjectChange, function(subject){
		twitterRx.changeSubject(subject);
	});
});

var tweetStream = rx.Observable.combineLatest(twitterRx.stream, mappedIoStream, function(tweet, socket) {	
	tweetLife.record(tweet.id, {emitted:true});
	socketLife.record(socket.id, {twitterTweetEmitted:true});
	socket.server.emit(cfg.events.twitterTweetEmission, tweet);
	return tweet;
});

module.exports = { 
	tweets:tweetStream
};