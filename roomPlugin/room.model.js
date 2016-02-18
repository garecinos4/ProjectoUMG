var Joi = require('joi'); //Validar 
var ObjectAssign = require('object-assign');
var BaseModel = require('hapi-mongo-models').BaseModel;

var Room = BaseModel.extend({
    // instance prototype
    constructor: function (attrs) {

        ObjectAssign(this, attrs);
    }
});

Room._collection = 'Rooms'; // the mongo collection name

Room.schema = Joi.object().keys({
    _id: Joi.object(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    floor: Joi.string().required(),
    number: Joi.string().required(),
    type: Joi.string().required(),
    building_id: Joi.object()

});

Room.staticFunction = function () {

    // static class function
};

module.exports = Room;
