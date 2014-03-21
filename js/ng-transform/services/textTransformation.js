/**
 * Created by Josh on 3/6/14.
 */

var Services;
(function (Services) {

  var TextTransformation = function(){
    this.pipeline = [];
  };

  TextTransformation.prototype.addTransformation = function(transform){
    this.pipeline.push(transform);
  };

  TextTransformation.prototype.transform = function(input){
    var inputCopy = angular.copy(input),
      transformFunctions = this.pipeline.slice(0);

    for (var i = 0; i < transformFunctions.length; i++) {
      inputCopy = transformFunctions[i].call(this, angular.copy(inputCopy));
    }

    return inputCopy;
  };

  Services.TextTransformation = TextTransformation;

}(Services || (Services = {})));

angular.module('ng-transform')
  .service('textTransformation', Services.TextTransformation);
