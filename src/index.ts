import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { json } from 'body-parser';
import { fishRouter } from './routes/fish';

const app = express();
app.use(json());
app.use(fishRouter);

mongoose.connect('test');

app.listen(3000, () => {
	console.log('server is listening on port 3000');
});
