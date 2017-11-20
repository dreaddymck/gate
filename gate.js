"use strict";

const express 	= require('express');
const helmet 	= require('helmet');
const morgan 	= require('morgan');
const path 		= require('path');
const fqdn 		= require('node-fqdn');
const session 	= require('cookie-session');
const config 	= require('./config.json');

const app 		= express();

app.config 		= config;

app.set('trust proxy');
app.set("view engine", "pug");
app.set("/", path.join(__dirname, "views"));

app.use(morgan('tiny', {}));
if (app.get('env') === 'development') {
	app.use(morgan('dev'));
}
app.use(helmet()); // protect api from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(express.static('public'))
app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use(session({
	secret: config.session.secret,
	name: fqdn() + ':' + app.config.port, //for session conflict?
	resave: false,
	saveUninitialized: false,
	cookie: {
        secureProxy: true,
        httpOnly: true,
		maxAge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
	},
}));
app.use(function (req, res, next) {
	res.locals.user				= req.user;
	res.locals.prevdata 		= req.body;
	res.locals.appname  		= app.config.appname;
	res.locals.support  		= app.config.support;
	res.locals.basedir      	= path.join(__dirname, 'node_modules'); // pug bootstrap
	res.locals.preferences		= req.session.preferences ? req.session.preferences : "";
	res.locals.theme_css		= (req.session.preferences && req.session.preferences.theme) ? "/css/theme/" + req.session.preferences.theme : "/node_modules/bootstrap/dist/css/bootstrap.min.css"
	next();
});

require('./routes')(app);

app.listen( app.config.port, () => console.log( app.config.appname + ' listening on port: ' + app.config.port ))