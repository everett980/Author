'use strict';

app.controller('StoryDetailCtrl', function ($scope, story, users, AuthFactory) {
	$scope.story = story;
	$scope.users = users;
	$scope.$watch('story', function () {
		$scope.story.save();
	}, true);
	$scope.currentUser = AuthFactory.getCurrentUser;
	$scope.thereIsUser = function() {
			return Boolean($scope.currentUser() !== null);
	}
});
