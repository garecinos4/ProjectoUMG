var Handlers = {};

//Metodos  payload post params / query query params / params path params
Handlers.showCourseHandler = function(server, request, reply) {
    var Course = server.plugins['hapi-mongo-models'].Course;
    var response = {};
    var filter = {};
    
    Course.find(filter, function(err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la búsqueda de cursos.',
                data: {}
            };
            return reply(response);
        }
        response = {
            code: 0,
            message: '',
            data: results
        };

        return reply(response);
    });
}

Handlers.createCourseHandler = function(server, request, reply) {
    var Course = server.plugins['hapi-mongo-models'].Course;
    var response = {};
    var course = {};
    course = request.payload;
            
    Course.insertOne(course, function(err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la creación del curso.',
                data: {}
            };
            return reply(response);
        }
        response = {
            code: 0,
            message: 'Creación Exitosa.',
            data: {}
        };

        return reply(response);
    });
}

Handlers.updateCourseHandler = function(server, request, reply) {
    var _id = request.params.id;
    var Course = server.plugins['hapi-mongo-models'].Course;
    var response = {};
    var course = {};
    course = request.payload;
    delete course._id;
    Course.findByIdAndUpdate(_id, course, function(err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la edición del curso.' + err,
                data: {}
            };
            return reply(response);
        }
        response = {
            code: 0,
            message: 'Edición Exitosa.',
            data: {}
        };

        return reply(response);
    });
}

Handlers.deleteCourseHandler = function(server, request, reply) {
    var _id = request.params.id;
    var Course = server.plugins['hapi-mongo-models'].Course;
    var response = {};
           
    Course.findByIdAndDelete(_id, function(err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la eliminación del curso.',
                data: {}
            };
            return reply(response);
        }
        response = {
            code: 0,
            message: 'Eliminación Exitosa.',
            data: results
        };

        return reply(response);
    });
}



module.exports = Handlers;
