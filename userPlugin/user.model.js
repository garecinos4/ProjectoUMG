var Joi = require('joi'); //Validar 
var ObjectAssign = require('object-assign');
var BaseModel = require('hapi-mongo-models').BaseModel;

var User = BaseModel.extend({
    // instance prototype
    constructor: function (attrs) {

        ObjectAssign(this, attrs);
    }
});

User._collection = 'Users'; // the mongo collection name

User.schema = Joi.object().keys({
    _id: Joi.object().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.array().items(Joi.string()).single().required()

});

User.staticFunction = function () {

    // static class function
};

module.exports = User;