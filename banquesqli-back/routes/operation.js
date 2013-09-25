var mongoose = require( 'mongoose' );
var OperationModel = mongoose.model('Operation');

// list all accounts
exports.list = function(req, res){

    return OperationModel.find(function(err, operations){

        if(err) {
            console.log(err);
            return res.send(err);

        } else {

            //console.log(operations);
            return res.send(operations);
        }

    });

};


// create an account
exports.create = function(req, res) {

    return new OperationModel({
        accountNumber: req.body.accountNumber,
        amount: req.body.amount,
        reason: req.body.reason

    }).save(function(err, account){

            if(err) {
                return res.send(err);

            } else {
                return res.send(account);
            }

        });

};

// get a user
exports.find = function(req, res) {

    return OperationModel.find({'accountNumber': req.params.account}, function(err, account){

        if(err) {
            return res.send(err);

        } else {

            return res.send(account);
        }

    });

};

exports.delete = function(req, res) {

    return OperationModel.findById(req.params.id , function(err, operation){

        if(err) {

            return res.send(err);

        } else if(operation) {

            return operation.remove(function(error){

                console.log(error || 'removed');
                return res.send(error ||200);

            });

        } else {

            return res.send('the operation does not exist');
        }

    });

};


exports.update = function(req, res) {

    return OperationModel.findById(req.params.id, function(err, operation){

        if(err) {
            return console.log(err);

        } else if(operation){

            if(req.body.accountNumber) {
                operation.accountNumber= req.body.accountNumber
            }

            if(req.body.amount) {
                operation.amount = req.body.amount;
            }

            if(req.body.reason) {
                operation.reason = req.body.reason;
            }

            operation.save(function(error, op){

                if(error) {
                    return console.log(error);

                } else {

                    console.log('operation updated');

                    return res.send(op);
                }

            });

        }

    });

};
