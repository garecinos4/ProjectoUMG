var Handlers = require('./handlers');


exports.register = function(server, options, next) {
    console.log('Users Plugin');

    var base = "/api";

    //Crear rutas
    server.route({
        path: base + '/login/',
        method: 'POST',
        handler: function loginHandler(request, reply) {
            Handlers.loginHandler(server, request, reply);
        },
        config: {
            auth: false
        }
    });

    server.route({
        path: '/admin'+ base +'/logout/',
        method: 'POST',
        handler: function logoutHandler(request, reply) {
            Handlers.logoutHandler(server, request, reply);
        }
    });


    server.route({
        path: base + '/users/',
        method: 'GET',
        handler: function showUsersHandler(request, reply) {
            Handlers.showUsersHandler(server, request, reply);
        }
    });

    server.route({
        path: base + '/users/',
        method: 'POST',
         handler: function createUserHandler(request, reply) {
            Handlers.createUserHandler(server, request, reply);
        }
    });

    server.route({
        path: base + '/users/{id}',
        method: 'PUT',
        handler: function updateUserHandler(request, reply) {
            Handlers.updateUserHandler(server, request, reply);
        }
    });

    server.route({
        path: base + '/users/{id}',
        method: 'DELETE',
        handler: function deleteUserHandler(request, reply) {
            Handlers.deleteUserHandler(server, request, reply);
        }
    });
    
    server.route({
        method: 'GET',
        path: '/profile',
        config: {
            handler: function (request, reply) {
                reply( request.auth.credentials);
            }
        }
    });

    next();
};


exports.register.attributes = {
    pkg: require('./package.json')
};
