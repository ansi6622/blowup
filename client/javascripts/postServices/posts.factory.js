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
      vote: vote,
      del: del
    }

    function listPosts() {
      return $http.get('http://localhost:3000/api/blowup/list')
        .then(function (response) {
          posts = response.data;
          return posts;
        })
    }

    function addPost(post) {
      return $http.post('http://localhost:3000/api/blowup/list', post)
      .then(function (response) {
        posts.push(response.data);
        return response.data;
      })
    }


    function addComment(comment) {
      return $http.post('http://localhost:3000/api/blowup/comment', comment)
      .then( function (response) {
        var data = response.data[0];
        for (var i = 0; i < posts.length; i++) {
          if (posts[i].post_id == data.post_fk) {
            // data = {comment: data.comment}
            posts[i].comments.push(data)
          }
        }
        return posts;
      })
    }

    function del (id) {
      console.log(id);
      return $http.delete('http://localhost:3000/api/posts/' + id)
      .then( function (resoponce) {
        var data = resoponce.data[0]
        if (resoponce.status === 200) {
          for (var i = 0; i < posts.length; i++) {
            if (posts[i].post_id == data.post_id) {
              posts.splice(i, 1);
              return posts
            }
          }
        }
      })
    }
  }

    function vote (data) {
       return $http.post('http://localhost:3000/api/blowup/vote', data)
       .then( function (response) {
         var data = response.data[0];
         for (var i = 0; i < posts.length; i++) {
           if (posts[i].post_id == data.post_id) {
             posts[i].rating = data.rating;
           }
         }
         return posts
       })
     }
  }
