import express, { Request, Response } from 'express';
var secured = require('../lib/middleware/secured');
var router = express.Router();
var ManagementClient = require('auth0').ManagementClient;

var management = new ManagementClient({
	token: process.env.AUTH0_V2_TOKEN_TEST,
	domain: process.env.AUTH0_DOMAIN,
});

router.get('/api/user', secured(), async function (req: any, res, next) {
	const { _raw, _json, ...userProfile } = req.user;
	const resp = await management.getUser({ id: userProfile.id });
	return res.status(200).send(resp);
});

router.put('/api/username', secured(), async (req: Request, res: Response) => {
	console.log(req);
	const { id, nickname } = req.body;
	const resp = await management.updateUser({ id }, { nickname });
	return res.status(200).send(resp);
});

module.exports = router;
