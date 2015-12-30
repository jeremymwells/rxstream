var _ = require('lodash'),
	hash = hash || {};

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

var lifespanTracker = function(name){
	hash[name] = hash[name] || {}, self = this;
	
	this.record = function(key, props){
		
		smashAndOrIncrement(hash[name], key, props)
	}

	this.get = function(){
		return hash[name];
	}
}

module.exports = function(life){
	return new lifespanTracker(life);
}