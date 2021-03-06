"use strict";

const express 		= require('express');
const helmet 		= require('helmet');
const morgan 		= require('morgan');
const path 			= require('path');
const ms 			= require('ms');
const os 			= require("os");
const cookieParser 	= require('cookie-parser');
const session 		= require('cookie-session');
const config 		= require('./config.json');
const package_json  = require('./package.json');
const preferences 	= require('./lib/preferences');

const app 			= express();

app.config 			= config;

app.set('trust proxy');
app.set("view engine", "pug");
app.set("/", path.join(__dirname, "views"));

app.use(express.static('public'))
app.use('/node_modules', express.static(__dirname + '/node_modules/'));

app.use(morgan('tiny', {}));
if (app.get('env') === 'development') {
	app.use(morgan('dev'));
}
app.use(helmet()); // protect api from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(cookieParser(config.session.secret,{
	domain: os.hostname() + ':' + app.config.port, //for session conflict?
	maxAge: ms(app.config.session.expires),
}));
app.use(session({
	secret: config.session.secret,
	name: os.hostname() + ':' + app.config.port, //for session conflict?
	cookie: {
		maxAge: ms(app.config.session.expires),
	}
}));
app.use(function (req, res, next) {
	res.locals.user				= req.user;
	res.locals.prevdata 		= req.body;
	res.locals.appname  		= app.config.appname;
	res.locals.support  		= app.config.support;
	res.locals.image  			= app.config.image;
	res.locals.package_json		= package_json;
	res.locals.basedir      	= path.join(__dirname, 'node_modules'); // pug bootstrap
	res.locals.preferences		= preferences.get(app, req, res);
	res.locals.theme_css		= preferences.theme(app, req, res);
	next();
});



require('./routes')(app);

app.listen( app.config.port, () => console.log( app.config.appname + ' listening on port: ' + app.config.port ))