
var streams = require('./streams/compositeFactory'),
	audit = require('./streams/audit'),
	rx = require('rxjs/Rx');;

var socketLife = audit('ioRx');

streams.tweet.subscribe(function(tweet){
	//console.log(tweet);
});

streams.userInput.subscribe(function(stream){
	//console.log(stream);
})