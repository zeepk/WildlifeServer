import express, { Request, Response } from 'express';
import { Critter } from '@/models/critter';

const router = express.Router();

router.get('/api/critter', async (req: Request, res: Response) => {
	const critters = await Critter.find({});
	return res.status(200).send(critters);
});

router.post('/api/critter', async (req: Request, res: Response) => {
	const { name, description } = req.body;

	const createdCritter = Critter.create({ name, description });
	return res.status(201).send(createdCritter);
});

export { router as critterRouter };
