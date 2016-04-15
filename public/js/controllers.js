var notesControllers = angular.module('notesControllers', []);

notesControllers.controller('NotesListCtrl', function ($scope, $http) {
  $http({
    method: 'GET',
    url: 'http://notes-nodejs:3000/notes',
    withCredentials: true
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.notes = response.data;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
});

notesControllers.controller('NoteViewCtrl', function ($scope, $http, $routeParams) {
  $http({
    method: 'GET',
    url: 'http://notes-nodejs:3000/notes/'+ $routeParams.noteId
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.note = response.data;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

});

notesControllers.controller('AuthCtrl', function ($scope, $http) {
  /**/
    $scope.username;
    $scope.password;
    $scope.islogged;
    $scope.doLogin = function()
    {
      console.log("Calling login service for "+$scope.username + " " +$scope.password);
      $http({
        method: 'POST',
        url: 'http://notes-nodejs:3000/login',
        withCredentials: true,
        data: { username: $scope.username,
                password: $scope.password
        }
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response);
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    }
    $scope.doLogout= function()
    {
      console.log("Calling logout service for "+$scope.username + " " +$scope.password);
      $http({
        method: 'GET',
        url: 'http://notes-nodejs:3000/logout'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response);
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    }
});
