/**
 * Maneja las funciones basicas
 * del mantenimiento de usuarios
 * (Modificar y Eliminar)
 * @author Gabriela Alejandra Recinos Arevalo
 */
(function () {
    'use strict';
    angular
        .module('app.listController', [])
        .controller('ListController', ListController);

    ListController.$inject = ['$scope', 'UserServices', 'MainService'];

    function ListController($scope, UserServices, MainService) {

        var self = this;
        self.user = {};
        self.type = "password";
        self.btnShowPass = true;
        
        /** Incova a la función para cargar los usuarios. */
        getUsers();

        /**
        * Definición de la función para cargar
        * la lista de usuarios del servidor 
        * @returns {users}
        */
        function getUsers() {
            return MainService.getUsers()
                .then(function (result) {
                    self.users = result.data;
                });
        }
        
        /**
         * Definición de la función para mostrar
         * la contraseña del usuario seleccionado 
         * @returns {buildings}
         */
        self.showPass = function (value) {
            if (value) {
                self.type = "text";
                self.btnShowPass = false;
            } else {
                self.type = "password";
                self.btnShowPass = true;
            }
        };

        /**
         * Guarda los cambios realizados
         * @param {user} user
         */
        self.saveUser = function (user) {
            console.log(user);
            self.user.role.permissions = [];
            if (self.user.role.role_name === 'Administrador') {
                self.user.role.permissions = ["write", "read", "remove"];
            } else {
                self.user.role.permissions = ["write", "read"];
            }
            $('#modalEdit').modal('hide');
            return UserServices.updateUser(user)
                .then(function (result) {
                    if (!result && result.code > 0) {
                        swal(result.message);
                        getUsers();
                    }
                });
        };

        /** 
        * Cancela los cambios realizados, 
        * vuelve a cargar la lista de usuarios
        */
        self.cancelUser = function () {
            getUsers();
        };

        /**
         * Guarda los datos del usuario que
         * se va a modificar
         * @param {user} user
         */
        self.editUser = function (user) {
            self.user = user;
        };

        /**
        * Elimina el usuario seleccionado
        * @param {user._id} id
        */
        self.deleteUser = function (id) {
            swal({
                title: "Borrar Usuario.",
                text: "¿Esta seguro que desea borrar usuario?",
                type: "error",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Borrar",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    return UserServices.deleteUser(id)
                        .then(function (result) {
                            if (!result && result.code > 0) {
                                swal(result.message);
                                getUsers();
                            } else {
                                swal("¡Eliminado!", "El usuario ha sido eliminado", "success");
                                getUsers();
                            }
                        });
                }
            });
        };

    }
})();