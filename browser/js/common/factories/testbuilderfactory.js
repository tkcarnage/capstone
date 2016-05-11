app.factory('TestBuilderFactory', function($http){
	var testobj = {};
	testobj.create = function(obj){
        obj.body.data = JSON.stringify(obj.body.data);
		return $http.post('/api/tests/', obj)
		.then(response => response.data);
	};
    testobj.edit = function(obj){
        obj.body.data = JSON.stringify(obj.body.data);
        return $http.put('/api/tests/' + obj._id, obj)
        .then(response => response.data);
    };
	return testobj;
});
