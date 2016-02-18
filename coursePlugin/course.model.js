var Joi = require('joi'); //Validar 
var ObjectAssign = require('object-assign');
var BaseModel = require('hapi-mongo-models').BaseModel;

var Course = BaseModel.extend({
    // instance prototype
    constructor: function (attrs) {

        ObjectAssign(this, attrs);
    }
});

Course._collection = 'Courses'; // the mongo collection name

var _activities = Joi.object().keys({
            number: Joi.number().integer(),
            name: Joi.string(),
            description: Joi.string(),
            begin: Joi.string(),
            end: Joi.string(),
            room_id: Joi.object()
        });

var _doc = Joi.object().keys({
            number: Joi.number().integer(),
            name: Joi.string()
        });

Course.schema = Joi.object().keys({
    _id: Joi.object(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.boolean(),
    activities: Joi.array().items(_activities),
    dodocumentsc: Joi.array().items(_doc),
    user_id: Joi.object()
});

Course.staticFunction = function () {

    // static class function
};

module.exports = Course;
