(function () {

    angular
            .module('app.routeConfig', [])
            .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'views/list.html',
                    controller: 'ListController',
                    controllerAs: 'vm'
                }).
                when('/add', {
                    templateUrl: 'views/form.html',
                    controller: 'FormController',
                    controllerAs: 'vm'
                }).
                when('/dashboard', {
                    redirectTo: function () {
                        window.location = '../dashboard.html';
                    }
                }).
                when('/logout', {
                    redirectTo: function () {
                        window.location = '../index.html';
                    }
                }).
                otherwise({
                    redirectTo: '/logout'
                });
    }
})();



