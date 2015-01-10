/**
 * Created by Josh on 1/9/2015.
 */
(function () {
  'use strict';

  function FakeService($timeout) {
    var svc = this,
      numCalls = 0;

    svc.fakeCall = function (delay) {
      numCalls += 1;

      return $timeout(function () {

        return {
          callNumber: numCalls
        };

      }, delay || 50);
    };
  }

  function SimpleBooleanController(fakeService) {
    this.fakeService = fakeService;
    this.isBusy = false;
  }

  SimpleBooleanController.prototype = {
    makeCall: function (delay) {
      var _this = this;

      _this.isBusy = true;
      _this.fakeService.fakeCall(delay)
        .then(function (result) {
          _this.result = result;
        }).finally(function () {
          _this.isBusy = false;
        });
    }
  };

  function Spinner(){
    return {
      restrict: 'E',
      template: '<i class="fa fa-cog fa-spin ng-hide" ng-show="show"></i>',
      scope: {
        show: '='
      }
    };
  }

  function SpinnerDirective($timeout) {
    return {
      restrict: 'E',
      template: '<i class="fa fa-cog fa-spin"></i>',
      scope: {
        show: '=',
        delay: '@'
      },
      link: function(scope, elem, attrs) {
        var showTimer;

        //This is where all the magic happens!
        // Whenever the scope variable updates we simply
        // show if it evaluates to 'true' and hide if 'false'
        scope.$watch('show', function(newVal){
          newVal ? showSpinner() : hideSpinner();
        });

        function showSpinner() {
          //If showing is already in progress just wait
          if (showTimer) return;

          //Set up a timeout based on our configured delay to show
          // the element (our spinner)
          showTimer = $timeout(showElement.bind(this, true), getDelay());
        }

        function hideSpinner() {
          //This is important. If the timer is in progress
          // we need to cancel it to ensure everything stays
          // in sync.
          if (showTimer) {
            $timeout.cancel(showTimer);
          }

          showTimer = null;

          showElement(false);
        }

        function showElement(show) {
          show ? elem.css({display:''}) : elem.css({display:'none'});
        }

        function getDelay() {
          var delay = parseInt(scope.delay);

          return isNaN(delay) ? 200 : delay;
        }
      }
    };
  }

  angular.module('simple-boolean-example', [])
    .service('fakeService', FakeService)
    .controller('simpleBooleanController', SimpleBooleanController);

  angular.module('simple-spinner-directive-example', [])
    .directive('spinner', Spinner);

  angular.module('fast-spinner-example', [
    'simple-boolean-example',
    'simple-spinner-directive-example'
  ]);

  angular.module('final-example', ['simple-boolean-example'])
    .directive('spinner', SpinnerDirective);

  angular.element(document)
    .ready(function () {
      bootstrapExamples();
    });

  function bootstrapExamples() {
    var demoElems = document.querySelectorAll(".example-code");

    angular.forEach(demoElems, bootstrapExample);
  }

  function bootstrapExample(elem) {
    angular.bootstrap(elem, [elem.getAttribute('data-example-name')]);
  };
}());