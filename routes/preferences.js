'use strict';


module.exports = function(app) {

	app.get ([ '/preferences/theme'], (req, res) => {

		req.session.preferences = req.session.preferences ? req.session.preferences : {};

		req.session.preferences.theme = req.query.theme

		res.send(req.session.preferences);

	})

}
