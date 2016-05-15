(function() {
  'use strict';

  angular.module('myApp.blowup.postServices')
    .directive('posts', listDirective);


  function listDirective () {
    return {
      scope: {},
      templateUrl: '/javascripts/postServices/posts.directive.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }

  controller.$inject = ['$http', 'postsService', '$scope'];

  function controller($http, postsService, $scope) {
    var vm = this;
    vm.addPost = addPost;
    vm.vote = vote;
    $scope.frm = {}
    $scope.frm.url = 'https://robohash.org/ois345djgd23345554';
    activate();

    var config = {
      headers: {
        Authorization: "bearer" + "loggy logged in"
      }
    }

    function activate() {
      postsService.list().then(function(response) {
        vm.posts = response;
      })
    }

    function vote (num, post_id) {
      postsService.vote({num: num, post_id: post_id })
    }
    
    function addPost () {
      postsService.add($scope.frm).then(function(dats) {
        console.log(dats);
        $scope.frm = {};
        $state.go('home')
      })
    }
  }
}());
