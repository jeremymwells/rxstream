//requires-->
var twitter = new require('twitter')(require('./.secret.json').twitter),
	cfg = require(process.cwd() + '/common/config.json'),
	rx = require('rxjs/Rx');

//locals-->
var name = 'twitter';
var audit = require('./audit');
var tweetLife = audit(name);
var subject = cfg.twitterDefaultSubject;


var tweetStream = rx.Observable.fromEventPattern(
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
);

var changeSubject = function(sub){
	subject = sub;
}

module.exports = {
	changeSubject: changeSubject,
	stream: tweetStream.share(),
	name:name
};