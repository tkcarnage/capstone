app.factory('TestBuilderFactory', function($http){
	var testobj = {};
	testobj.create = function(obj){
		$http.post('/api/tests/', obj)
		.then(function(response){
			console.log(response);
		});
	};
	return testobj;
});