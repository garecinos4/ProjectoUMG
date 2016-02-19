var Handlers = require('./handlers');


exports.register = function (server, options, next) {
    console.log('Room Plugin');

    var base = "/api";

    //Crear rutas
    server.route({
        path: base + '/rooms/',
        method: 'GET',
        handler: function showRoomHandler(request, reply) {
            Handlers.showRoomHandler(server, request, reply);
        },
        config: {
            auth: false
        }
    });

    server.route({
        path: base + '/rooms/',
        method: 'POST',
        handler: function createRoomHandler(request, reply) {
            Handlers.createRoomHandler(server, request, reply);
        }
    });

    server.route({
        path: base + '/rooms/{id}',
        method: 'PUT',
        handler: function updateRoomHandler(request, reply) {
            Handlers.updateRoomHandler(server, request, reply);
        }
    });

    server.route({
        path: base + '/rooms/{id}',
        method: 'DELETE',
        handler: function deleteRoomHandler(request, reply) {
            Handlers.deleteRoomHandler(server, request, reply);
        }
    });

    server.route({
        path: base + '/rooms/search/',
        method: 'GET',
        handler: function searchRoomHandler(request, reply) {
            Handlers.searchRoomHandler(server, request, reply);
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
