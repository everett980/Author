app.factory("AuthFactory",function($http, $rootScope){

		var AuthObj =  {
				user :  null,
setInitialUser: function() {
		console.log('this should log');
		$http.get('/api/users/auth/me').then(function(user) {
				console.log(user);
				AuthObj.user = user.data.email;
		});
},
login: function(email,password){
		$http.post('/api/users/login',{
				email: email,
		password: password
		}).then(function(response){
				console.log('response', response.data)
				AuthObj.user = response.data;
//		$rootScope.$digest();	
		}).then(null,console.error.bind(console))
},
signup: function(email,password){
				$http.post('/api/users/',{
						email: email,
				password: password
				}).then(function(response){
						console.log(response.data)
						AuthObj.user = response.data;
//				$rootScope.$digest();	
				}).then(null,console.error.bind(console))
		},
		signout: function() {
						 console.log('signing out');
						 $http.post('/api/users/logout')
								 .then(function(response) {
										 console.log(response.data);
										 AuthObj.user = null;
										 //$rootScope.$digest();	
								 });
				 },
		getCurrentUser: function() {
								return AuthObj.user;
						}
}

return AuthObj;
})
