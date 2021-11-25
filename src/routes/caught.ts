import express, { Request, Response } from 'express';
import { Caught } from '@/models/caught';
const router = express.Router();
var secured = require('../lib/middleware/secured');

router.get('/api/caught', secured(), async (req: any, res: Response) => {
	const caught = await Caught.find({});
	const { _raw, _json, ...userProfile } = req.user;
	console.log(userProfile.id);
	return res.status(200).send(caught);
});

router.post('/api/caught', async (req: Request, res: Response) => {
	const { name, description } = req.body;

	const createdCaught = Caught.create({ name, description });
	return res.status(201).send(createdCaught);
});

export { router as caughtRouter };
