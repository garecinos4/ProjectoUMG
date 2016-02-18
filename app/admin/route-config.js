(function () {

    angular
            .module('app.routeConfig', [])
            .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.
                when('/buildings', {
                    templateUrl: './views/buildings.html'
                });
    }
})();



