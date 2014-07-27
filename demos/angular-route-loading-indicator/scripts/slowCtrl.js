(function(app) {
  var SlowCtrl = function(contacts) {
    this.contacts = contacts;
  };

  SlowCtrl.$inject = ['contacts'];

  angular.extend(SlowCtrl.prototype, {
    message:'Look Mom, No Lag!',
    contacts: []
  });
  
  app.controller('slowCtrl', SlowCtrl);
  
}(angular.module('route-change-loader')));