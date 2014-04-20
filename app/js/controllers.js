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
    });
    $scope.selectedAlbumSongs = [ { 'name': 'song1', 'url': 'http://test/song1.mp3' }, { 'name': 'song2', 'url': 'http://test/song2.mp3' }, {'name': 'song3', 'url': 'http://test/song3.mp3' }];

    $scope.selectedSongs = function () {
        $scope.playList = $filter('filter')($scope.selectedAlbumSongs, {checked: true});
    }
}]);
