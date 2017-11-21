"use strict";

const Promise 		= require('bluebird');
const preferences 	= require("../lib/preferences")

module.exports = function(app) {


	app.get('/', (req, res) => {

		if(app.config.redirect){
			res.writeHead(302, {
				  'Location': app.config.redirect
				});
				res.end();
				return null
		}

		Promise.try(()=>{
			return preferences.theme_list();
		})
		.then((data)=>{
			res.render('index',{theme: data})
			return null;
		})
		.catch((err)=>{
			res.render('index',{error: err})
			return null;
		})
	})
}