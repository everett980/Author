app.controller('LoginCtrl',function($scope,AuthFactory){
	$scope.login = function(var1, var2) {
			AuthFactory.login(var1, var2);
	};
})
