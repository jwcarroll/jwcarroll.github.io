'use strict';

var Controllers;
(function (Controllers) {

  var TransformCtrl = function (textTransformation) {
    this.input = "Name    FaceShape   LegacyProperty  NeverGetsUsed   NobodyKnowsWhatThisMeans KillMeNow";
    this.output = "";

    this.textTransformation = textTransformation;

    this.textTransformation.addTransformation(this.splitWhiteSpace);
    this.textTransformation.addTransformation(this.alphabetize);
    this.textTransformation.addTransformation(this.lowercaseFirst);
    this.textTransformation.addTransformation(this.propertiesToJSObject);
  };

  TransformCtrl.prototype.transform = function () {
    this.output = this.textTransformation.transform(this.input);
  };

  TransformCtrl.$inject = ['textTransformation'];

  TransformCtrl.prototype.splitWhiteSpace = function (input) {
    return input.split(/\s+/);
  };

  TransformCtrl.prototype.alphabetize = function (input) {
    input.sort(function (a, b) {
      return a.localeCompare(b);
    });
    return input;
  };

  TransformCtrl.prototype.lowercaseFirst = function (input) {
    var output = [],
      i = 0;

    for (i = 0; i < input.length; i++) {
      output.push(TransformCtrl.lowercaseFirstSingle(input[i]));
    }

    return output;
  };

  TransformCtrl.lowercaseFirstSingle = function (str) {
    return str.replace(/^([A-Z]{1})/g, function (match) {
      return match.toLowerCase();
    });
  };

  TransformCtrl.prototype.propertiesToJSObject = function (input) {
    var objLines = ["var NewObj = function(config){"];

    angular.forEach(input, function (prop) {
      objLines.push("  this." + prop + " = config." + prop + ";");
    });

    objLines.push("};");

    return objLines.join("\n");
  };

  Controllers.TransformCtrl = TransformCtrl;

}(Controllers || (Controllers = {})));

angular.module('ng-transform')
  .controller('transformCtrl', Controllers.TransformCtrl);
