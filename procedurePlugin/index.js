var Handlers = require('./handlers');


exports.register = function (server, options, next) {
    console.log('Procedure Plugin');

    var base = "/api";

    //Crear rutas
    server.route({
        path: base + '/procedures/',
        method: 'GET',
        handler: function showProcedureHandler(request, reply) {
            Handlers.showProcedureHandler(server, request, reply);
        },
        config: {
            auth: false
        }
    });

    server.route({
        path: base + '/procedures/',
        method: 'POST',
        handler: function createProcedureHandler(request, reply) {
            Handlers.createProcedureHandler(server, request, reply);
        }
    });

    server.route({
        path: base + '/procedures/{id}',
        method: 'PUT',
        handler: function updateProcedureHandler(request, reply) {
            Handlers.updateProcedureHandler(server, request, reply);
        }
    });

    server.route({
        path: base + '/procedures/{id}',
        method: 'DELETE',
        handler: function deleteProcedureHandler(request, reply) {
            Handlers.deleteProcedureHandler(server, request, reply);
        }
    });

    server.route({
        path: base + '/procedures/search/',
        method: 'GET',
        handler: function searchProcedureHandler(request, reply) {
            Handlers.searchProcedureHandler(server, request, reply);
        },
        config: {
            auth: false
        }
    });

    next();
};


exports.register.attributes = {
    pkg: require('./package.json')
};
