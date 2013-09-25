var mongoose = require( 'mongoose' );
var AccountModel = mongoose.model('Account');

// list all accounts
exports.list = function(req, res){

    return AccountModel.find(function(err, accounts){

        if(err) {
            return console.log(err);

        } else {

            //console.log(accounts);
            return res.send(accounts);
        }

    });

};


// create a user
exports.create = function(req, res) {

    return new AccountModel({
        name: req.body.name,
        balance: req.body.balance,
        number: req.body.number,
        ownerLogin: req.body.ownerLogin

    }).save(function(err, account){

        if(err) {
            return console.log(err);

        } else {
            return res.send(200);
        }

    });
};

// get a user
exports.find = function(req, res) {

    return AccountModel.find({'ownerLogin': req.params.login}, function(err, accounts){

        if(err) {
            return res.send(err);

        } else {

            return res.send(accounts);
        }

    });

};

exports.findById = function(req, res) {

    return AccountModel.findById(req.params.id, function(err, account){

        if(err) {
            return res.send(err);

        } else {

            return res.send(account);
        }

    });

};


exports.findOne = function(req, res) {

    return AccountModel.findOne({'number': req.params.number}, function(err, account){

        if(err) {
            return res.send(err);

        } else {

            return res.send(account);
        }

    });

};

exports.delete = function(req, res) {

    return AccountModel.findById(req.params.id, function(err, account){

        if(err) {

            return console.log(err);

        } else if(account) {

            return account.remove(function(error){

                console.log('removed');
                return res.send(200);

            });

        } else {

            return res.send('the user does not exist');
        }

    });

};

exports.deleteFromUser = function(ownerLogin, res) {

    return AccountModel.find({'ownerLogin': ownerLogin}, function(err, accounts){

        if(err) {

            console.log(err);
            return res.send(500);

        } else if(accounts) {

            for (var account in accounts) {

                accounts[account].remove(function(error, acc){

                    console.log(acc + 'removed');

                });
            }

        } else {

            return res.send(404);
        }

        return res.send(200);

    });

};


exports.update = function(req, res) {

    return AccountModel.findById(req.params.id, function(err, account){

        if(err) {
            return console.log(err);

        } else if(account){

            if(req.body.number) {
                account.number = req.body.number;
            }

            if(req.body.name) {
                account.name = req.body.name;
            }

            if(req.body.balance) {
                account.balance = req.body.balance;
            }

            account.save(function(error, acc){

                if(error) {
                    return console.log(error);

                } else {

                    console.log('account updated');

                    return res.send(acc);
                }

            });

        }

    });

};

exports.updateById = function(req, res) {

    return AccountModel.findById(req.params.id, function(err, account) {
        if(err) {
            return console.log(err);

        } else if(account){

            if(req.body.number) {
                account.number = req.body.number;
            }

            if(req.body.name) {
                account.name = req.body.name;
            }

            if(req.body.balance) {
                account.balance = req.body.balance;
            }

            account.save(function(error, acc){

                if(error) {
                    return console.log(error);

                } else {

                    console.log('account updated');

                    return res.send(acc);
                }

            });

        }
    });

};
