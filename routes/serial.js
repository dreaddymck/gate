"use strict";

const serial 	= require('../lib/serial');

module.exports = function(app) {

	app.post('/serial/toggle', (req, res) => {
		serial.init();
		//res.send({response:true})
		res.redirect('/')
	})

}