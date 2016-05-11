(function() {
  'use strict';

  angular.module('myApp.blowup')
    .directive('app', appDirective);

  function appDirective () {
    return {
      restrict: 'E',
      templateUrl: '/javascripts/layouts/layout.directive.html',
      controller: function () {
        console.log("I was called");
      }
    }
  }
}());
