var twitter = new require('twitter')(require('./.secret.json').twitter),
	cfg = require(process.cwd() + '/common/config.json'),
	rx = require('rxjs/Rx'),
	tweetLife = require('./lifespan')('twitter');

var topic = cfg.events.twitterDefaultSubject;

function getTwitterStream(topic, throttle) {
	var topicStream = rx.Observable.fromEventPattern(
		function add(fn){
			twitter.stream('statuses/filter', { track: topic }, function(twitterFeed) {
				var t = {};
				t[topic] = topic;
				tweetLife.record('topic', t);
				console.log('--> TWITTER FEED IS ON!');
				console.log('------> Tracking Topic: ', topic);
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
	return throttle ? topicStream.throttleTime(500) : topicStream;
}




var twitterStream = twitterStream || getTwitterStream(topic, true);

module.exports = twitterStream.share();
