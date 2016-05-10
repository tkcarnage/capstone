app.factory('TestBuilderFactory', function($http){
	var testobj = {};
	testobj.create = function(obj){
        obj.body.data = JSON.stringify(obj.body.data);
		return $http.post('/api/tests/', obj)
		.then(function(response){
			console.log(response);
		});
	};
	return testobj;
});
