var io = require('socket.io')(),
	rx = require('rxjs/Rx'),
	cfg = require(process.cwd() + '/common/config.json'),
	rooms = ['users'],
	clientsCount = 0;
	
io.listen(cfg.server.port);

var getDefaultStream = function(room){
	return rx.Observable.fromEventPattern(
		function add (fn) {
			io.of(room).on(cfg.events.connect, function(socket){
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
}

var connectStream = rx.Observable.from([''].concat(rooms)).map(function(room){

	return '/'+ room;


}).mergeMap(function(room){
	return getDefaultStream(room);
});

io.of('/users').on(cfg.events.connect, function(socket){
	clientsCount++;
	console.log('--> CLIENT CONNECTED to room! Clients count: ', clientsCount);	
	socket.server.emit(cfg.events.connected, clientsCount);
	fn(socket);
});





var defaultStream = rx.Observable.fromEventPattern(
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

//module.exports = connectStream.share();
module.exports = defaultStream.share();


