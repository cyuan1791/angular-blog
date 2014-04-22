'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('MyCtrl1', [function() {

}])
.controller('MyCtrl2', [function() {

}]);


var blogApp = angular.module('blogApp', []);

blogApp.controller('blogCtrl', ['$scope', '$http','$filter', function ($scope, $http,$filter) {
    $http.get('data/blogs.json').success(function(data) {
        $scope.blogs = data;
        $scope.selectedBlogs = data;
    });
    //$scope.selectedAllTags = [ { 'name': 'song1'}, { 'name': 'song2' }, {'name': 'song3'}];
    $http.get('data/tags.json').success(function(data) {
        $scope.selectedAllTags = data;
    });

    $scope.selectedTags = function () {
        $scope.tagList = $filter('filter')($scope.selectedAllTags, {checked: true});
        $scope.selectedBlogs = $filter('filter')($scope.blogs,function(value) {
            // looping through all blogs and find matching selected tags
            //console.log(value.tags);       
            $scope.myPost = '';
            for (var i=0; i< $scope.tagList.length; i++) {
                // looping all selected tags
                if (value.tags.indexOf($scope.tagList[i].name) != -1) {
                    return true;
                }
            }
            return false;
        });
        //console.log($scope.selectedBlogs.length);

        // restore to all blog if no tag selected
        if ($scope.selectedBlogs.length == 0) $scope.selectedBlogs = $scope.blogs;
    }
    $scope.selectMyPost = function (value) {
        //console.log(value);
        $scope.myPost = value;
        $http.get('data/posts/' + value).success(function(data) {
            $scope.myPost = data;
        });

        // clear blogs
        $scope.selectedBlogs  = null;

    }
}]);
