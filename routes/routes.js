"use strict";

const Promise 		= require('bluebird');
const preferences 	= require("../lib/preferences")

module.exports = function(app) {


	app.get('/', (req, res) => {

		Promise.try(()=>{
			return preferences.theme_list();
		})
		.then((data)=>{
			res.render('index',{theme: data})
		})
		.catch((err)=>{
			res.render('index',{error: err})
		})
	})
}