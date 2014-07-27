(function () {
  var app = angular.module('route-change-loader', ['ngRoute', 'ngAnimate']);

  var slowResolve = function (slowDataService) {
    return slowDataService.getContacts();
  };
  slowResolve.$inject = ['slowDataService'];

  app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/default.html'
      })
      .when('/route1', {
        templateUrl: 'views/route1.html',
        controller: 'slowCtrl',
        controllerAs: 'ctrl',
        resolve: {
          contacts: slowResolve
        }
      }).otherwise({
        redirectTo: '/'
      });

  }]);

}());
