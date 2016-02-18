/**
 * Maneja las funciones basicas
 * del mantenimiento de edificios
 * (Modificar y Eliminar)
 * @author Gabriela Alejandra Recinos Arevalo
 */

(function () {
    'use strict';
    angular
        .module('app.listController', [])
        .controller('ListController', ListController);

    ListController.$inject = ['$scope', 'CourseServices', '$filter', 'MainService'];

    function ListController($scope, CourseServices, $filter, MainService) {
        var self = this;

        self.course = {};

        self.listCourses = [];
        self.listUsers = [];
        self.listRooms = [];

        /** Incova a la función para cargar los cursos. */
        getCourses();
        /** Incova a la función para cargar los usuarios. */
        getUsers();
        /** Incova a la función para cargar los salones. */
        getRooms();

        self.picker1 = false;
        self.picker2 = false;
        
        /**
        * Definición de la función para cargar
        * la lista de cursos del servidor 
        * @returns {courses}
        */
        function getCourses() {
            return MainService.getCourses()
                .then(function (result) {
                    self.courses = result.data;
                });
        }

        /**
        * Definición de la función para cargar
        * la lista de usuarios del servidor 
        * @returns {users}
        */
        function getUsers() {
            return MainService.getUsers()
                .then(function (result) {
                    self.listUsers = result.data;
                });
        }

        /**
        * Definición de la función para cargar
        * la lista de salones del servidor 
        * @returns {rooms}
        */
        function getRooms() {
            return MainService.getRooms()
                .then(function (result) {
                    self.listRooms = result.data;
                });
        }

        self.onChangeDate = function () {
            $('#beginDate').datepicker({ dateFormat: 'dd/mm/yy' }).val();
            $('#endDate').datepicker({ dateFormat: 'dd/mm/yy' }).val();
        };
        
        /**
        * Muestra en la vista los usuarios 
        * del curso seleccionado
        * @param {id} id
        */
        self.findProfessor = function (id) {
            var selected;
            if (id && self.listUsers.length) {
                angular.forEach(self.listUsers, function (obj) {
                    if (obj._id === id) {
                        selected = obj.name;
                    }
                });
                return selected ? selected : '----';
            } else {
                return '-----';
            }
        };
        
        /**
        * Definición de la función para cargar
        * la lista de salones del servidor 
        * @returns {rooms}
        */
        self.showRoom = function (step) {
            var selected;
            if (step.room_id && self.listRooms.length) {
                selected = $filter('filter')(self.listRooms, {
                    _id: step.room_id
                });
                return selected.length ? selected[0].name : '-----';
            } else {
                return '-----';
            }
        };

        /**
         * Elimina actividad
         * @param {index} index
         */
        self.removeRow = function (index) {
            self.course.activities.splice(index, 1);
        };
        
        /**
        * Agrega actividad
        * @param {index} index
        */
        self.addRow = function () {
            self.inserted = {
                number: self.course.activities ? self.course.activities.length + 1 : 1,
                name: '',
                description: '',
                begin: '',
                end: '',
                room_id: ''
            };
            if (!self.course.activities) {
                self.course.activities = [];
            }
            self.course.activities.push(self.inserted);
        };

        /**
         * Guarda los cambios realizados
         * @param {course} course
         */
        self.saveCourse = function (course) {
            course.status = $('#toggleStatus').prop('checked');
            console.log(course);
            $('#modalEdit').modal('hide');
            return CourseServices.updateCourse(course)
                .then(function (result) {
                    if (!result && result.code > 0) {
                        swal(result.message);
                        getCourses();
                    }
                });
        };

        /** 
       * Cancela los cambios realizados, 
       * vuelve a cargar la lista de cursos
       */
        self.cancelCourse = function () {
            getCourses();
        };

        /**
         * Guarda los datos del curso que
         * se va a modificar
         * @param {course} course
         */
        self.editCourse = function (course) {
            self.course = course;
        };
        
        /**
        * Elimina el curso seleccionado
        * @param {course._id} id
        */
        self.deleteCourse = function (id) {
            swal({
                title: "Borrar Curso.",
                text: "¿Esta seguro que desea borrar curso?",
                type: "error",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Borrar",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    return CourseServices.deleteCourse(id)
                        .then(function (result) {
                            if (!result && result.code > 0) {
                                swal(result.message);
                                getCourses();
                            } else {
                                swal("¡Eliminado!", "El curso ha sido eliminado", "success");
                                getCourses();
                            }
                        });
                }
            });
        };
        
        /**
       * Crear codigo QR
       * @param {course} course
       */
        self.QRgenerator = function (course) {
            $('#qrcode').empty();
            new QRCode(document.getElementById("qrcode"), "http://localhost:8080/app/basicInfo/searchInfo.html#/courses/" + course.name);

        };

        self.print = function () {
            window.print();

        };



    }
})();
