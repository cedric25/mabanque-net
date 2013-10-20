var mongoose = require( 'mongoose'),
    crypto = require( 'crypto'),
    uuid = require('node-uuid');
var Schema   = mongoose.Schema;

// Create schema to store in the database
var Schema = mongoose.Schema;

var User = new Schema({
    login: {type: Number, required: true, unique: true},
    passwordHash: {type: String, required: true},
    salt: { type: String, required: true, default: uuid.v1 },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    admin: {type: Boolean, required: true, default: false}
});

//password encryption
var hash = function(passwd, salt) {
    return crypto.createHmac('sha256', salt).update(passwd).digest('hex');
};

User.methods.setPassword = function(passwordString) {
    this.passwordHash = hash(passwordString, this.salt);
};

User.methods.isValidPassword = function(passwordString) {
    return this.passwordHash === hash(passwordString, this.salt);
};

var Token = new Schema({
    token: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, index: {expires: '10m'}},
    admin: {type: Boolean, default: false}
});

var Account = new Schema({
    number: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    ownerLogin: {type: Number, required: true},
    balance: {type: Number, default: 0}
});

var Operation = new Schema({
    date: {type: Date, default: Date.now},
    reason: {type: String, required: true},
    accountNumber: {type: Number, required: true},
    amount: {type: Number, required: true}
});

var UserModel = mongoose.model('User', User);
var AccountModel = mongoose.model('Account', Account);
var OperationModel = mongoose.model('Operation', Operation);
var TokenModel = mongoose.model('Token', Token);

// MongoDB en local
mongoose.connect('mongodb://localhost/bank');

// MongoDB sur mongolab
// Devient instable au bout d'un certain nombre de requêtes, sans doute dû aux limitations de la version gratuite...
//mongoose.connect('mongodb://bank:bank@ds051658.mongolab.com:51658/bank');
