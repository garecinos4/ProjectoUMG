(function () {

    angular
        .module('app.routeConfig', [])
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.
            when('/:type/:text', {
                templateUrl: './buildings.html',
                controller: 'BasicController',
                controllerAs: 'vm'
            }).
            otherwise({
                templateUrl: './searchOptions.html',
                controller: 'BasicController',
                controllerAs: 'vm'
            });
    }
})();



