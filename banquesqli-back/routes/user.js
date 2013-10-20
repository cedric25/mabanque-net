
/*
 * GET users listing.
 */

var mongoose = require( 'mongoose' );
var UserModel = mongoose.model('User');
var accounts = require('./account');
var TokenModel = mongoose.model('Token');
var uuid = require('node-uuid');

// list all users
exports.list = function(req, res){

    return UserModel.find(function(err, users){

        if(err) {
            console.log(err);
            return res.send(err);

        } else {

            //console.log(users);
            return res.send(users);
        }

    });

};


// create a user
exports.create = function(req, res) {

    var user = new UserModel({
        login: req.body.login,
        passwordHash: '',
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        admin: req.body.admin

    });

    user.setPassword(req.body.password);

    user.save(function(err, user){

        if(err) {
            console.log(err);
            return res.send(err);

        } else {
            console.log(user);
            return res.send(200);
        }

    });

};

exports.findById = function(req, res) {

    return UserModel.findById(req.params.id, function(err, user) {

        if(err) {
            return res.send(404);

        } else {

            return res.send(user);
        }

    });

};

// get a user
exports.findOne = function(req, res) {

    return UserModel.findOne({'login': req.params.login}, function(err, user){

        if(err) {
            return res.send('There was a mistake');

        } else {

            return res.send(user);
        }

    });

};

exports.login = function(req, res) {
    
    var auth = false;

    return UserModel.findOne({'login': req.body.login}, function(err, user){

        if(user){

            auth = user.isValidPassword(req.body.password);
        }

        if(typeof user != 'undefined' && auth) {

            var token = uuid.v4();

            var admin = user.admin;

            new TokenModel({
                token : token,
                admin: admin

            }).save(function(err, token){
                if(!err) {
                    res.send(token);
                }
            });

            return res.send({authenticated: auth, login: req.body.login, token: token, _id: user._id});

        } else {

            return res.send({authenticated: false});
        }
    });

};


exports.logout = function(req, res) {

    return TokenModel.findOne({'token': req.query.token}, function(err, token){

        if(err) {

            console.log(err);
            return res.send(err);

        } else if(token) {

            return token.remove(function(error){

                console.log('logout');
                return res.send(200);

            });

        } else {

            return res.send('the token does not exist');
        }

    });

};

exports.delete = function(req, res) {

    return UserModel.findById(req.params.id, function(err, user){

        if(err) {

            console.log(err);
            return res.send(err);

        } else if(user) {

            accounts.deleteFromUser(user.login, res);

            return user.remove(function(error){

                return res.send(200);

            });

        } else {

            return res.send('the user does not exist');
        }

    });

};


exports.update = function(req, res) {

    return UserModel.findById(req.params.id, function(err, user){

        if(err) {
            console.log(err);
            res.send(err);


        } else if(user){

            if(req.body.login) {
                user.login = req.body.login;
            }

            if(req.body.password && req.body.password != '') {
                user.setPassword(req.body.password);
            }

            if(req.body.firstName) {
                user.firstName = req.body.firstName;
            }

            if(req.body.lastName) {
                user.lastName = req.body.lastName;
            }

            if(typeof req.body.admin !== 'undefined') {
                user.admin = req.body.admin;
            }

            user.save(function(error, user){

                if(error) {
                    console.log(err);
                    return res.send(err);

                } else {

                    console.log('user updated');

                    return res.send(user);
                }

            });

        }

    });

};
