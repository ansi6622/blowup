(function() {
  'use strict';

  var dependencies = [
    'ui.router',
    'myApp.blowup.postServices',
    // 'app.postServices',
    // 'ng-animate'
  ];

  angular.module('myApp.blowup', dependencies)
    .config(setupRoutes);

    if (window.location.hostname === 'localhost'){
         angular.module('myApp.blowup').constant('env', {apiHost: "https://localhost:3000"});
       } else {
         angular.module('myApp.blowup').constant('env', {apihost: "https://xsasaf.com"})
       }

  setupRoutes.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider'  ];

  function setupRoutes($stateProvider, $urlRouterProvider, $locationProvider, $http){
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('myApp.blowup', {
          url: "/",
          template: "<app></app>",
    //       resolve: {
    // //         ['myResolvingService', function(resolver) {
    // //       resolver.myValue = 'Foo';
    // //       return 'Foo';
    // //                       }]
    //           currentUser: function(){
    //               var config = {
    //                   headers: {
    //                       Authorization: "bearer" + (localStorage.getItem('token') || '')
    //                   }
    //               }
    //               return $http.get('http//:localhost3000/api/blowup/me', config).then(function(response) {
    //                   return response.data;
    //               })
    //           }
    //       }
      })
      .state('login', {
        url: "/login",
        template: `<form ng-submit="login(loggy)">
        <input type="text" ng-model="loggy.email">
        <input type="text" ng-model="loggy.password">
        <input type="submit" ng-model="loggy">
        </form>`,
        controller: function($scope, $http){
          $scope.login =function () {
            $http.post('http://localhost:3000/api/blowup/me', {Authorization: $scope.loggy})
            //LOOK HERE TO CODE MOAR
            .then(function(response){
              localStorage.setItem('token', response.data.token)
              $state.go('app')
            })
          }
        }
      })
      .state('home', {
          url: '/home',
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
