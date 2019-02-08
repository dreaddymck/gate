"use strict";

const serial 	= require('../lib/serial');

module.exports = function(app) {

	app.all('/serial/toggle', (req, res) => {
		serial.toggle(app).then((response)=>{
			console.log(response);
			res.send(response);
			return null;
		}).catch((e)=>{
			console.log(e);
			res.send(e);
			return null;
		});
	})

}