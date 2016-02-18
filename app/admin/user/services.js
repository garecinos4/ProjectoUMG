(function () {
    angular
        .module('app.service', [])
        .factory('UserServices', UserServices);

    UserServices.$inject = ['$http'];


    function UserServices($http) {
        return {
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        function createUser(data) {
            return $http.post('/api/users/', data)
                .then(getResponseOK)
                .catch(getResponseFailed);
            function getResponseOK(response) {
                return response.data;
            }
            function getResponseFailed(error) {
                console.log('XHR Failed for get users.' + error.data);
            }
        }

        function updateUser(data) {
            return $http.put('/api/users/' + data._id, data)
                .then(getResponseOK)
                .catch(getResponseFailed);
            function getResponseOK(response) {
                return response.data;
            }
            function getResponseFailed(error) {
                console.log('XHR Failed for get users.' + error.data);
            }
        }

        function deleteUser(id) {
            return $http.delete('/api/users/' + id)
                .then(getResponseOK)
                .catch(getResponseFailed);
            function getResponseOK(response) {
                return response.data;
            }
            function getResponseFailed(error) {
                console.log('XHR Failed for get users.' + error.data);
            }
        }

    }


})();