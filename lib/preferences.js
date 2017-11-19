"use strict"

const path 			= require('path');

module.exports = {

	theme: function(app,req){

		return ( req.user && req.user.preferences && req.user.preferences.theme ) ? ("/css/theme/" + req.user.preferences.theme) : "/node_modules/bootstrap/dist/css/bootstrap.min.css"

	},

	theme_list: function(app, req) {

		return fs.readdirAsync(path.join(__dirname, "../public/css/theme/"));

	},

}