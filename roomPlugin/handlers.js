var ObjectID = require('mongodb').ObjectID;
var Dbc = require('../searchPlugin');
var assert = require('assert');
var Handlers = {};

//Metodos  payload post params / query query params / params path params
Handlers.showRoomHandler = function (server, request, reply) {
    var Room = server.plugins['hapi-mongo-models'].Room;
    var response = {};
    var filter = {};

    Room.find(filter, function (err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la búsqueda de salones.',
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

Handlers.createRoomHandler = function (server, request, reply) {
    var Room = server.plugins['hapi-mongo-models'].Room;
    var response = {};
    var room = {};
    room = request.payload;

    Room.insertOne(room, function (err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la creación del salón.',
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

Handlers.updateRoomHandler = function (server, request, reply) {
    var _id = request.params.id;
    var Room = server.plugins['hapi-mongo-models'].Room;
    var response = {};
    var room = {};
    room = request.payload;
    delete room._id;
    Room.findByIdAndUpdate(_id, room, function (err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la edición del salón.' + err,
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

Handlers.deleteRoomHandler = function (server, request, reply) {
    var _id = request.params.id;
    var Room = server.plugins['hapi-mongo-models'].Room;
    var response = {};

    Room.findByIdAndDelete(_id, function (err, results) {
        if (err) {
            response = {
                code: 1,
                message: 'Error en la eliminación del salón.',
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

Handlers.searchRoomHandler = function (server, request, reply) {
    var response = {};
    var text = request.query.text;
    var rooms = [];

    Dbc.connect(function (db, call) {
        var roomsResult = [];
        var content = '\"' + text + '\"';
        roomsResult = db.collection('Rooms').find({ $text: { $search: content } });
        roomsResult.each(function (err, doc) {
            //assert.equal(err, null);
            if (doc != null) {
                rooms.push(doc);
            } else {
                response = {
                    code: 0,
                    message: 'Busqueda de Salón Exitosa.',
                    data: rooms
                };
                db.close();
                return reply(response);
            }
        });
    });
}


module.exports = Handlers;
