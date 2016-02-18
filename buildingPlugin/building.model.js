var Joi = require('joi'); //Validar 
var ObjectAssign = require('object-assign');
var BaseModel = require('hapi-mongo-models').BaseModel;

var Building = BaseModel.extend({
    // instance prototype
    constructor: function (attrs) {

        ObjectAssign(this, attrs);
    }
});

Building._collection = 'Buildings'; // the mongo collection name

Building.schema = Joi.object().keys({
    _id: Joi.object(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    longitud: Joi.string().required(),
    latitude: Joi.string().required()

});

Building.staticFunction = function () {

    // static class function
};

module.exports = Building;
