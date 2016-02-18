/**
 * Maneja las funciones basicas
 * del mantenimiento de edificios
 * (Crear)
 * @author Gabriela Alejandra Recinos Arevalo
 */

(function() {
    'use strict';
    angular.module('app.formController', [])
        .controller('FormController', FormController);

    FormController.$inject = ['$scope', 'BuildingServices'];

    function FormController($scope, BuildingServices) {
        var self = this;
        self.building = {};
        var marker;
        var mapCanvas = document.getElementById('map-canvas');
        var mapOptions = {
            title: 'default',
            zoom: 18,
            center: {
                lat: 14.659275,
                lng: -90.513378
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP //HYBRID //ROADMAP 
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);
        var listener;
        /**
         * Invoca a la función que 
         * inicia los componentes del mapa
         */
        initMap();

        /**
         * Funcion que inicializa los componentes del mapa
         */
        function initMap() {
            listener = google.maps.event.addListener(map, 'click', function(e) {
                mark(e.latLng, map);
                $scope.$apply();
            });
        }

        /** 
         * Función que pinta la marca y 
         * la ventana de información en el mapa
         * @param {google.maps.LatLng} position
         * @param {google.maps.Map} map
         */
        function mark(position, map) {
            if (marker) {
                marker.setMap(null);
            }
            //Instancia una marca
            marker = new google.maps.Marker({
                position: position,
                map: map
            });

            //Instancia una ventana de información
            var infowindow = new google.maps.InfoWindow();
            infowindow.setContent('<b>' + (self.building.name ? self.building.name : "Escriba el nombre") + '</b>');
            infowindow.open(map, marker);

            google.maps.event.trigger(map, "resize");
            map.panTo(position);

            self.building.latitude = position.lat();
            self.building.longitude = position.lng();
        }

        /** 
         * Función que regenera la marca y 
         * la ventana de informacion si
         * hubiera un cambio en la data
         */
        self.onChange = function() {
            if (self.building.latitude && self.building.longitude) {
                mark(new google.maps.LatLng(self.building.latitude,
                    self.building.longitude), map);
            }
        };

        /**
         * Función que crea un nuevo registro {building}
         */
        self.createBuilding = function() {
            console.log(self.building);
            return BuildingServices.createBuilding(self.building)
                .then(function(result) {
                    if (result && result.code === 0) {
                        self.building = {};
                        //Remover markers
                        marker.setMap(null);
                        swal(result.message);
                    } else {
                        swal(result.message);
                    }
                });
        };
    }
})();
