app.controller('SignupCtrl',function($scope,AuthFactory){
	$scope.signup = function(var1, var2) {
			AuthFactory.signup(var1, var2);
	};
})
