import { Document, Schema, model } from 'mongoose';
import { critterTypes } from '@/utils/constants';
export interface ICaught extends Document {
	userId: string;
	ueid: string;
	name: string;
	active: boolean;
	critterType: string | undefined;
}

const CaughtSchema = new Schema<ICaught>(
	{
		userId: String,
		ueid: String,
		name: String,
		active: Boolean,
		critterType: {
			type: String,
			enum: critterTypes,
			default: critterTypes.FISH,
		},
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
	}
);

export const Caught = model<ICaught>('Caught', CaughtSchema);
