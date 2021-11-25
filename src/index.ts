require('dotenv').config();
import 'module-alias/register';
import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { critterRouter } from '@/routes/critters';
import { updateRouter } from '@/routes/update';
const connectionString = process.env.MONGO_DB_CONN_STRING;

const app = express();
app.use(json());
app.use(critterRouter);
app.use(updateRouter);
if (connectionString) {
	mongoose.connect(connectionString);
}

app.listen(3000, () => {
	console.log('server is listening on port 3000');
});
