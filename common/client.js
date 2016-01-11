var io = require('socket.io-client'),
	cfg = require('./config.json'),
	rx = require('rxjs/Rx'),

	name = 'clientIo';

var clientRx = rx.Observable.create(function(observer){
	try{
		observer.next(io.connect(cfg.server.protocol + '://' + cfg.server.host + ':' + cfg.server.port));
	}catch(z){
		observer.error(z);
	}finally{
		observer.complete();
	}
});

module.exports = {
	stream: clientRx,
	name: name
}