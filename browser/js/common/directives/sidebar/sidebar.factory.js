app.factory('SidebarFactory', function($http){
  var SidebarFactory = {};

  SidebarFactory.getStacks = function(userId) {
    return $http.get('/api/stacks?userId=' + userId)
    .then(res => res.data);
  };

  return SidebarFactory;
});
