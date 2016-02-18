(function () {
    angular
            .module('app.service', [])
            .factory('CourseServices', CourseServices);

    CourseServices.$inject = ['$http'];


    function CourseServices($http) {
        return{
            createCourse: createCourse,
            updateCourse: updateCourse,
            deleteCourse: deleteCourse
        };
        
        function createCourse(data){
            return $http.post('/api/courses/', data)
                    .then(getResponseOK)
                    .catch(getResponseFailed);
            function getResponseOK(response){
                return response.data;
            }
            function getResponseFailed(error){
                console.log('XHR Failed for get courses.' + error.data);
            }
        }

        function updateCourse(data){
            return $http.put('/api/courses/' + data._id, data)
                    .then(getResponseOK)
                    .catch(getResponseFailed);
            function getResponseOK(response){
                return response.data;
            }
            function getResponseFailed(error){
                console.log('XHR Failed for get courses.' + error.data);
            }
        }

        function deleteCourse(id){
            return $http.delete('/api/courses/' + id)
                    .then(getResponseOK)
                    .catch(getResponseFailed);
            function getResponseOK(response){
                return response.data;
            }
            function getResponseFailed(error){
                console.log('XHR Failed for get courses.' + error.data);
            }
        }
        
    }


})();