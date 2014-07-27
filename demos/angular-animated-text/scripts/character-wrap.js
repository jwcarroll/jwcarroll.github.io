/**
 * Created by Josh on 7/12/14.
 */
(function () {
  'use strict';

  var CharacterWrap = function($log){
    function createChangeHandler(scope, elem, attrs){
      return function(newVal, oldVal){
        
      };
    }

    return {
      restrict:'E',
      replace:true,
      template:'<pre>{{value}}</pre>',
      scope:{
        value:'='
      },
      link:function(scope, elem, attrs){
        scope.$watch('value', createChangeHandler(scope, elem, attrs));
      }
    };
  };
  CharacterWrap.$inject = ['$log'];

  CharacterWrap.charMap = {
    10:true,
    13:true,
    32:true
  };

  CharacterWrap.isCtrlChar = function(char){
    return CharacterWrap.charMap[char.charCodeAt(0)] || false;
  };

  angular.module('animated-text')
    .directive('characterWrap', CharacterWrap);

}());