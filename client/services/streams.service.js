var cfg = require('../../common/config.json');

function service(rx, io){
	var self = this;
	this.subscribedStreams = [];
	this.all = {};


	this.creation = io.stream.mergeMap((socket)=>{
		return rx.Observable.fromEventPattern((fn) => {
			socket.on(cfg.events.streamAnnounce, (streamName)=>{
				this.all[streamName] = streamName;
				fn(this.all);
			});
		}, (fn) => {
			socket.off(cfg.events.streamAnnounce);
			fn();
		})
	});

	this.createANumberOfStreams = io.stream.mergeMap((socket)=> {
		return rx.Observable.interval(2000).take(5);
	}, (socket, i)=>{
		socket.emit(cfg.events.createStream, i);
		return i;
	});

	this.connection = io.stream.mergeMap((socket)=>{
		return rx.Observable.create((o)=>{
			socket.on(cfg.events.connected, (connected)=>{
				console.log('connected! ',connected);
				o.next(connected);
			}).on(cfg.events.connectError, (e)=>{
				o.error('ERROR', e);
			});
		});
	});

	this.twitter = io.stream.mergeMap(function(socket){
		return rx.Observable.create(function(o){
			socket.on(cfg.events.twitterTweetEmission, function(tweet){
				o.next(tweet);
			});
			//o.error('ERROR IN CLIENT TWITTER OBSERVABLE');
			// o.complete();
		});
	});

	return this;
}


module.exports = service;