// routes/users.js

var express = require('express');
var secured = require('../lib/middleware/secured');
var router = express.Router();

/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {
	const { _raw, _json, ...userProfile } = req.user;
	// res.render('user', {
	// 	userProfile: JSON.stringify(userProfile, null, 2),
	// 	title: 'Profile page',
	// });
	console.log(userProfile.id);
	return res.status(200).send(userProfile);
});

module.exports = router;
