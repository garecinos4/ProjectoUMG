(function () {
    angular.module('app.publicServices', [])
        .factory('Service', Service);

    Service.$inject = ['$http'];

    function Service($http) {

        return {
            login: login,
            logout: logout
        };

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

    }

})();
