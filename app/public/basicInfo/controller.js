(function () {
    'use strict';
    angular.module('app.basicController', [])
        .controller('BasicController', BasicController);

    BasicController.$inject = ['BasicService', '$location', '$anchorScroll', '$routeParams'];


    function BasicController(BasicService, $location, $anchorScroll, $routeParams) {
        var self = this;

        self.showError = false;
        self.showResult = false;
        self.building = {};
        self.checkboxOption;
        self.resultList = [];

        var marker;
        var pos;
        var map;

        self.editBuilding = function (building) {
            self.building = building;
            var mapCanvas = document.getElementById('map-canvas');
            var mapOptions = {
                title: 'default',
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.HYBRID //HYBRID //ROADMAP 
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

        function initMap() {
            pos = new google.maps.LatLng(self.building.latitude,
                self.building.longitude);

            /**
             * Crea una marca inicial
             */
            mark(pos, map);
        }

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

            

            self.building.latitude = pos.lat();
            self.building.longitude = pos.lng();
        }


        if ($routeParams.type) {
            //console.log("PARAMS" + $routeParams.type + " and " + $routeParams.text);
            findInfo();
        }

        function findInfo() {
            return BasicService.findBasicInfo($routeParams.type, $routeParams.text)
                .then(function (result) {
                    if (result && result.code === 0 && result.data.length > 0) {
                        self.resultList = result.data;
                        self.showResult = true;
                        self.showError = false;

                    } else if (result && result.data && result.data.length < 1) {
                        self.showError = true;
                        self.showResult = false;
                    } else {
                        swal("ERROR!!!", result.message, "error");
                        self.showResult = false;
                        self.showError = true;
                    }
                });
        }


        self.isCheck = function (value) {
            self.checkboxOption = value;
        }

        self.findText = function () {
            $location.path(self.checkboxOption + "/" + self.searchText);
        }

    }


})();
