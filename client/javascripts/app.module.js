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
        controller: function($scope, $http, $state){
          $scope.login = function () {
            $http.post('http://localhost:3000/api/blowup/login', {Authorization: $scope.loggy})
            //LOOK HERE TO CODE MOAR
            .then(function(response){
              console.log("data", response.data);
              console.log('response', response);
              localStorage.setItem('token', response.data);
              $state.go('home');
            });
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
          url: '/ohnos',
          views: {
              'body': {
                  template: 'Aww snap! 404. You must be lost. <a ui-sref="home">Go home!</a>'
              }
          }
        });
  }
}());


(function() {
  'use strict';
  var dependencies = [
    'ui.router',
    'ui.bootstrap'
  ];

  var firstCheck = true;

  angular.module('app', dependencies)
    .config(setupRoutes)
    .run(checkRoute)

  function checkRoute ($rootScope, $location) {
    $rootScope.$on( "$stateChangeStart", function(event, next, current) {
      // console.log($location);
      // console.log('here');
    })
  }
  setupRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

  function setupRoutes($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
    // $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('home', {
        url: "/",
        template: "<posts></posts>"
      })
      .state('comments', {
        url: "/comments/:postId",
        template: "<comments></comments>",
      })
      .state('addpost', {
        url: "/addpost",
        template: "<add-post></add-post>",
        resolve:{
         simpleObj: function(authService){
            return authService.loggedin().then( function (data) {
              return data
            })
          }
        },
      })
      .state('userporfile', {
        url: "/userprofile",
        template: "<user-profile></user-profile>",
        resolve:{
         simpleObj: function(authService){
            return authService.loggedin().then( function (data) {
              return data
            })
          }
        },
      })
    $httpProvider.interceptors.push("AuthInterceptor");
  }

  angular.module('app')
  .service("AuthInterceptor", function($window, $location, $q, $rootScope){
    return {
      request: function(config){
        // prevent browser bar tampering for /api routes
        var token = $window.localStorage.getItem("token");
        if(token)
          config.headers.authorization =  token;
        return (config);
      },
      responseError: function(err){
        console.log(err.data);

        if (err.status === 403 && !firstCheck) {
          $rootScope.$emit('event', {foo:'bar'})
        }
        firstCheck = false;
        // if you mess around with the token, log them out and destroy it
        if(err.status === 406){
          // $location.path("/logout");
          console.log(err.data);
          return err;
        }
        // if you try to access a user who is not yourself
        if(err.status === 401){
          $location.path('/users');
          return $q.reject(err);
        }
        return $q.reject(err);
      }
    };
  });
}());
