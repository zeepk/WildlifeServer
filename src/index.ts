import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { json } from 'body-parser';
import { critterRouter } from './routes/critter';

const app = express();
app.use(json());
app.use(critterRouter);

mongoose.connect('test');

app.listen(3000, () => {
	console.log('server is listening on port 3000');
});
