app.factory('SignupFactory', function($http){
  var SignupFactory = {};

  SignupFactory.createNewUser = function(userInfo){
    return $http.post('http://localhost:1337/signup', userInfo);
  };

  return SignupFactory;
});

