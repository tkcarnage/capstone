'use strict';

app.factory('TestBuilderFactory', function($http, AuthService){
	var testobj = {};

	testobj.create = function(obj){
        var clonedObj = _.cloneDeep(obj);
        if(clonedObj._id){delete clonedObj._id; }
        if (clonedObj.validators) {
            clonedObj.validators = JSON.stringify(clonedObj.validators);
        }
        clonedObj.body.data = JSON.stringify(clonedObj.body.data);
		return $http.post('https://warm-lowlands-63755.herokuapp.com/api/tests/', clonedObj)
		.then(response =>  {
            return response.data;
        });
	};
    testobj.edit = function(obj){
        var clonedObj = _.cloneDeep(obj);
        if (clonedObj.validators) {
            clonedObj.validators = JSON.stringify(clonedObj.validators);
        }
        clonedObj.body.data = JSON.stringify(clonedObj.body.data);
        return $http.put('https://warm-lowlands-63755.herokuapp.com/api/tests/' + clonedObj._id, clonedObj)
        .then(response => response.data);
    };
    testobj.delete = function(obj){
        return $http.delete('https://warm-lowlands-63755.herokuapp.com/api/tests/' + obj._id)
    };

    testobj.allTests = function() {
        return AuthService.getLoggedInUser()
            .then(function(user) {
                return $http.get('https://warm-lowlands-63755.herokuapp.com/api/tests?userId=' + user._id);
            })
            .then(function(response) {
                return response.data;
            });
    };

    return testobj;
});







