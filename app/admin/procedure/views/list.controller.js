/**
 * Maneja las funciones basicas
 * del mantenimiento de procedimientos
 * (Modificar y Eliminar)
 * @author Gabriela Alejandra Recinos Arevalo
 */

(function () {
    'use strict';
    angular
        .module('app.listController', [])
        .controller('ListController', ListController);

    ListController.$inject = ['$scope', 'MainService', 'ProcedureServices', '$filter'];

    function ListController($scope, MainService, ProcedureServices, $filter) {

        var self = this;

        self.procedure = {};

        self.listBuildings = [];
        self.listRooms = [];
        self.listTempRooms = [];
        
        /** Incova a la función para cargar los procedimientos. */
        getProcedures();
        /** Incova a la función para cargar los edificios. */
        getBuildings();
        /** Incova a la función para cargar los salones. */
        getRooms();

        /**
        * Definición de la función para cargar
        * la lista de procedimientos del servidor 
        * @returns {procedures}
        */
        function getProcedures() {
            return MainService.getProcedures()
                .then(function (result) {
                    self.procedures = result.data;
                });
        }

        /**
         * Definición de la función para cargar
         * la lista de edificios del servidor 
         * @returns {buildings}
         */
        function getBuildings() {
            return MainService.getBuildings()
                .then(function (result) {
                    self.listBuildings = result.data;
                });
        }

        /**
       * Definición de la función para cargar
       * la lista de salones del servidor 
       * @returns {rooms}
       */
        function getRooms() {
            return MainService.getRooms()
                .then(function (result) {
                    self.listRooms = result.data;
                });
        }

        /**
        * Muestra en la vista los edificios 
        * del paso seleccionado
        * @param {step} step
        */
        self.showBuilding = function (step) {
            self.listTempRooms = self.listRooms;
            var selected;
            if (step.building_id && self.listBuildings.length) {
                selected = $filter('filter')(self.listBuildings, {
                    _id: step.building_id
                });
                if (selected.length) {
                    self.listTempRooms = $filter('filter')(self.listRooms, {
                        building_id: step.building_id
                    });
                }
                return selected.length ? selected[0].name : '-----';
            } else {
                return '-----';
            }
        };
        
        /**
       * Muestra en la vista los salones 
       * del paso seleccionado
       * @param {step} step
       */
        self.showRoom = function (step) {
            var selected;
            if (step.room_id && self.listTempRooms.length) {
                selected = $filter('filter')(self.listTempRooms, {
                    _id: step.room_id
                });
                return selected.length ? selected[0].name : '-----';
            } else {
                return '-----';
            }
        };

        /**
         * Modifica la lista de edificios 
         * del paso seleccionado
         * @param {step} step
         */
        self.onchangeBuilding = function (data, step) {
            //console.log(data);
            //console.log(step);
            step.building_id = data;
            self.listTempRooms = self.listRooms;
            self.showRoom(step);
        };

        /**
         * Elimina paso
         * @param {index} index
         */
        self.removeRow = function (index) {
            self.procedure.steps.splice(index, 1);
        };

        /**
        * Agrega paso
        * @param {index} index
        */
        self.addRow = function () {
            self.inserted = {
                number: self.procedure.steps.length + 1,
                name: '',
                description: '',
                room_id: '',
                building_id: ''
            };
            self.procedure.steps.push(self.inserted);
        };

        /**
         * Guarda los cambios realizados
         * @param {procedure} procedure
         */
        self.saveProcedure = function (procedure) {
            procedure.status = $('#toggleStatus').prop('checked');
            console.log(procedure);
            $('#modalEdit').modal('hide');
            return ProcedureServices.updateProcedure(procedure)
                .then(function (result) {
                    if (!result && result.code > 0) {
                        swal(result.message);
                        getProcedures();
                    }
                });
        };

        /** 
        * Cancela los cambios realizados, 
        * vuelve a cargar la lista de procedimientos
        */
        self.cancelProcedure = function () {
            getProcedures();
        };

        /**
         * Guarda los datos del procedimiento que
         * se va a modificar
         * @param {procedure} procedure
         */
        self.editProcedure = function (procedure) {
            self.procedure = procedure;
        };

        /**
        * Elimina el procedimiento seleccionado
        * @param {procedure._id} id
        */
        self.deleteProcedure = function (id) {
            swal({
                title: "Borrar Procedimiento.",
                text: "¿Esta seguro que desea borrar procedimiento?",
                type: "error",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Borrar",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    return ProcedureServices.deleteProcedure(id)
                        .then(function (result) {
                            if (!result && result.code > 0) {
                                swal(result.message);
                                getProcedures();
                            } else {
                                swal("¡Eliminado!", "El procedimiento ha sido eliminado", "success");
                                getProcedures();
                            }
                        });
                }
            });
        };
        
      /**
      * Crear codigo QR
      * @param {procedure} procedure
      */
        self.QRgenerator = function (procedure) {
            $('#qrcode').empty();
            new QRCode(document.getElementById("qrcode"), "http://localhost:8080/app/basicInfo/searchInfo.html#/procedures/" + procedure.name);

        };

        self.print = function () {
            window.print();

        };

    }
})();
