/**
 * Module dependencies.
 */

var express = require('express'),
    cookie = require('express/node_modules/cookie'),
    connect = require('express/node_modules/connect'),
    db = require('./db'),
    routes = require('./routes'),
    user = require('./routes/user'),
    account = require('./routes/account'),
    operation = require('./routes/operation'),
    token = require('./routes/token'),
    http = require('http'),
    path = require('path');

var app = express(),
    server = http.createServer(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));

// Allow parsing cookies from request headers
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());

//Allow Cross Domain in order to develop easily front and back separately
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT ,POST, DELETE, OPTIONS");
    next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//Middleware for authentication
function requireLogin (req, res, next) {
    token.exists(req, res, next);
}

function requireAdmin (req, res, next) {
    token.isAdmin(req, res, next);
}

app.options('*', function(req, res){
    res.send( 200 );
});


//Routing
app.get('/', routes.index);

app.post('/login', user.login);
app.get('/logout', user.logout);

//TODO : remove this
app.get('/tokens', token.list);

// Everything about users
app.get('/users', requireAdmin, user.list);
app.get('/users/:id', requireLogin, user.findById);
app.get('/users/login/:login', requireLogin, user.findOne);
app.post('/users', requireAdmin, user.create);
app.put('/users/:id', requireAdmin, user.update);
app.delete('/users/:id', requireAdmin, user.delete);

app.get('/accounts', requireLogin, account.list);
app.get('/accounts/:id', requireLogin, account.findById);
app.get('/accounts/user/:login', requireLogin, account.find);
app.get('/accounts/number/:number',  requireLogin, account.findOne);
app.post('/accounts', requireAdmin, account.create);
app.put('/accounts/:id', requireLogin, account.update);
app.delete('/accounts/:id', requireAdmin, account.delete);

app.get('/operations', requireLogin, operation.list);
app.post('/operations', requireLogin, operation.create);
app.get('/operations/account/:account', requireLogin, operation.find);
app.put('/operations/:id', requireAdmin, operation.update);


//Start server
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
