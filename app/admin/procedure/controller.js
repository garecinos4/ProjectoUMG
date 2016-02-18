(function () {
    'use strict';
    angular
            .module('app.controller', [])
            .controller('Procedure', Procedure);

    Procedure.$inject = ['$scope', '$location', '$anchorScroll', 'MainService'];

    function Procedure($scope, $location, $anchorScroll, MainService) {
        var self = this;

        self.gotoTop = function () {
            $location.hash('gotoTop');
            $anchorScroll();
        };

        self.logout = function() {
           return MainService.logout('../api/logout/')
           .then(function(result) {
                    if (result && result.code === 0) {
                        console.log("SESION CERRADA");
                        window.location.href = "/";
                    } else {
                        console.log("NO SE PUDO CERRAR SESION");
                    }
                });
        };
        
        
    }
})();