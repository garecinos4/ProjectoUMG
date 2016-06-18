(function () {
    angular
        .module('app.service', [])
        .factory('BuildingServices', BuildingServices);

    BuildingServices.$inject = ['$http'];
    var server = 'http://kuakcity.com/api/';

    function BuildingServices($http) {
        return {
            createBuilding: createBuilding,
            updateBuilding: updateBuilding,
            deleteBuilding: deleteBuilding
        };

        function createBuilding(data) {
            return $http.post(server + 'buildings/', data)
                .then(getResponseOK)
                .catch(getResponseFailed);
            function getResponseOK(response) {
                return response.data;
            }
            function getResponseFailed(error) {
                console.log('XHR Failed for get buildings.' + error.data);
            }
        }

        function updateBuilding(data) {
            return $http.put(server + 'buildings/' + data._id, data)
                .then(getResponseOK)
                .catch(getResponseFailed);
            function getResponseOK(response) {
                return response.data;
            }
            function getResponseFailed(error) {
                console.log('XHR Failed for get buildings.' + error.data);
            }
        }

        function deleteBuilding(id) {
            return $http.delete(server + 'buildings/' + id)
                .then(getResponseOK)
                .catch(getResponseFailed);
            function getResponseOK(response) {
                return response.data;
            }
            function getResponseFailed(error) {
                console.log('XHR Failed for get buildings.' + error.data);
            }
        }

    }


})();