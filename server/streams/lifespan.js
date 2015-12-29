var _ = require('lodash'),
	hash = hash || {};

var lifespanTracker = function(name){
	hash[name] = hash[name] || {};

	this.record = function(key, props){
		_.assign(hash[name][key],{key:key},props);
	}

	this.get = function(){
		return hash[name];
	}
}

module.exports = function(thing){
	return new lifespanTracker(thing);
}