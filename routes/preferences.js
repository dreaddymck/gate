'use strict';


module.exports = function(app) {

	app.get ([ '/preferences/theme'], (req, res) => {

		req.user.preferences 		= req.user.preferences ? req.user.preferences : {};
		req.user.preferences.theme 	= req.query.theme

		console.log(req.user)

//		Promise.try(()=>{
//			return req.user.updatePreferences(req.user)
//		}).done((data)=>{
//			res.send(data)
//		})

	})

}
