'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }]);


var blogApp = angular.module('blogApp', []);

blogApp.controller('blogCtrl', ['$scope', '$http', function ($scop, $http) {
    $http.get('data/blogs.json').success(function(data) {
        $scope.blogs = data;
    });
}]);
