(function() {
  'use strict';

  angular.module('myApp.blowup')
    .directive('nav', navDirective);

  function navDirective () {
    return {
      scope: {},
      templateUrl: '/javascripts/layout/nav.directive.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }

  controller.$inject = ['postsService'];
  function controller(postsService) {
    var vm = this;
    vm.addPost = addPost;

    function addPost() {
      postsService.add(vm.post.title).then(function(posts) {
        vm.post = {};
      })
    }
  }

}());
