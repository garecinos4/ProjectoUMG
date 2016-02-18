//incluir hapi.js
var Hapi = require('hapi'),
    HapiMongoModels = require('hapi-mongo-models');
//var users = require('./users.js');


//Crear servidor
var server = new Hapi.Server();

//Crear conexion
server.connection({
    host: '104.236.120.91',
    port: 80,
    routes: { cors: true }
});

//Crear conexion con mongodb
var plugin = {
    register: HapiMongoModels,
    options: {
        mongodb: {
            url: 'mongodb://mongo:27017/Project',
            options: {}
        },
        autoIndex: false,
        models: {
            User: './userPlugin/user.model',
            Building: './buildingPlugin/building.model',
            Room: './roomPlugin/room.model',
            Procedure: './procedurePlugin/procedure.model',
            Course: './coursePlugin/course.model'
        }
    }
};

//resgistrar plugins
server.register(plugin, function (err) {
    if (err) {
        console.log('Failed loading plugin');
    }
});

server.register(require('hapi-auth-cookie'), function (err) {
    if (err) {
        console.log('Failed loading plugin');
    }
    server.auth.strategy('default', 'cookie', {
        password: '1234',
        redirectTo: '/',
        isSecure: false
    });

    server.auth.default('default');

});

server.register(require('./userPlugin'), function (err) {
    if (err) {
        console.log('Failed loading user plugin');
    }
});
server.register(require('./buildingPlugin'), function (err) {
    if (err) {
        console.log('Failed loading building plugin');
    }
});
server.register(require('./roomPlugin'), function (err) {
    if (err) {
        console.log('Failed loading room plugin');
    }
});
server.register(require('./procedurePlugin'), function (err) {
    if (err) {
        console.log('Failed loading procedure plugin');
    }
});
server.register(require('./coursePlugin'), function (err) {
    if (err) {
        console.log('Failed loading course plugin');
    }
});

//Rutas de Paginas
server.route({
    path: '/',
    method: 'GET',
    handler: {
        file: './app/public/index.html'
    },
    config: {
        auth: false
    }
});

server.route({
    path: '/app/{path*}',
    method: 'GET',
    handler: {
        directory: {
            path: './app/public/',
            listing: false // lista los archivos
        }
    },
    config: {
        auth: false
    }
});

server.route({
    path: '/test/{path*}',
    method: 'GET',
    handler: {
        directory: {
            path: './test/',
            listing: false // lista los archivos
        }
    },
    config: {
        auth: false
    }
});

server.route({
    path: '/assets/{path*}',
    method: 'GET',
    handler: {
        directory: {
            path: './assets/',
            listing: false // lista los archivos
        }
    },
    config: {
        auth: false
    }
});

server.route({
    path: '/admin/{path*}',
    method: 'GET',
    handler: {
        directory: {
            path: './app/admin/',
            listing: false
        }
    }
});


//Iniciar servidor
server.start(function () {
    console.log('Inicializando Servidor en: ' + server.info.uri);
});
