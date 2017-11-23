"use strict";

const serial 	= require('../lib/serial');

module.exports = function(app) {

	app.all('/serial/toggle', (req, res) => {
		serial.init(app).then((response)=>{
			res.send(response)
			return null;
		}).catch((e)=>{
			res.send(e)
			return null;
		});
	})

}