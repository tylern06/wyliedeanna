var myAppModule = angular.module('myApp', ['ngRoute', 'ngAnimate']);
myAppModule.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/home',{
		templateUrl: 'partials/home.html'
	})
	.when('/story',{
		templateUrl:'partials/story.html'
	})
	.when('/about',{
		templateUrl:'partials/about.html'
	})
	.when('/wedding',{
		templateUrl:'partials/wedding.html'
	})
	.when('/lodging',{
		templateUrl:'partials/accom.html'
	})
	.when('/rsvp',{
		templateUrl:'partials/rsvp.html'
	})
	.when('/gallery',{
		templateUrl:'partials/gallery.html'
	})
	.when('/registry',{
		templateUrl:'partials/registry.html'
	})
	.otherwise({
		redirectTo: '/home'
	});
});
