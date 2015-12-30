var notesControllers = angular.module('notesControllers', []);

notesControllers.controller('NotesListCtrl', function ($scope, $http) {
  /*$scope.notes = [
    {'title': 'Nexus S',
     'content': 'Fast just got faster with Nexus S. Fast just got faster with Nexus S Fast just got faster with Nexus S Fast just got faster with Nexus S Fast just got faster with Nexus S Fast just got faster with Nexus S',
 	  "id": '1'},
    {'title': 'Motorola XOOM™ with Wi-Fi',
     'content': 'The Next, Next Generation tablet.',
     'id': '2'},
    {'title': 'MOTOROLA XOOM™',
     'content': 'The Next, Next Generation tablet.',
     'id': '3'},
     {'title': 'Nexus S',
     'content': 'Fast just got faster with Nexus S.',
      "id": '4'},
    {'title': 'Motorola XOOM™ with Wi-Fi',
     'content': 'The Next, Next Generation tablet.',
     'id': '5'},
    {'title': 'MOTOROLA XOOM™',
     'content': 'The Next, Next Generation tablet.',
     'id': '6'}
  ];*/
  // Simple GET request example:
  $http({
    method: 'GET',
    url: 'http://192.168.71.128:3000/notes'
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
    url: 'http://192.168.71.128:3000/notes/'+ $routeParams.noteId
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.note = response.data;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

});
