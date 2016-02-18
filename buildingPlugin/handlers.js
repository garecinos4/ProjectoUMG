var ObjectID = require('mongodb').ObjectID;
var Dbc = require('../searchPlugin');
//var assert = require('assert');
var Handlers = {};

//Metodos  payload post params / query query params / params path params
Handlers.showBuildingHandler = function (server, request, reply) {
    var Building = server.plugins['hapi-mongo-models'].Building;
    var response = {};
    var filter = {};

    if (request.query.id) {
        filter._id = new ObjectID(request.query.id);
    }

    Building.find(filter, function (err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la búsqueda de edificios.',
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

        return reply(response);
    });
}

Handlers.createBuildingHandler = function (server, request, reply) {
    var Building = server.plugins['hapi-mongo-models'].Building;
    var response = {};
    var building = {};
    building = request.payload;

    Building.insertOne(building, function (err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la creación del edificio.',
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

Handlers.updateBuildingHandler = function (server, request, reply) {
    var _id = request.params.id;
    var Building = server.plugins['hapi-mongo-models'].Building;
    var response = {};
    var building = {};
    building = request.payload;
    delete building._id;
    Building.findByIdAndUpdate(_id, building, function (err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la edición del edificio.' + err,
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

Handlers.deleteBuildingHandler = function (server, request, reply) {
    var _id = request.params.id;
    var Building = server.plugins['hapi-mongo-models'].Building;
    var response = {};

    Building.findByIdAndDelete(_id, function (err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la eliminación del edificio.',
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


Handlers.searchBuildingHandler = function (server, request, reply) {
    var response = {};
    var text = request.query.text;
    var buildings = [];

    Dbc.connect(function (db) {
        var buildingsResult = [];
        var content =  '\"' + text + '\"';
        buildingsResult = db.collection('Buildings').find({ $text: { $search: content } });
        buildingsResult.each(function (err, doc) {
            //assert.equal(err, null);
            if (doc != null) {
                buildings.push(doc);
            } else {
                response = {
                    code: 0,
                    message: 'Busqueda Exitosa.',
                    data: buildings
                };
                db.close();
                return reply(response);
            }
        });
    });
}


module.exports = Handlers;
