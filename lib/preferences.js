"use strict"

const Promise 		= require('bluebird');
const fs 			= Promise.promisifyAll(require("fs"));
const path 			= require('path');

module.exports = {

	theme: function(app,req){

		return ( req.session.preferences  && req.session.preferences.theme ) ? ("/css/theme/" + req.session.preferences.theme) : "/node_modules/bootstrap/dist/css/bootstrap.min.css"

	},

	theme_list: function(app, req) {

		return fs.readdirAsync(path.join(__dirname, "../public/css/theme/"));

	},

}