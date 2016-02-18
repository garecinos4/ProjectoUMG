/**
 * Maneja las funciones basicas
 * del mantenimiento de usuarios
 * (Crear)
 * @author Gabriela Alejandra Recinos Arevalo
 */
(function () {
    'use strict';
    angular.module('app.formController', [])
            .controller('FormController', FormController);

    FormController.$inject = ['$scope', 'UserServices'];


    function FormController($scope, UserServices) {
        var self = this;
        self.user = {};
        
         /**
         * Función que crea un nuevo registro {user}
         */
        self.createUser = function () {
            console.log(self.user);
            self.user.role.permissions = [];
            if(self.user.role.role_name === 'Administrador'){
                self.user.role.permissions = ["write", "read", "remove"];
            }else{
                self.user.role.permissions = ["write", "read"];
            }
            return UserServices.createUser(self.user)
                .then(function (result) {
                    if (result && result.code === 0) {
                        self.procedure = {};
                    }
                    swal(result.message);
                });
        };
    }
})();