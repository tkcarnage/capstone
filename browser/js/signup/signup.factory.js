app.factory('SignupFactory', function($http){
  var SignupFactory = {};

  SignupFactory.createNewUser = function(userInfo){
    return $http.post('/signup', userInfo);
  };

  return SignupFactory;
});
