myApp.controller('BracketController', 
	function($scope, bracketService) {
	
	$scope.bracket = bracketService.getBracket();
	
	});