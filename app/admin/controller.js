(function () {
    'use strict';
    angular.module('app.controllers', [])
        .controller('Controller', Controller);

    Controller.$inject = ['MainService', '$location'];


    function Controller(MainService, $location) {
        var self = this;
        self.data = {};
        self.checkboxOption;
        self.showError = false;
        self.showResult = false;
        self.resultList = [];
        self.building = {};

        getInfo();

        function getInfo() {
            return MainService.getProfile()
                .then(function (result) {
                    if (result) {
                        self.info = result;
                    }
                });
        }

        self.logout = function () {
            return MainService.logout('api/logout/')
                .then(function (result) {
                    if (result && result.code === 0) {
                        console.log("SESION CERRADA");
                        window.location.href = "/";
                    } else {
                        console.log("NO SE PUDO CERRAR SESION");
                    }
                });
        };

        self.isCheck = function (value) {
            self.checkboxOption = value;
        }

        self.findText = function () {
            self.resultList = [];
            //console.log(self.checkboxOption + "   " + self.searchText);
            return MainService.findBasicInfo(self.checkboxOption, self.searchText)
                .then(function (result) {
                    if (result && result.code === 0 && result.data.length > 0) {
                        self.resultList = result.data;
                        self.showResult = true;
                        self.showError = false;
                        $location.path(self.checkboxOption);
                    } else if (result.data.length < 1) {
                        self.showError = true;
                        self.showResult = false;
                    } else {
                        swal("ERROR!!!", result.message, "error");
                        self.showResult = false;
                        self.showError = true;
                    }
                });
        }

    }


})();
