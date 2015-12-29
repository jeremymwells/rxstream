var clientSocket, 
	io = require('socket.io-client'),
	cfg = require('../../common/config.json');

module.exports = function(){
	if (!clientSocket){ 
		clientSocket = io.connect(cfg.server.protocol + '://' + cfg.server.host + ':' + cfg.server.port); 
	}
	
	return clientSocket;
}