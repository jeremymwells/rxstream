var rx = require('rxjs/Rx');

var userStream = rx.Observable.create(
	function(o){
		
		o.next();
	},
	function(o){
		o.error();
	},
	function(o){
		o.complete();
	}
);