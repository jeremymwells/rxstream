var ioRx = require('./io'),
	twitterRx = require('./twitter'),
	rx = require('rxjs/Rx'),
	cfg = require(process.cwd() + '/common/config.json'),
	audit = require('./audit');

var tweetLife = audit(twitterRx.name);
var socketLife = audit(ioRx.name);
var name = 'tweet feed';




var mappedIoStream = ioRx.stream.map(function(socket){

	socketLife.record(socket.id, {twitterStreamAnnounceRegistered:true});	
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
	stream:tweetStream,
	name:name
};