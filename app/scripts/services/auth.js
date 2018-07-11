/**
 * @ngdoc service
 * @name grademanagerApp.auth
 * @description
 * # auth
 * Service in the grademanagerApp.
 */
angular.module('grademanagerApp')
    .service('auth', function ($window, API, $http) {
        'use strict';

        var self = this;

        self.parseJwt = function (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            // atob allows to decode a base64 string, the btoa methods encodes a string in base64
            return JSON.parse($window.atob(base64));
        };

        self.saveToken = function (token) {
            $window.localStorage.setItem('jwtToken', token);
        };

        self.getToken = function () {
            return $window.localStorage.getItem('jwtToken');
        };

        self.isAuthed = function () {
            var token = self.getToken();
            if (token) {
                var params = self.parseJwt(token);
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            } else {
                return false;
            }
        };

        self.getUsername = function () {
            var token = self.getToken();
            if (token) {
                var params = self.parseJwt(token);
                return params.username;
            } else {
                return '';
            }
        };

        self.getUser = function () {
            var token = self.getToken();
            if (token) {
                var params = self.parseJwt(token);
                return params;
            } else {
                return {};
            }
        };

        self.login = function (username, password) {
            return $http.post(API.URL + '/login', {
                username: username,
                password: password
            });
        };

        self.u2fReply = function (username, reply) {
            return $http.post(API.URL + '/login', {
                username: username,
                u2f: reply
            });
        };

        self.u2fRegister = function (password) {
            return $http.post(API.URL + '/login', {
                username: self.getUsername(),
                password: password,
                u2fRegistration: true
            });
        };

        self.u2fRemove = function () {
            return $http.post(API.URL + '/profile/removeU2f', {});
        };

        self.changePassword = function (password, newPassword) {
            return $http.post(API.URL + '/changePassword', {
                username: self.getUsername(),
                password: password,
                newPassword: newPassword
            });
        };

        self.logout = function () {
            $window.localStorage.removeItem('jwtToken');
        };
    });
