(function() {
  'use strict';

  angular.module('myApp.blowup')
    .directive('myApp.blowup', appDirective);

  function appDirective () {
    return {
      restrict: 'E',
      templateUrl: '/javascripts/layout/layout.directive.html',
      controller: function () {
        console.log("Look me I be was called");
      }
    }
  }
}());
