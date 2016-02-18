(function (){
    angular
            .module('app.service', [])
            .factory('BuildingServices', BuildingServices);
   
    BuildingServices.$inject = ['$http'];
    
    
    function BuildingServices($http){
        return{
            createBuilding: createBuilding,
            updateBuilding: updateBuilding,
            deleteBuilding: deleteBuilding
        };
        
        function createBuilding(data){
            return $http.post('/api/buildings/', data)
                    .then(getResponseOK)
                    .catch(getResponseFailed);
            function getResponseOK(response){
                return response.data;
            }
            function getResponseFailed(error){
                console.log('XHR Failed for get buildings.' + error.data);
            }
        }

        function updateBuilding(data){
            return $http.put('/api/buildings/' + data._id, data)
                    .then(getResponseOK)
                    .catch(getResponseFailed);
            function getResponseOK(response){
                return response.data;
            }
            function getResponseFailed(error){
                console.log('XHR Failed for get buildings.' + error.data);
            }
        }

        function deleteBuilding(id){
            return $http.delete('/api/buildings/' + id)
                    .then(getResponseOK)
                    .catch(getResponseFailed);
            function getResponseOK(response){
                return response.data;
            }
            function getResponseFailed(error){
                console.log('XHR Failed for get buildings.' + error.data);
            }
        }
        
    }
    
   
})();