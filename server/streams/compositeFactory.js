


module.exports = {
	io: require('./io').stream,
	tweet: require('./twitterIoComposite').stream,
	userInput: require('./userIoComposite').stream
};