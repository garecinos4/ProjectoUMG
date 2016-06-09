var Handlers = require('./handlers');


exports.register = function(server, options, next) {
    console.log('Email Plugin');

    var base = "/api";

    //Crear rutas
    server.route({
        path: base + '/recover/',
        method: 'POST',
        handler: function emailHandler(request, reply) {
            Handlers.emailHandler(server, request, reply);
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
