var cfg = require('../../common/config.json');

function service(rx, io){
	console.log(io);
	var self = this;
	this.subscribedStreams = [];
	this.existingStreams = {};

	this.createANumberOfStreams = io.stream.map((socket)=>{
		return socket.on(cfg.events.streamAnnounce, (streamName)=>{
			self.existingStreams[streamName] = streamName;
			console.log('STREAM EXISTS! ', streamName);
		});
	}).mergeMap((socket)=>{
		return rx.Observable.interval(2000);
	}, (socket, int)=>{
		socket.emit(cfg.events.createStream, int);
		return int;
	});

	this.connection = io.stream.mergeMap(function(socket){
		return rx.Observable.create(
			function(o){
				socket.on(cfg.events.connected, function(connected){
					console.log('connected! ',connected);
					o.next(connected);
				}).on(cfg.events.connectError, function(e){
					o.error('ERROR', e);
				});
				o.complete();
			});
	});

	this.twitter = io.stream.mergeMap(function(socket){
		return rx.Observable.create(function(o){
			socket.on(cfg.events.twitterTweetEmission, function(tweet){
				o.next(tweet);
			});
			//o.error('ERROR IN CLIENT TWITTER OBSERVABLE');
			o.complete();
		});
	});

	

	return this;
}


module.exports = service;