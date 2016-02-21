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


        self.isCheck = function (value) {
            self.checkboxOption = value;
        }

        self.findText = function () {
            $location.path(self.checkboxOption + "/" + self.searchText);
        }

    }


})();
