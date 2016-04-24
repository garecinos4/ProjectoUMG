(function () {
    angular.module('app.mainServices', [])
        .factory('MainService', MainService);

    MainService.$inject = ['$http'];

    function MainService($http) {
        var server = '/api/';
        var data = {};
        var service;

        return {

            logout: logout,
            getBuildings: getBuildings,
            getBuilding: getBuilding,
            getRooms: getRooms,
            getRoomTypes: getRoomTypes,
            getProcedures: getProcedures,
            getUsers: getUsers,
            getCourses: getCourses,
            findBasicInfo: findBasicInfo,
            getProfile: getProfile
        };

        function getProfile() {
            return $http.get('/profile')
                .then(getResponseOK)
                .catch(getResponseFailed);

            function getResponseOK(response) {
                return response.data;
            }

            function getResponseFailed(error) {
                console.log('XHR Failed for get profile.' + error.data);
            }
        }

        function getBuilding(id) {
            return $http.get(server + 'buildings/?id=' + id)
                .then(getResponseOK)
                .catch(getResponseFailed);

            function getResponseOK(response) {
                return response.data;
            }

            function getResponseFailed(error) {
                console.log('XHR Failed for get buildings.' + error.data);
            }
        }

        function getBuildings() {
            return $http.get(server + 'buildings/')
                .then(getResponseOK)
                .catch(getResponseFailed);

            function getResponseOK(response) {
                return response.data;
            }

            function getResponseFailed(error) {
                console.log('XHR Failed for get buildings.' + error.data);
            }
        }

        function getRooms() {
            return $http.get(server + 'rooms/')
                .then(getResponseOK)
                .catch(getResponseFailed);

            function getResponseOK(response) {
                return response.data;
            }

            function getResponseFailed(error) {
                console.log('XHR Failed for get rooms.' + error.data);
            }
        }

        function getRoomTypes() {
            return $http.get('../test/json/roomTypes.json')
                .then(getResponseOK)
                .catch(getResponseFailed);

            function getResponseOK(response) {
                return response.data;
            }

            function getResponseFailed(error) {
                console.log('XHR Failed for get room types.' + error.data);
            }
        }

        function getProcedures() {
            return $http.get(server + 'procedures/')
                .then(getResponseOK)
                .catch(getResponseFailed);

            function getResponseOK(response) {
                return response.data;
            }

            function getResponseFailed(error) {
                console.log('XHR Failed for get procedures.' + error.data);
            }
        }

        function getUsers() {
            return $http.get(server + 'users/')
                .then(getResponseOK)
                .catch(getResponseFailed);

            function getResponseOK(response) {
                return response.data;
            }

            function getResponseFailed(error) {
                console.log('XHR Failed for get users.' + error.data);
            }
        }

        function getCourses() {
            return $http.get(server + 'courses/')
                .then(getResponseOK)
                .catch(getResponseFailed);

            function getResponseOK(response) {
                return response.data;
            }

            function getResponseFailed(error) {
                console.log('XHR Failed for get courses.' + error.data);
            }
        }

        function login(data) {
            return $http.post(server + 'login/', data)
                .then(loginOK)
                .catch(loginFailed);

            function loginOK(response) {
                return response.data;
            }

            function loginFailed(error) {
                console.log('XHR Failed for login.' + error.data);
            }
        }

        function logout(data) {
            return $http.post(data)
                .then(logoutOK)
                .catch(logoutFailed);

            function logoutOK(response) {
                return response.data;
            }

            function logoutFailed(error) {
                console.log('XHR Failed for logout.' + error.data);
            }
        }

        function findBasicInfo(service, text) {
            return $http.get(server + service + '/search/', { params: { text: text } })
                .then(getResponseOK)
                .catch(getResponseFailed);

            function getResponseOK(response) {
                return response.data;
            }

            function getResponseFailed(error) {
                console.log('XHR Failed for search ' + service + ' - Error: ' + error.data);
            }
        }
    }

})();
