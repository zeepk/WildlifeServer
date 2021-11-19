import express, { Request, Response } from 'express';
import { Fish } from '../models/fish';

const router = express.Router();

router.get('/api/fish', async (req: Request, res: Response) => {
	const fish = await Fish.find({});
	return res.status(200).send(fish);
});

router.post('/api/fish', async (req: Request, res: Response) => {
	const { title, description } = req.body;

	const fish = Fish.build({ title, description });
	await fish.save();
	return res.status(201).send(fish);
});

export { router as fishRouter };
