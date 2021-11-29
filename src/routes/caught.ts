import express, { Request, Response } from 'express';
import { Caught } from '@/models/caught';
const router = express.Router();

router.get('/api/caught', async (req: any, res: Response) => {
	const { _raw, _json, ...userProfile } = req.user;
	const caught = await Caught.find({ userId: userProfile.id });
	return res.status(200).send(caught);
});

router.post('/api/caught', async (req: any, res: Response) => {
	const { _raw, _json, ...userProfile } = req.user;
	const { id, ueid, name, critterType } = req.body;

	const createdCaught = await Caught.create({
		userId: userProfile.id,
		id,
		ueid,
		name,
		critterType,
		active: true,
	});
	return res.status(201).send(createdCaught);
});

router.delete('/api/caught', async (req: any, res: Response) => {
	const { _raw, _json, ...userProfile } = req.user;
	const { id, ueid } = req.body;

	await Caught.deleteOne({ userId: userProfile.id, id, ueid });
	return res.status(200).send('Deleted successfully');
});

export { router as caughtRouter };
