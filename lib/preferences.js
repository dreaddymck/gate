"use strict"

const Promise 		= require('bluebird');
const fs 			= Promise.promisifyAll(require("fs"));
const path 			= require('path');
const ms			= require('ms');

module.exports = {

	get: function(req, res) {

		return req.cookies.theme ? req.cookies.theme : "";

	},
	theme_set: function(app, req, res) {

		res.cookie('theme', req.query.theme,{
			maxAge: ms(app.config.session.expires),
			httpOnly: true
		});
		return true;

	},
	theme: function(req){

		return ( req.cookies.theme ) ? ("/css/theme/" + req.cookies.theme) : "/node_modules/bootstrap/dist/css/bootstrap.min.css";

	},

	theme_list: function() {

		return fs.readdirAsync(path.join(__dirname, "../public/css/theme/"));

	},

}