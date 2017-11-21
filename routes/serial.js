"use strict";

const serial 	= require('../lib/serial');

module.exports = function(app) {

	app.all('/serial/toggle', (req, res) => {
		serial.init().then((response)=>{
			res.send(response)
		}).catch((e)=>{
			res.send(e)
		});
	})

}