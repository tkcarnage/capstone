app.factory('SignupFactory', function($http){
  var SignupFactory = {};

  SignupFactory.createNewUser = function(userInfo){
    return $http.post('https://warm-lowlands-63755.herokuapp.com/signup', userInfo);
  };

  return SignupFactory;
});
