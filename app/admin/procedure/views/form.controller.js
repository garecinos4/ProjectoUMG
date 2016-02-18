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

    FormController.$inject = ['$scope', 'ProcedureServices'];


    function FormController($scope, ProcedureServices) {
        var self = this;
        self.procedure = {};
       
        /**
         * Función que crea un nuevo registro {procedure}
         */
        self.createProcedure = function () {
            console.log(self.procedure);
            self.procedure.status = $('#toggleStatus').prop('checked');
            return ProcedureServices.createProcedure(self.procedure)
                .then(function (result) {
                    if (result && result.code === 0) {
                        self.procedure = {};
                    }
                    swal(result.message);

                });
        };

    }
})();
