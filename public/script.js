// var express = require("express");
// var app = express();

var chatApp = angular.module('chatApp', ['ngRoute','btford.socket-io'])
chatApp.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'templates/loginpage.html',
            controller: 'loginController'
        })

        // route for the about page
        .when('/registration', {
            templateUrl: 'templates/registration.html',
            controller: 'registrationController'
        })
        .when('/login', {
            templateUrl: 'templates/loginpage.html',
            controller: 'loginController'
        })
        .when('/dashboard', {
            templateUrl: 'templates/dashboard.html',
            controller: 'homecontroller'
    })
        .when('/ptop', {
            templateUrl: 'templates/ptop.html',
            controller: 'ptopcontroller'
        })
});
chatApp.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:5500')
    });
}]);
