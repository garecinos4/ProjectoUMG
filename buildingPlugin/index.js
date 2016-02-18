var Handlers = require('./handlers');


exports.register = function (server, options, next) {
    console.log('Building Plugin');

    var base = "/api";

    //Crear rutas
    server.route({
        path: base + '/buildings/',
        method: 'GET',
        handler: function showBuildingHandler(request, reply) {
            Handlers.showBuildingHandler(server, request, reply);
        },
        config: {
            auth: false
        }
    });

    server.route({
        path: base + '/buildings/',
        method: 'POST',
        handler: function createBuildingHandler(request, reply) {
            Handlers.createBuildingHandler(server, request, reply);
        }
    });

    server.route({
        path: base + '/buildings/{id}',
        method: 'PUT',
        handler: function updateBuildingHandler(request, reply) {
            Handlers.updateBuildingHandler(server, request, reply);
        }
    });

    server.route({
        path: base + '/buildings/{id}',
        method: 'DELETE',
        handler: function deleteBuildingHandler(request, reply) {
            Handlers.deleteBuildingHandler(server, request, reply);
        }
    });

    server.route({
        path: base + '/buildings/search/',
        method: 'GET',
        handler: function searchBuildingHandler(request, reply) {
            Handlers.searchBuildingHandler(server, request, reply);
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
