app.factory('SidebarFactory', function($http, AuthService){
  var SidebarFactory = {};

  SidebarFactory.getStacks = function() {
    return AuthService.getLoggedInUser()
    .then(function(user) {
        if (user) {
            return $http.get('/api/stacks?userId=' + user._id);
        }
    })
    .then(res => res.data);
  };



  return SidebarFactory;
});
