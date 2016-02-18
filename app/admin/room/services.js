(function (){
    angular
            .module('app.service', [])
            .factory('RoomServices', RoomServices);
   
    RoomServices.$inject = ['$http'];
    
    
    function RoomServices($http){
        return{
            createRoom: createRoom,
            updateRoom: updateRoom,
            deleteRoom: deleteRoom
        };
        
              
         function createRoom(data){
            return $http.post('/api/rooms/', data)
                    .then(getResponseOK)
                    .catch(getResponseFailed);
            function getResponseOK(response){
                return response.data;
            }
            function getResponseFailed(error){
                console.log('XHR Failed for get rooms.' + error.data);
            }
        }

        function updateRoom(data){
            return $http.put('/api/rooms/' + data._id, data)
                    .then(getResponseOK)
                    .catch(getResponseFailed);
            function getResponseOK(response){
                return response.data;
            }
            function getResponseFailed(error){
                console.log('XHR Failed for get rooms.' + error.data);
            }
        }

        function deleteRoom(id){
            return $http.delete('/api/rooms/' + id)
                    .then(getResponseOK)
                    .catch(getResponseFailed);
            function getResponseOK(response){
                return response.data;
            }
            function getResponseFailed(error){
                console.log('XHR Failed for get rooms.' + error.data);
            }
        }
        
    }
    
   
})();