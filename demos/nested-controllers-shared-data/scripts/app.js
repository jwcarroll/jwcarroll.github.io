(function () {

  function ContactsService($http) {
    this.$http = $http;
  }

  ContactsService.$inject = ['$http'];
  ContactsService.prototype = {
    getContacts: function () {
      return this.$http.get('scripts/contacts.json');
    }
  };

  function ContactsController(contactsService) {
    var _this = this;

    _this.contactsService = contactsService;
    _this.init();
  }

  ContactsController.$inject = ['contactsService'];
  ContactsController.prototype = {
    init: function () {
      var _this = this;

      _this.contactsService.getContacts()
        .success(function (contacts) {
          _this.contacts = contacts;
        });
    },
    deleteSelected: function (contact) {
      _.remove(this.contacts, {isSelected: true});
    },
    selectedCount: function(){
      var counts = _.countBy(this.contacts, 'isSelected');

      return counts['true'] || 0;
    }
  };

  function ContactController() { }

  ContactController.prototype = {
    setContact: function (contact) {
      contact.tweetLimit = contact.tweetLimit || 2;
      this.originalContact = angular.copy(contact);
      this.contact = contact;
      this.editMode = false;
    },
    enableEditMode: function () {
      this.editMode = true;
    },
    saveChanges: function ($event) {
      $event.stopPropagation();
      this.form.$commitViewValue();
      this.setContact(this.contact);
    },
    cancelChanges: function ($event) {
      $event.stopPropagation();
      this.setContact(this.originalContact);
    }
  };

  function ContactDirective() {
    return {
      restrict: 'E',
      templateUrl: 'views/contact.html',
      controller: 'contactController',
      controllerAs: 'ctrl',
      scope: {
        contact: '='
      },
      link: function (scope, elem, attrs, contactCtrl) {
        scope.$watch('contact', function (newContact) {
          //Still just initializing the contact using
          // the controller
          contactCtrl.setContact(newContact);
        });

        elem.on('click', function (e) {
          if (contactCtrl.editMode) {
            e.stopPropagation();
          }
        });
      }
    };
  }

  function TwitterTimelineDirecitve($log, twitter) {
    var widgetOptions = {
      id: "572799510276218880",
      defaultOptions: {
        tweetLimit: 2,
        chrome: 'nofooter transparent',
        width: '520'
      }
    };

    return {
      restrict: 'E',
      scope: {
        twitterName: '@',
        tweetLimit: '@'
      },
      link: function (scope, elem) {
        scope.$watchGroup(['twitterName', 'tweetLimit'], function () {
          if (scope.twitterName) {
            initialize();
          }
        });

        function initialize() {
          elem.empty();

          var spinner = angular.element('<h3>Loading... <i class="fa fa-cog fa-spin"></i></h3>');

          spinner.appendTo(elem);

          twttr.widgets.createTimeline(
            widgetOptions.id,
            elem[0],
            _.defaults({
              tweetLimit: scope.tweetLimit,
              screenName: scope.twitterName
            }, widgetOptions.defaultOptions)
          ).then(function () {
              spinner.remove();
            });
        }
      }
    };
  }

  TwitterTimelineDirecitve.$inject = ['$log'];

  angular.module('nested-controllers', [])
    .service('contactsService', ContactsService)
    .controller('contactsController', ContactsController)
    .controller('contactController', ContactController)
    .directive('contact', ContactDirective)
    .directive('twitterTimeline', TwitterTimelineDirecitve);

}());
