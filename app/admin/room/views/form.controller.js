/**
 * Maneja las funciones basicas
 * del mantenimiento de salones
 * (Crear)
 * @author Gabriela Alejandra Recinos Arevalo
 */
(function () {
    'use strict';
    angular.module('app.formController', [])
        .controller('FormController', FormController);

    FormController.$inject = ['$scope', 'MainService', 'RoomServices'];


    function FormController($scope, MainService, RoomServices) {
        var self = this;
        self.room = {};

        self.listBuildings = [];
        self.listRoomTypes = [];
        
        getBuildings();
        getRoomTypes();
               
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
        * la lista de los tipos de salones del servidor 
        * @returns {roomsTypes}
        */
        function getRoomTypes() {
            return MainService.getRoomTypes()
                .then(function (data) {
                    self.listRoomTypes = data;
                });
        }
        
        /**
        * Función que crea un nuevo registro {room}
        */
        self.createRoom = function () {
            console.log(self.room);
            return RoomServices.createRoom(self.room)
                .then(function (result) {
                    if (result && result.code === 0) {
                        self.room = {};
                    }
                    swal(result.message);

                });
        };

    }
})();
