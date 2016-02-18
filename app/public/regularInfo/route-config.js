(function () {

    angular
        .module('app.routeConfig', [])
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.
            when('/:type/:text', {
                templateUrl: './procedures.html',
                controller: 'BasicController',
                controllerAs: 'vm'
            }).
            otherwise({
                templateUrl: './search.html',
                controller: 'BasicController',
                controllerAs: 'vm'
            });
    }
})();



