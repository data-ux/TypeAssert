// Universal Module Definition - AMD & Node.js & browser global, from https://github.com/umdjs/umd
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.typeAssert = factory();
  }
}(this, function(undefined){
	"use strict";
	var n;
	function typeAssert(args, typedef){
		if(!(args && typeof args === "object" && args.length >= 0))
			throw new TypeError("Invalid arguments object");
		if(!Array.isArray(typedef))
			throw new TypeError("Invalid type definition");

		for(n = 0; n < typedef.length; n++){
			checkType(args[n], typedef[n]);
		}
	}

	function checkType(value, def){
		var type = typeof def;
		switch(type){
			case "function":
				checkConstructor(value, def);
				return true;
			case "object":
				if (Array.isArray(def)){
					checkArray(value, def);
					return true;
				}else if(def !== null){
					checkInterface(value, def);
					return true;
				}
		}
		throw new TypeError("Invalid type definition for argument " + (n+1));
	}

	function checkInterface(object, def){
		if(object === null || typeof object !== "object") throw new TypeError("TypeAssert failed for argument " + (n+1));
		for (var p in def){
			if(def.hasOwnProperty(p)){
				checkType(object[p], def[p]);
			}
		}
	}

	function checkArray(array, arraydef){
		if(arraydef[0] === undefined) throw new TypeError("Invalid type definition for argument " + (n+1));
		if(!Array.isArray(array)) throw new TypeError("TypeAssert failed for argument " + (n+1));

		for(var i = 0; i < array.length; i++){
			checkType(array[i], arraydef[0]);
		}
	}

	function checkConstructor(value, constructor){
		switch (constructor){
  			case Number:
  				if(typeof value === "number") return true;
  				break;
  			case Boolean:
  				if(typeof value === "boolean") return true;
  				break;
  			case String:
  				if(typeof value === "string") return true;
  				break;
  		}
  		if(value instanceof constructor) return true;
  		throw new TypeError("TypeAssert failed for argument " + (n+1));
	}
	
	return typeAssert;
}));