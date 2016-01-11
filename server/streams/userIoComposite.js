var ioRx = require('./io'),
	rx = require('rxjs/Rx'),
	cfg = require(process.cwd() + '/common/config.json');


var name = 'userIo',
	streams = {};

var addStream = function(stream){
	streams[stream] = streams[stream] || 0;
	streams[stream]++;
};

var announceStream = function(socket, stream){
	socket.server.emit(cfg.events.streamAnnounce, stream);
	return socket;
}

addStream(name);

var announcedStream = rx.Observable.combineLatest(rx.Observable.from(Object.keys(streams)), ioRx.stream, function(streamName, socket){
	return announceStream(socket, streamName);
});

var createStream = announcedStream.map(function(socket){
	return socket.on(cfg.events.createStream, function(newStreamName){
		addStream(newStreamName);
		return announceStream(socket, newStreamName);
	});
});



module.exports = {
	stream:createStream,
	name:name
}


