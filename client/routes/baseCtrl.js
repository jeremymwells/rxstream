module.exports = function($state, streams, $scope){
	this.clientCount = 0;
	this.allStreams = [];

	streams.connection.subscribe((clientCount)=>{
		$scope.$apply(()=>{
			this.clientCount = clientCount;
		});
	});

	streams.creation.subscribe((streams)=>{
		console.log('STREAMS!', streams)
		 $scope.$apply(()=>{
			this.allStreams = Object.keys(streams.all);
		 });
	})

	console.log('BASE CONTROLLER');
};