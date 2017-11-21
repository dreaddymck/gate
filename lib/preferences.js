"use strict"

const Promise 		= require('bluebird');
const fs 			= Promise.promisifyAll(require("fs"));
const path 			= require('path');
const ms			= require('ms');
const fqdn 			= require('node-fqdn');

module.exports = {

	get: function(app, req, res) {

		var name = module.exports.theme_cookie_name(app)

		return req.cookies[name] ? req.cookies[name] : "";

	},
	theme_set: function(app, req, res) {

		var name = module.exports.theme_cookie_name(app)

		res.cookie(name, req.query.theme,{
			maxAge: ms(app.config.session.expires),
			httpOnly: true
		});
		return true;

	},
	theme_cookie_name: function(app){

		return fqdn() + ':' + app.config.port + '-theme'
	},
	theme: function(app, req){

		var name = module.exports.theme_cookie_name(app)

		return ( req.cookies[name] ) ? ("/css/theme/" + req.cookies[name]) : "/node_modules/bootstrap/dist/css/bootstrap.min.css";

	},

	theme_list: function() {

		return fs.readdirAsync(path.join(__dirname, "../public/css/theme/"));

	},

}