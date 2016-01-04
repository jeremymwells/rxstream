var _ = require('lodash'),
	streamHash = streamHash || {};

var smashAndOrIncrement = function(hash, key, props){
	hash[key] = hash[key] || {};
	var found = false;
	for(var k in props){
		if (hash[key][k]){
			found = true;
			hash[key][k]++; 
		}
	}
	if (!found) {
		_.assign(hash[key],{key:key},props);
	}
} 

var auditor = function(name){
	streamHash[name] = streamHash[name] || {}, self = this;
	
	this.record = function(key, props){
		
		smashAndOrIncrement(streamHash[name], key, props)
	}

	this.get = function(){
		return streamHash[name];
	}
}

module.exports = function(streamName){
	return new auditor(streamName);
}