angular.module('myApp.blowup')
    .controller('HeaderCtrl',function($scope, postsService){
        $scope.vs = $scope.vs || {};

        $scope.vs.filterFavorites = function (data) {
            if (!$scope.vs.favorites) return true;
            return data.favorite;
        }

        $scope.newPost = function () {
            var newPost = angular.copy($scope.post);

            if ($scope.form.$valid) {
              postsService.addPost(newPost.title).then(function(res){
                $scope.post = {};
                $scope.form.$setPristine();
                $scope.form.$setUntouched();
                postsService.addPost(res.data);
              });
            }

            // Hide form
            $scope.vs.TogglePostForm = false;
        }

  });
