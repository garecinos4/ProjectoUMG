var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var userPlugin = require('../userPlugin');

var Handlers = {};

// Use Smtp Protocol to send Email
var smtpTransport = nodemailer.createTransport(smtpTransport({
    host: "smtp.gmail.com",
    secureConnection: false,
    port: 587,
    auth: {
        user: "recinos.alejandra@gmail.com",
        pass: "*****"
    }
}));


var mail = {};



Handlers.emailHandler = function (server, request, reply) {
var email = request.payload.email;
    mail = {
        from: "Kuakcity UMG  <recinos.alejandra@gmail.com>",
        to: email,
        subject: "Recuperación de contraseña",
        text: "Este correo contiene la nueva contraseña para iniciar sesion en el sistema. contraseña: umg123",
        html: "Este correo contiene la nueva contraseña para iniciar sesion en el sistema. contraseña: <b>umg123</b>"
    };


    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }

        smtpTransport.close();
    });

    
    var filter = {};
    filter.email = email;

    var _id;
    var User = server.plugins['hapi-mongo-models'].User;
    var response = {};

    var user = {};



    User.find(filter, function (err, results) {
        if (err || !results[0]) {
            response = {
                code: 1,
                message: 'Error en la búsqueda de usuarios',
                data: {}
            };
            return reply(response);
            //return reply(err);
        } else {
            user = results[0];
            user.password = 'umg123';
            _id = user._id;
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
                    message: 'Se reiniciado la contraseña, Por favor revise su correo.',
                    data: {}
                };
                return reply(response);
            });
        }
    });


}

module.exports = Handlers;
