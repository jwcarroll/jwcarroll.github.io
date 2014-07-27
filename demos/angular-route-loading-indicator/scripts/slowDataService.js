(function(app){
  
  var SlowDataService = function($timeout){
    this.$timeout = $timeout;
  };
  SlowDataService.$inject = ['$timeout'];
  
  angular.extend(SlowDataService.prototype, {
    contacts:[{
      name:'Todd Moto',
      blog:'http://toddmotto.com/',
      twitter:'@toddmotto'
    },{
      name:'Jeremy Likness',
      blog:'http://csharperimage.jeremylikness.com/',
      twitter:'@jeremylikness'
    },{
      name:'John Papa',
      blog:'http://www.johnpapa.net/',
      twitter:'@John_Papa'
    },{
      name:'Josh Carroll',
      blog:'http://www.technofattie.com/',
      twitter:'@jwcarroll'
    }],
    getContacts:function(){
      var _this = this;
      return this.$timeout(function(){
        return angular.copy(_this.contacts);
      }, 2000);
    }
  });
  
  app.service('slowDataService', SlowDataService);
  
}(angular.module('route-change-loader')));