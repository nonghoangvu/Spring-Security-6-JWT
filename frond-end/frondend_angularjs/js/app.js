let app = angular.module('myApp', ['ngRoute']);
app.controller('root-nav', function ($scope) {/*TODO SOMETHING*/ })
app.config(function ($routeProvider) {
    $routeProvider
        .when(
            '/home',
            {
                templateUrl: 'pages/home.html'
            }
        )
        .when(
            '/user',
            {
                templateUrl: 'pages/user.html'
            }
        )
        .when(
            '/admin',
            {
                templateUrl: 'pages/admin.html',
                controller: 'loginCtrl'
            }
        )
        .when(
            '/login',
            {
                templateUrl: 'pages/login.html',
                controller: 'loginCtrl'
            }
        ).otherwise({
            redirectTo: '/home'
        })
});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        var restrictedPage = ['/admin', '/user'].indexOf($location.path()) !== -1;
        var loggedIn = !!localStorage.getItem('access_token');

        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });
});