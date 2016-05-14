(function() {
  'use strict';

  angular.module('myApp.blowup.postServices')
    .factory('postsService', factory);


  factory.$inject = ['$http', 'env'];

  function factory ($http, env) {
    var posts = [];
    var host = env.host;
    return {
      add: addPost,
      list: listPosts,
    }

    function listPosts() {
      return $http.get('http://localhost:3000/api/v1/list')
        .then(function (response) {
          posts = response.data;
          return posts;
        })
    }

    function addPost(title) {
      return $http.post('http://localhost:3000/api/v1/list', {title: title})
      .then(function (response) {
        posts.push(response.data);
        return response.data;
      })
    }
  }

}());
