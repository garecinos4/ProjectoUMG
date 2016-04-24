/**
 * Maneja las funciones basicas
 * del mantenimiento de salones
 * (Modificar y Eliminar)
 * @author Gabriela Alejandra Recinos Arevalo
 */

(function () {
    'use strict';
    angular
        .module('app.listController', [])
        .controller('ListController', ListController);

    ListController.$inject = ['$scope', 'RoomServices', 'MainService', '$filter'];

    function ListController($scope, RoomServices, MainService, $filter) {

        var self = this;
        self.room = {};
        self.listBuildings = [];
        self.listRoomTypes = [];
                
        /** Incova a la función para cargar los edificios. */
        getBuildings();
        
        /** Incova a la función para cargar los salones. */
        getRooms();
        
        /** Incova a la función para cargar los tipos de salones. */
        getRoomTypes();

        /**
        * Definición de la función para cargar
        * la lista de edificios a la vista 
        */
        self.findBuild = function (id) {
            var selected;
            if (id && self.listBuildings.length) {
                angular.forEach(self.listBuildings, function (obj) {
                    if (obj._id === id) {
                        selected = obj.name;
                    }
                });
                return selected ? selected : '----';
            } else {
                return '-----';
            }
        };
        
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
                    self.rooms = result.data;
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
         * Guarda los cambios realizados
         * @param {room} room
         */
        self.saveRoom = function (room) {
            console.log(room);
            $('#modalEdit').modal('hide');
            return RoomServices.updateRoom(room)
                .then(function (result) {
                    if (!result && result.code > 0) {
                        swal(result.message);
                        getRooms();
                    }
                });
        };
        
        /** 
         * Cancela los cambios realizados, 
         * vuelve a cargar la lista de salones
         */
        self.cancelRoom = function () {
            getRooms();
        };

        /**
         * Guarda los datos del salón que
         * se va a modificar
         * @param {room} room
         */
        self.editRoom = function (room) {
            self.room = room;
        };

        /**
        * Elimina el salón seleccionado
        * @param {room._id} id
        */
        self.deleteRoom = function (id) {
            swal({
                title: "Borrar Salón.",
                text: "¿Esta seguro que desea borrar el salón?",
                type: "error",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Borrar",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    return RoomServices.deleteRoom(id)
                        .then(function (result) {
                            if (!result && result.code > 0) {
                                swal(result.message);
                                getRooms();
                            } else {
                                swal("¡Eliminado!", "El salón ha sido eliminado", "success");
                                getRooms();
                            }
                        });
                }
            });
        };

    }
})();
