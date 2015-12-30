var notesApp = angular.module('notesApp', [
  'ngRoute',
  'notesControllers'
]);

notesApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/notes', {
        templateUrl: 'partials/note-list.html',
        controller: 'NotesListCtrl'
      }).
      when('/notes/:noteId', {
        templateUrl: 'partials/note-detail.html',
        controller: 'NoteViewCtrl'
      }).
      otherwise({
        redirectTo: '/notes'
      });
}]);
