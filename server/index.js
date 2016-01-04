
var streams = require('./streams/compositeFactory'),
	audit = require('./streams/audit'),
	rx = require('rxjs/Rx');;

var tweetLife = audit('twitter');
var socketLife = audit('ioRx');

streams.tweet.subscribe(function(tweet){
	tweetLife.record(tweet.id, {eol:true});
	//console.log('subscription 1', socketLife.get());
});

// console.log(streams.userInput);
streams.userInput.subscribe(function(input){
	//console.log('subscribe input', input)
	//console.log('subscription ', socketLife.get());
});