var Joi = require('joi'); //Validar 
var ObjectAssign = require('object-assign');
var BaseModel = require('hapi-mongo-models').BaseModel;

var Procedure = BaseModel.extend({
    // instance prototype
    constructor: function (attrs) {

        ObjectAssign(this, attrs);
    }
});

Procedure._collection = 'Procedures'; // the mongo collection name

var _step =  Joi.object().keys({
            number: Joi.number().integer(),
            name: Joi.string(),
            description: Joi.string(),
            room_id: Joi.object(),
            building_id: Joi.object()
        });


Procedure.schema = Joi.object().keys({
    _id: Joi.object(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.boolean(),
    step: Joi.array().items(_step)
});

Procedure.staticFunction = function () {

    // static class function
};

module.exports = Procedure;
