app.factory('TestBuilderFactory', function($http, AuthService){
	var testobj = {};

	testobj.create = function(obj){
        // var currentDate = new Date();
        // var time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
        // console.log("just hit TestBuilderFactory.create", time);
        var clonedObj = _.cloneDeep(obj);
        // console.log("OBJ", obj);
        if(clonedObj._id){delete clonedObj._id; }
        if (clonedObj.validators) {
            clonedObj.validators = JSON.stringify(clonedObj.validators);
        }
        // currentDate = new Date();
        // time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
        // console.log("just got done stringifying validators", time);
        // console.log("clonedObj", clonedObj.body.data);
        clonedObj.body.data = JSON.stringify(clonedObj.body.data);
		return $http.post('/api/tests/', clonedObj)
		.then(response =>  {
            currentDate = new Date();
            time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
            console.log("jut about to exit TestBuilderFactory.create", time);
            return response.data;
        })
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







