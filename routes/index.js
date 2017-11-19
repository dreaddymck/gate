module.exports = function(app) {
	/*
	 * load our routes in sequence.
	 * pass in app and fully configured passport
	 * debug last
	 *
	 */
	require('./preferences')(app);
	require('./routes')(app);
	require('./serial')(app);

}