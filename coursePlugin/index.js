var Handlers = require('./handlers');


exports.register = function(server, options, next) {
    console.log('Course Plugin');

    var base = "/api";

    //Crear rutas
    server.route({
        path: base + '/courses/',
        method: 'GET',
        handler: function showCourseHandler(request, reply) {
            Handlers.showCourseHandler(server, request, reply);
        }
    });

    server.route({
        path: base + '/courses/',
        method: 'POST',
        handler: function createCourseHandler(request, reply) {
            Handlers.createCourseHandler(server, request, reply);
        }
    });

    server.route({
        path: base + '/courses/{id}',
        method: 'PUT',
        handler: function updateCourseHandler(request, reply) {
            Handlers.updateCourseHandler(server, request, reply);
        }
    });

    server.route({
        path: base + '/courses/{id}',
        method: 'DELETE',
        handler: function deleteCourseHandler(request, reply) {
            Handlers.deleteCourseHandler(server, request, reply);
        }
    });

    next();
};


exports.register.attributes = {
    pkg: require('./package.json')
};
