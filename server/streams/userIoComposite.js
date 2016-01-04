var ioRx = require('./io'),
	rx = require('rxjs/Rx'),
	cfg = require(process.cwd() + '/common/config.json');


var name = 'userIo',
	streams = {};

var addStream = function(stream){
	streams[stream] = streams[stream] || 0;
	streams[stream]++;
};

addStream(name);

var announceStream = rx.Observable.combineLatest(rx.Observable.from(Object.keys(streams)), ioRx.stream, function(streamName, socket){

		//emit stream existence to clients--->
		socket.server.emit(cfg.events.streamAnnounce, streamName);

		socket.on(cfg.events.createStream, function(newStreamName){
			addStream(newStreamName);
			socket.server.emit(cfg.events.streamAnnounce, streams);
		});

		return streams;
	});



module.exports = {
	stream:announceStream,
	name:name
}