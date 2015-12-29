var cfg = require('../../common/config.json');

function service(rx, io){
	var self = this;

	this.connection = rx.Observable.create(
		function(o){
			io.on(cfg.events.connected, function(connected){
				console.log('connected! ',connected);
				o.next(connected);
			});
		},
		function(o){
			io.on(cfg.events.connectError, function(e){
				o.error('ERROR', e);
			})
		},
		function(o){
			o.complete();
		}).share();

	this.twitter = rx.Observable.create(
		function(o){
			io.on(cfg.events.twitterTweetEmission, function(tweet){
				o.next(tweet);
			});
		},
		function(o){
			o.error('ERROR IN CLIENT TWITTER OBSERVABLE');
		},
		function(o){
			o.complete();
		}).share();

	this.streams = ['all','input','twitter','connection'];

	return this;
}

var instance;

module.exports = function(rx, io) {
	if (!instance){
		instance = service(rx, io);
	}
	return instance;
}