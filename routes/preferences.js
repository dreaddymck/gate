'use strict';

const preferences 	= require('../lib/preferences');

module.exports = function(app) {

	app.get ([ '/preferences/theme'], (req, res) => {

		res.send( preferences.theme_set(app, req,res) );
		return null;

	})

}
