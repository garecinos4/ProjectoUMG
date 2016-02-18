var Handlers = {};

//Metodos  payload post params / query query params / params path params
Handlers.showProcedureHandler = function(server, request, reply) {
    var Procedure = server.plugins['hapi-mongo-models'].Procedure;
    var response = {};
    var filter = {};
    
    Procedure.find(filter, function(err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la búsqueda de procedimientos.',
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

Handlers.createProcedureHandler = function(server, request, reply) {
    var Procedure = server.plugins['hapi-mongo-models'].Procedure;
    var response = {};
    var procedure = {};
    procedure = request.payload;
            
    Procedure.insertOne(procedure, function(err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la creación del procedimiento.',
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

Handlers.updateProcedureHandler = function(server, request, reply) {
    var _id = request.params.id;
    var Procedure = server.plugins['hapi-mongo-models'].Procedure;
    var response = {};
    var procedure = {};
    procedure = request.payload;
    delete procedure._id;
    Procedure.findByIdAndUpdate(_id, procedure, function(err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la edición del procedimiento.' + err,
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

Handlers.deleteProcedureHandler = function(server, request, reply) {
    var _id = request.params.id;
    var Procedure = server.plugins['hapi-mongo-models'].Procedure;
    var response = {};
    Procedure.findByIdAndDelete(_id, function(err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la eliminación del procedimiento.',
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
