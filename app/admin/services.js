(function() {
    angular.module('app.mainServices', [])
        .factory('MainService', MainService);

    MainService.$inject = ['$http'];

    function MainService($http) {
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
            findBasicInfo: findBasicInfo
        };

        function getBuilding(id) {
            return $http.get('/api/buildings/?id=' + id)
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
            return $http.get('/api/buildings/')
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
            return $http.get('/api/rooms/')
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
            //return $http.get('/app/test/json/procedures.json')
            return $http.get('/admin/test/json/roomTypes.json')
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
            return $http.get('/api/procedures/')
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
            return $http.get('/api/users/')
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
            return $http.get('/api/courses/')
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
            return $http.post('/api/login/', data)
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
            return $http.get('/api/'+ service +'/search/', { params: { text: text } })
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
