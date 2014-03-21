/**
 * Created by Josh on 3/6/14.
 */

var Directives;
(function (Directives) {

  var version = '0.1.0';

  var VersionDirective = function(){
    return {
      template: 'v' + version
    };
  };

  Directives.VersionDirective = VersionDirective;

}(Directives || (Directives = {})));

angular.module('ng-transform')
  .directive('ngtVersion', Directives.VersionDirective);
