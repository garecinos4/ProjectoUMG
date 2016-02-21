(function () {
    angular.module('app.basicServices', [])
        .factory('BasicService', BasicService);

    BasicService.$inject = ['$http'];

    function BasicService($http) {
       
         return {
            findBasicInfo: findBasicInfo
        };

        function findBasicInfo(service, text) {
            return $http.get('/api/' + service + '/search/', { params: { text: text } })
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
