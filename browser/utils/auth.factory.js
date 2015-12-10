app.factory("AuthFactory",function($http){

	return {
		login: function(email,password){
			$http.post('/api/users/login',{
				email: email,
				password: password
			}).then(function(response){
				console.log(response)
			}).then(null,console.error.bind(console))
		},
		signup: function(email,password){
			$http.post('/api/users/',{
				email: email,
				password: password
			}).then(function(response){
				console.log(response)
			}).then(null,console.error)
		}
	}

})