(function() {
  'use strict';

  var dependencies = [
    'ui.router',
    'app.services'
  ];

  angular.module('myApp', dependencies)
    .config(setupRoutes);

  setupRoutes.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider'
  ];

  function setupRoutes($stateProvider, $urlRouterProvider, $locationProvider){
    // $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('app', {
          url: "/app",
          template: "<app></app>",
          resolve: {
              function currentUser($http) {

                  var config = {
                      headers: {
                          Authorization: "bearer" + (localStorage.getItem('token') || '')
                      }
                  }
                  return $http.get('http//:localhost3000/api/blowup/me', config).then(function(response) {
                      return response.data;
                  })
              }
          }
      })
      .state('login', {
        url: "/login",
        template: `<form ng-submit="login()">
        <input type="text" ng-model="email">
        </form>`,
        controller: function($scope, $http){
          $scope.login =function () {
            $http.post('http://localhost:3000/api/blowup/login', {email: $scope.email})
            .then(function(response){
              localStorage.setItem('token', response.data.token)
              $state.go('app')
            })
          }
        }
      })
      .state('home', {
          url: '/',
          views: {
              'header': {
                templateUrl: 'javascripts/partials/header.html',
                controller: 'HeaderCtrl'
              },
              'posts': {
                template: '<posts />',
                controller: 'HeaderCtrl'
              }
          }
        })
        .state('404', {
          url: '/404',
          views: {
              'body': {
                  template: 'Aww snap! 404. You must be lost. <a ui-sref="home">Go home!</a>'
              }
          }
        });
  }
}());
