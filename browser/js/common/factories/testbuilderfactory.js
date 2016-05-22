app.factory('TestBuilderFactory', function($http, AuthService){
	var testobj = {};

	testobj.create = function(obj){
        console.log("OBJ", obj);
        if(obj._id) delete obj._id;
        if (typeof obj.validators != "string") {
            obj.validators = JSON.stringify(obj.validators);
            obj.body.data = JSON.stringify(obj.body.data);
        }
		return $http.post('/api/tests/', obj)
		.then(response => response.data);
	};
    testobj.edit = function(obj){
        obj.validators = JSON.stringify(obj.validators);
        obj.body.data = JSON.stringify(obj.body.data);
        return $http.put('/api/tests/' + obj._id, obj)
        .then(response => response.data);
    };
    testobj.delete = function(obj){
        console.log('TestBuilderFactory.delete was called');
        return $http.delete('/api/tests/' + obj._id)
    };

    testobj.allTests = function() {
        console.log("GETYOTESTS");
        return AuthService.getLoggedInUser()
            .then(function(user) {
                return $http.get('/api/tests?userId=' + user._id);
            })
            .then(function(response) {
                return response.data;
            });
    };

    return testobj;
});
