"use strict"

const Promise 		= require('bluebird');
const fs 			= Promise.promisifyAll(require("fs"));
const path 			= require('path');
const store 		= require('store');


module.exports = {

	get: function(req) {

		var data = store.get(req.ip);
		return data;

	},
	theme_set: function(req) {

		var data = store.set(req.ip, { theme: req.query.theme })
		return data;

	},
	theme: function(req){

		var data 		= store.get(req.ip);
		return ( data  && data.theme ) ? ("/css/theme/" + data.theme) : "/node_modules/bootstrap/dist/css/bootstrap.min.css";

	},

	theme_list: function() {

		return fs.readdirAsync(path.join(__dirname, "../public/css/theme/"));

	},

}