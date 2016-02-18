(function () {
    angular
        .module('app.service', [])
        .factory('ProcedureServices', ProcedureServices);

    ProcedureServices.$inject = ['$http'];


    function ProcedureServices($http) {
        return {
            createProcedure: createProcedure,
            updateProcedure: updateProcedure,
            deleteProcedure: deleteProcedure

        };

        function createProcedure(data) {
            return $http.post('/api/procedures/', data)
                .then(getResponseOK)
                .catch(getResponseFailed);
            function getResponseOK(response) {
                return response.data;
            }
            function getResponseFailed(error) {
                console.log('XHR Failed for get procedures.' + error.data);
            }
        }

        function updateProcedure(data) {
            return $http.put('/api/procedures/' + data._id, data)
                .then(getResponseOK)
                .catch(getResponseFailed);
            function getResponseOK(response) {
                return response.data;
            }
            function getResponseFailed(error) {
                console.log('XHR Failed for get procedures.' + error.data);
            }
        }

        function deleteProcedure(id) {
            return $http.delete('/api/procedures/' + id)
                .then(getResponseOK)
                .catch(getResponseFailed);
            function getResponseOK(response) {
                return response.data;
            }
            function getResponseFailed(error) {
                console.log('XHR Failed for get procedures.' + error.data);
            }
        }

    }


})();