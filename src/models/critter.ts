import { Document, Schema, model } from 'mongoose';
export interface ICritter extends Document {
	name: string;
	description: string;
}

const CritterSchema = new Schema<ICritter>(
	{
		name: String,
		description: String,
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
	},
);

export const Critter = model<ICritter>('Critter', CritterSchema);
