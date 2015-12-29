var io = require('socket.io')(),
	rx = require('rxjs/Rx'),
	cfg = require(process.cwd() + '/common/config.json'),
	clientsCount = 0;
	
io.listen(cfg.server.port);

var connectStream = rx.Observable.fromEventPattern(
	function add (fn) {
		io.on(cfg.events.connect, function(socket){
			clientsCount++;
			console.log('--> CLIENT CONNECTED! Clients count: ', clientsCount);	
			socket.server.emit(cfg.events.connected, clientsCount);
			fn(socket);
		});
	},
	function remove (fn) {
		io.close();
		console.log('socket io object closed');
	}

).map(function(socket){
	return socket.on(cfg.events.disconnect, function(){
		clientsCount--;
		console.log('<-- CLIENT DISCONNECTED! Clients count: ', clientsCount);
		socket.server.emit(cfg.events.connected, clientsCount);
	});
});


module.exports = connectStream.share();