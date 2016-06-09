var Handlers = {};

//Metodos  payload post params / query query params / params path params
Handlers.loginHandler = function (server, request, reply) {
    var email = request.payload.email;
    var password = request.payload.password;
    var User = server.plugins['hapi-mongo-models'].User;
    var filter = {};
    var response = {};


    filter.email = email;


    User.find(filter, function (err, results) {
        if (err || !results[0]) {
            response = {
                code: 1,
                message: 'Error en la búsqueda de usuarios',
                data: {}
            };
            return reply(response);
            //return reply(err);
        }
        //console.log(results);

        if (results[0].password != password) {
            response = {
                code: 999,
                message: 'Usuario o contraseña incorrecta.',
                data: {}
            };
            return reply(response);
        }
        response = {
            code: 0,
            message: '',
            data: results[0]
        };

        delete response.data.password;
        request.auth.session.set(response.data);
        return reply(response);
    });
}


Handlers.logoutHandler = function (server, request, reply) {
    request.auth.session.clear();
    response = {
        code: 0,
        message: 'Se ha cerrado sesion.',
        data: {}
    };
    return reply(response);
};


Handlers.showUsersHandler = function (server, request, reply) {
    //Cargar el modelo User cargado en el plugin
    var User = server.plugins['hapi-mongo-models'].User;
    var filter = {};
    var response = {};

    if (request.query.email) {
        filter.email = request.query.email;
    }
    User.find(filter, function (err, results) {
        var response = {};

        if (err) {
            response = {
                code: 1,
                message: 'Error en la búsqueda de usuarios',
                data: {}
            };
            return reply(response);
            //return reply(err);
        }
        response = {
            code: 0,
            message: '',
            data: results
        };
        delete response.data.password;
        request.auth.session.set(response.data);
        return reply(response);
    });
}

Handlers.createUserHandler = function (server, request, reply) {
    var User = server.plugins['hapi-mongo-models'].User;
    var response = {};
    var user = {};
    user = request.payload;

    User.insertOne(user, function (err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la creación del usuario.',
                data: {}
            };
            return reply(response);
            //return reply(err);
        }
        response = {
            code: 0,
            message: 'Creación Exitosa.',
            data: {}
        };

        return reply(response);
    });
}

Handlers.updateUserHandler = function (server, request, reply) {
    var _id = request.params.id;
    var User = server.plugins['hapi-mongo-models'].User;
    var response = {};
    var user = {};
    user = request.payload;
    delete user._id;
    User.findByIdAndUpdate(_id, user, function (err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la edición del usuario.' + err,
                data: {}
            };
            return reply(response);
            //return reply(err);
        }
        response = {
            code: 0,
            message: 'Edición Exitosa.',
            data: {}
        };

        return reply(response);
    });
}

Handlers.deleteUserHandler = function (server, request, reply) {
    var _id = request.params.id;
    var User = server.plugins['hapi-mongo-models'].User;
    var response = {};

    User.findByIdAndDelete(_id, function (err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la eliminación del usuario.',
                data: {}
            };
            return reply(response);
            //return reply(err);
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
