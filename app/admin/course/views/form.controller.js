/**
 * Maneja las funciones basicas
 * del mantenimiento de procedimientos
 * (Crear)
 * @author Gabriela Alejandra Recinos Arevalo
 */
(function () {
    'use strict';
    angular.module('app.formController', [])
        .controller('FormController', FormController);

    FormController.$inject = ['$scope', 'CourseServices', 'MainService'];


    function FormController($scope, CourseServices, MainService) {
        var self = this;
        self.course = {};

        self.listUsers = [];
        getUsers();
     
        /**
           * Definición de la función para cargar
           * la lista de usuarios del servidor 
           * @returns {users}
           */
        function getUsers() {
            return MainService.getUsers()
                .then(function (result) {
                    self.listUsers = result.data;
                });
        }
        
        
        /**
        * Función que crea un nuevo registro {course}
        */
        self.createCourse = function () {
            console.log(self.course);
            self.course.status = $('#toggleStatus').prop('checked');
            return CourseServices.createCourse(self.course)
                .then(function (result) {
                    if (result && result.code === 0) {
                        self.course = {};
                    }
                    swal(result.message);

                });
        };

    }
})();
