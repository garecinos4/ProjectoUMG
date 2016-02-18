/**
 * Maneja las funciones basicas
 * del mantenimiento de edificios
 * (Modificar y Eliminar)
 * @author Gabriela Alejandra Recinos Arevalo
 */

(function () {
    'use strict';
    angular
        .module('app.listController', [])
        .controller('ListController', ListController);

    ListController.$inject = ['$scope', 'BuildingServices', 'MainService'];

    function ListController($scope, BuildingServices, MainService) {
        var self = this;

        self.building = {};
        var marker;
        var pos;
        var map;

        /** Incova a la función para cargar los edificios. */
        getBuildings();

        /**
         * Definición de la función para cargar
         * la lista de edificios del servidor 
         * @returns {buildings}
         */
        function getBuildings() {
            return MainService.getBuildings()
                .then(function (result) {
                    if (result && result.code === 0) {
                        self.buildings = result.data;
                    } else {
                        swal(result.message);
                    }
                });
        }

        /**
         * Carga los componentes de google maps
         * para editar las coordenadas y otros 
         * @param {type} building
         */
        self.editBuilding = function (building) {
            self.building = building;
            var mapCanvas = document.getElementById('map-canvas');
            var mapOptions = {
                title: 'default',
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.ROADMAP //HYBRID //ROADMAP 
            };

            map = new google.maps.Map(mapCanvas, mapOptions);

            /**
             * Tiempo para cambiar el tamaño al mapa
             */
            setTimeout(function () {
                google.maps.event.trigger(map, "resize");
                initMap();
            }, 500);

        };

        /**
         * Funcion que inicializa los componentes del mapa
         */
        function initMap() {
            pos = new google.maps.LatLng(self.building.latitude,
                self.building.longitude);

            /**
             * Crea una marca inicial
             */
            mark(pos, map);

            /**
             * Invoca a la funcion que inicia un 
             * accion al hacer click en el mapa
             */
            self.init = addListener();
        }

        /** 
         * Se agregar un listener al hacer click en el mapa 
         * para agregar una nueva marca
         * y obtener la posición
         */
        function addListener() {
            google.maps.event.addListener(map, 'click', function (e) {
                mark(e.latLng, map);
                $scope.$apply();
            });
        }

        /** 
         * Definición de la función que pinta la marca y 
         * la ventana de información
         * @param {google.maps.LatLng} pos
         * @param {google.maps.Map} map
         */
        function mark(pos, map) {
            if (marker) {
                marker.setMap(null);
            }
            //Instancia una marca
            marker = new google.maps.Marker({
                position: pos,
                map: map
            });
            map.setCenter(pos);

            //Instancia una ventana de información
            var infowindow = new google.maps.InfoWindow();
            infowindow.setContent('<b>' + self.building.name + '</b>');
            infowindow.open(map, marker);

            google.maps.event.trigger(map, "resize");
            map.panTo(pos);

            self.building.latitude = pos.lat();
            self.building.longitude = pos.lng();
        }

        /** 
         * Función que regenera la marca y 
         * la ventana de informacion si
         * hubiera un cambio en la data
         */
        self.onChange = function () {
            if (self.building.latitude && self.building.longitude) {
                mark(new google.maps.LatLng(self.building.latitude,
                    self.building.longitude), map);
            }
        };

        /** Cancela los cambios realizados, 
         * vuelve a cargar la lista de edificios
         */
        self.cancelBuilding = function () {
            getBuildings();
        };

        /**
         * Guarda los cambios realizados
         * @param {building} building
         */
        self.saveBuilding = function (building) {
            console.log(building);
            $('#modalEdit').modal('hide');
            return BuildingServices.updateBuilding(building)
                .then(function (result) {
                    if (!result && result.code > 0) {
                        swal(result.message);
                        getBuildings();
                    }
                });
        };

        /**
         * Elimina el edificio seleccionado
         * @param {building._id} id
         */
        self.deleteBuilding = function (id) {
            console.log(id);
            swal({
                title: "Borrar Edificio.",
                text: "¿Esta seguro que desea borrar edificio?",
                type: "error",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Borrar",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    return BuildingServices.deleteBuilding(id)
                        .then(function (result) {
                            if (!result && result.code > 0) {
                                swal(result.message);
                                getBuildings();
                            } else {
                                swal("¡Eliminado!", "El edificio ha sido eliminado", "success");
                                getBuildings();
                            }
                        });
                }
            });
        };
        
        /**
        * Crear codigo QR
        * @param {building} building
        */
        self.QRgenerator = function (building) {
            $('#qrcode').empty();
            new QRCode(document.getElementById("qrcode"), "http://localhost:8080/app/basicInfo/searchInfo.html#/buildings/" + building.name);

        };

        self.print = function () {
           window.print();
           
        };


    }
})();
