'use strict';

app.directive('navbar', function ($state, $location, AuthFactory) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/navbar/navbar.html',
		link: function (scope) {
				console.log('this is a test');
				AuthFactory.setInitialUser();
			scope.pathStartsWithStatePath = function (state) {
				var partial = $state.href(state);
				var path = $location.path();
				return path.startsWith(partial);
			};
			scope.logout = AuthFactory.signout;
			scope.tellMeUser = function() {
					return AuthFactory.getCurrentUser();
			};
		}
	}
});
