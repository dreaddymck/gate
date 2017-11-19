"use strict";

const preferences = require("../lib/preferences")

module.exports = function(app) {


	app.get('/', (req, res) => {

		new Promise(function(resolve, reject){
			return preferences.theme_list();
		})
		.then((response)=>{
			console.log(response);
			res.render('index',{response: response})
		})
		.catch((err)=>{
			res.render('index')
		})

	})


}