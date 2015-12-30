var twitter = new require('twitter')(require('./.secret.json').twitter),
	cfg = require(process.cwd() + '/common/config.json'),
	rx = require('rxjs/Rx'),
	name = 'twitter',
	tweetLife = require('./lifespan')(name),
    subject = cfg.twitterDefaultSubject;

function getTweetStream(topic, throttle, time) {
	subject = topic || subject;
	var topicStream = rx.Observable.fromEventPattern(
		function add(fn){
			twitter.stream('statuses/filter', { track: subject }, function(twitterFeed) {
				var t = {};
				t[subject] = subject;
				tweetLife.record('topic', t);
				console.log('--> TWITTER FEED IS ON!');
				console.log('------> Tracking Topic: ', subject);
				twitterFeed.on(cfg.events.twitterTweet,function(tweet) {
					tweetLife.record(tweet.id, {received: true});
					fn(tweet);
				});
			});
		},
		function remove(fn){
			twitter = undefined;
		}
	)
	;
	return (throttle ? topicStream.throttleTime(time || 500) : topicStream).share();
}

var tweetStream = getTweetStream();

var changeSubject = function(sub){
	subject = sub;
}

module.exports = {
	changeSubject: changeSubject,
	stream: tweetStream,
	name:name
};