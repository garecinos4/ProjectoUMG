/**
 * Maneja las funciones basicas
 * del mantenimiento de edificios
 * (Agregar)
 * @author Gabriela Alejandra Recinos Arevalo
 */

(function () {
    'use strict';
    angular.module('app.formController', [])
            .controller('FormController', FormController);

    FormController.$inject = ['$scope'];

    function FormController($scope) {
        var self = this;

        self.building = {};

        var marker;
        var pos;
        var mapCanvas = document.getElementById('map-canvas');
        var mapOptions = {
            title: 'default',
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP //HYBRID //ROADMAP 
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);

        getCurrentPosition();

        function getCurrentPosition() {
            /**
             * Valida si existe una geolocalizacion
             */
            if (navigator.geolocation) {
                /**
                 * Obtiene la posicion actual
                 */
                navigator.geolocation.getCurrentPosition(function (position) {
                    pos = new google.maps.LatLng(position.coords.latitude,
                            position.coords.longitude);

                    self.building.latitude = pos.lat();
                    self.building.longitude = pos.lng();

                    /**
                     * Crea una marca inicial
                     */
                    marker = new google.maps.Marker({
                        title: 'Default',
                        map: map,
                        position: pos,
                        animation: google.maps.Animation.DROP
                    });
                    map.setCenter(pos);
                    var infowindow = new google.maps.InfoWindow({
                        map: map,
                        position: pos,
                        content: 'Usted esta aquí.'
                    });

                    infowindow.open(map, marker);
                    /**
                     * Invoca a la funcion que inicia el mapa
                     */
                    self.init = initMap();

                }, function () {
                    handleNoGeolocation(true);
                });
            } else {
                /**
                 *  Browser doesn't support Geolocation
                 */
                handleNoGeolocation(false);
            }
        }

        function initMap() {
            //Agregar markers
            var listener1 = google.maps.event.addListener(map, 'click', function (e) {
                marker.setMap(null);
                mark(e.latLng, map);
                $scope.$apply();
            });
        }

        function mark(position, map) {
            //New Marker
            marker = new google.maps.Marker({
                position: position,
                map: map
            });
            //Info Window
            var infowindow = new google.maps.InfoWindow();
            infowindow.setContent('<b>' + self.building.name + '</b>');
            infowindow.open(map, marker);

            google.maps.event.trigger(map, "resize");

            map.panTo(position);

            self.building.latitude = position.lat();
            self.building.longitude = position.lng();
        };

        self.onChange = function () {
            marker.setMap(null);
            mark(new google.maps.LatLng(self.building.latitude,
                    self.building.longitude), map);
        };
        
        self.createBuilding = function(){
            console.log(self.building);
        };
    }
})();