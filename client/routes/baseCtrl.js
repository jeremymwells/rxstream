module.exports = function($state, streams, $scope){
	this.clientCount = 0;
	this.allStreams = {};

	streams.connection.subscribe((clientCount)=>{
		$scope.$apply(()=>{
			this.clientCount = clientCount;
		});
	});

	console.log(streams.all);

	streams.creation.subscribe((streams)=>{
		$scope.$apply(()=>{
			this.allStreams = streams;
		});
	});

	console.log('BASE CONTROLLER');
};