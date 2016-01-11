
var streams = require('./streams/compositeFactory'),
	audit = require('./streams/audit'),
	rx = require('rxjs/Rx');;

var socketLife = audit('ioRx');

streams.io.subscribe(function(socket){
})