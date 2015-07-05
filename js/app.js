var app = angular.module('app', ['ngRoute', 'FBAngular']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'templates/intro.html',
			controller: 'IntroController'
		})
		.when('/select', {
			templateUrl: 'templates/category-select.html'
		})
		.otherwise({
			redirectTo: '/'
		});


	//$locationProvider.html5Mode(true);
});

app.controller('IntroController', function($scope, $location, Fullscreen) {
	$scope.isFullScreen = false;

	$scope.start = function() {
  		if (Fullscreen.isEnabled()) {
     		$location.path('select');
  		} else Fullscreen.all(); //Start fullscreen
	};
});