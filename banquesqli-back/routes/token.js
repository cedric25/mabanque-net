var mongoose = require( 'mongoose' );
var TokenModel = mongoose.model('Token');

exports.exists = function(req, res, next) {
    
    var token = req.query.token || req.body.token;
    
    return TokenModel.findOne({token: token}, function(err, token){

        if(err) {
            return res.send({authenticated: false});

        } else if(token){

            return next();

        } else {

            return res.send({authenticated: false});
        }

    });
};

exports.isAdmin = function(req, res, next) {

    var token = req.query.token || req.body.token;

    return TokenModel.findOne({token: token}, function(err, token){

        if(err) {
            return res.send({authorized: false});

        } else if(token && token.admin){

            return next();

        } else {

            return res.send({authorized: false});
        }

    });


};

exports.list = function(req, res) {

    return TokenModel.find(function(err, tokens){

        if(err) {
            console.log(err);
            return res.send(err);

        } else {

            console.log(tokens);
            return res.send(tokens);
        }

    });

};