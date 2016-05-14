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

  controller.$inject = ['$http', 'postsService'];

  function controller($http, postsService) {
    var vm = this;
    vm.addPost = addPost;
    activate();

    var config = {
      headers: {
        Authorization: "bearer" + "loggy logged in"
      }
    }

    function activate() {
      postsService.list().then(function(posts) {
        vm.posts = posts;
      })
    }

    function addPost () {
      postsService.add(vm.post.title).then(function() {
        vm.post = {};
      })
    }
  }

}());
