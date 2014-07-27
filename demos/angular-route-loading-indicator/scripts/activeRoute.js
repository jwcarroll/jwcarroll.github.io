/**
 * Created by Josh on 7/26/14.
 */
(function (app) {
  'use strict';

  var ActivateOnRoute = function ($rootScope, $location) {
    function isActiveRoute(url){
      return url === $location.path();
    }

    var defaultActiveClass = 'active';

    return {
      restrict:'A',
      link:function(scope, elem, attrs){
        $rootScope.$on('$routeChangeSuccess', function(){
          if(isActiveRoute(attrs.activateOnRoute)){
            elem.addClass(attrs.activeClass || defaultActiveClass);
          }else{
            elem.removeClass(attrs.activeClass || defaultActiveClass);
          }
        });
      }
    };
  };

  ActivateOnRoute.$inject = ['$rootScope','$location'];

  app.directive('activateOnRoute', ActivateOnRoute);

}(angular.module('route-change-loader')));