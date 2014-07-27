(function(app) {

  var routeLoadingIndicator = function($rootScope) {
    return {
      restrict: 'E',
      template: "<div ng-show='isRouteLoading' class='center-block loading-indicator'>" +
        "<div class='panel panel-info loading-indicator-body'>" +
        "<div class='panel-heading'><span class='panel-title'><span class='h2'>Loading...</span></span></div>" +
        "<div class='panel-body loading-indicator-target'></div>" +
        "</div>" +
        "</div>",
      replace: true,
      link: function(scope, elem, attrs) {
        var spinner = new Spinner({
          lines: 17, // The number of lines to draw
          length: 20, // The length of each line
          width: 10, // The line thickness
          radius: 25, // The radius of the inner circle
          color:'#d9edf7',
          top: '65%',
          left: '50%'
        }),
          target = elem.find('.loading-indicator-target');
        scope.isRouteLoading = false;

        $rootScope.$on('$routeChangeStart', function() {
          scope.isRouteLoading = true;
          spinner.spin();
          target.append(spinner.el);
        });
        $rootScope.$on('$routeChangeSuccess', function() {
          scope.isRouteLoading = false;
          spinner.stop();
        });
      }
    };
  };
  routeLoadingIndicator.$inject = ['$rootScope'];

  app.directive('routeLoadingIndicator', routeLoadingIndicator);

}(angular.module('route-change-loader')));