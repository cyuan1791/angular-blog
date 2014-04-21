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
        $scope.selectedBogs = data;
    });
    //$scope.selectedAllTags = [ { 'name': 'song1'}, { 'name': 'song2' }, {'name': 'song3'}];
    $http.get('data/tags.json').success(function(data) {
        $scope.selectedAllTags = data;
    });

    $scope.selectedTags = function () {
        $scope.playList = $filter('filter')($scope.selectedAllTags, {checked: true});
        $scope.selectedBlogs = $filter('filter')($scope.blogs,function(value) {
            //console.log(value.tags);       
            for (var i=0; i< $scope.playList.length; i++) {
                if (value.tags.indexOf($scope.playList[i].name) != -1) {
                    return true;
                }
            }
            return false;
        });
        //console.log($scope.selectedBlogs);
    }
}]);
