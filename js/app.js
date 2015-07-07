var app = angular.module('app', ['ngRoute', 'FBAngular']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'templates/intro.html',
			controller: 'IntroController'
		})
		.when('/categories', {
			templateUrl: 'templates/category-select.html',
			controller: 'CategorySelectController'
		})
		.when('/category/:category', {
			templateUrl: 'templates/category.html',
			controller: 'CategoryController'
		})
		.otherwise({
			redirectTo: '/'
		});


	//$locationProvider.html5Mode(true);
});

app.factory('LocalData', function($http, $q) {
	var LocalData = {};
	var deffered = $q.defer();
	var data = [];

	LocalData.getCategories = function() {
		data = []
		$http.get('../include/backend.php')
			.success(function(d) {
				console.log(d.categories);
				data = d.categories;
				deffered.resolve();
			})
		return deffered.promise;
	};

	LocalData.getContents = function(category) {
		data = [];
		$http.get('../include/backend.php?category='+category)
			.success(function(d) {
				console.log(d.data);
				data = d.data;
				deffered.resolve();
			})
		return deffered.promise;
	};

	LocalData.data = function() {
		var d = data;
		data = [];
		return d;
	};

	return LocalData;
});

app.controller('IntroController', function($scope, $location) {
	$scope.start = function() {
  		$location.path('categories');
	};
});

app.controller('CategorySelectController', function($scope, $location, LocalData, $http) {
	$scope.categories = [];

	$http.get('../include/backend.php')
		.success(function(data) {
			$scope.categories = data.categories
		});

	/*LocalData.getCategories().then(function() {
		$scope.categories = LocalData.data();
	});*/
});

app.controller('CategoryController', function($scope, $routeParams, LocalData, $http) {
	$scope.selectedCategory = $routeParams.category;
	$scope.items = [];

	/*LocalData.getContents($scope.selectedCategory).then(function() {
		$scope.items = LocalData.data();
	});*/

	$http.get('../include/backend.php?category='+$scope.selectedCategory)
		.success(function(data) {
			$scope.items = data.data;
		});
});







