app.factory('SignupFactory', function($http){
  var SignupFactory = {};

  SignupFactory.createNewUser = function(userInfo){
    return $http.post('/api/users', userInfo);
  };

  return SignupFactory;
});