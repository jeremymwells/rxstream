var clientSocket, 
	io = require('socket.io-client'),
	client = require('../../common/client'),
	cfg = require('../../common/config.json');

module.exports = function(){
	return client;
}