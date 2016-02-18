(function () {
    'use strict';
    angular.module('app', [
        'ngRoute',
        'app.routeConfig',
        'app.controller',
        'app.listController',
        'app.formController',
        'app.service',
        'app.mainServices',
        'xeditable'
    ]).run(function (editableOptions) {
        editableOptions.theme = 'bs3';
    });

})();



