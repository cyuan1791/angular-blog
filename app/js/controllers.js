'use strict';

var blogApp = angular.module('blogApp', ['ngSanitize']);

blogApp.controller('blogCtrl', ['$scope', '$http','$filter','$sce', function ($scope, $http,$filter,$sce) {
    $http.get('data/blogs.json?nocache='+ (new Date()).getTime()).success(function(data) {
        $scope.blogs = data;
        $scope.selectedBlogs = data;
        $scope.originalSelectedBlogs  = data;
    });
    //$scope.selectedAllTags = [ { 'name': 'song1'}, { 'name': 'song2' }, {'name': 'song3'}];
    $http.get('data/tags.json?nocache='+ (new Date()).getTime()).success(function(data) {
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
        $scope.originalSelectedBlogs  = $scope.selectedBlogs;
        //console.log($scope.selectedBlogs.length);

        // restore to all blog if no tag selected
        if ($scope.selectedBlogs.length == 0) $scope.selectedBlogs = $scope.blogs;
    }
    $scope.selectMyPost = function (value) {
        //console.log(value);
        //$scope.myPost = value;
        $http.get('data/posts/' + value + '?nocache=' + (new Date()).getTime()).success(function(data) {
            $scope.myPost = '<div class="panel panel-default"> <div class="panel-body">'+data +'</div></div>'
        });

        // clear blogs
        $scope.originalSelectedBlogs  = $scope.selectedBlogs;
        $scope.selectedBlogs  = null;

    }
    $scope.trustedHtml = function () {
          return $sce.trustAsHtml($scope.myPost);
    }
    $scope.reload = function () {
        $scope.myPost = '';
        $scope.selectedBlogs = $scope.originalSelectedBlogs;
        //window.location.reload();
    };
}]);
