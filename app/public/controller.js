(function () {
    'use strict';
    angular.module('app.publicController', [])
        .controller('Controller', Controller);

    Controller.$inject = ['Service', '$location', '$anchorScroll', '$routeParams'];


    function Controller(Service, $location, $anchorScroll, $routeParams) {
        var self = this;
        self.data = {};
   
   
        self.goto = function (hash) {
            $location.hash(hash);
            $anchorScroll();
        };
        
        self.login = function () {
           if (self.data.email && self.data.password) {
                return Service.login(self.data)
                    .then(function (result) {
                        if (result && result.code === 0) {
                            console.log("SE INICIO SESION");
                            window.location.href = "/admin/dashboard.html";
                        } else {
                            console.log("NO SE PUDO INICIAR SESION");
                            swal("ERROR!!!", result.message, "error");
                        }
                    });
            } else {
                swal("Debe ingresar correo y contraseña");
            }
        };


        self.recover = function(){
           if (self.data.email) {
                return Service.recover(self.data)
                    .then(function (result) {
                        if (result && result.code === 0) {
                            swal("Recuperación Exitosa!!!", result.message, "success");
                        } else {
                            console.log("NO SE PUDO INICIAR SESION");
                            swal("ERROR!!!", result.message, "error");
                        }
                    });
            } else {
                swal("Debe ingresar correo y contraseña");
            }
        };


       

    }


})();
