'use strict';

angular.module('ng-transform', [
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/transform.html',
        controller: 'transformCtrl',
        controllerAs: 'ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
