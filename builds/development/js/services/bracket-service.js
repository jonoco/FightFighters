myApp.service('bracketService', function() {
	var bracket = {};

	var setBracket = function( newObj ) {
		bracket = newObj;
	}

	var getBracket = function() {
		return bracket;
	}

	return {
		setBracket: setBracket,
		getBracket: getBracket
	};

});