import mongoose from 'mongoose';

interface IFish {
	title: string;
	description: string;
}

interface fishModelInterface extends mongoose.Model<FishDoc> {
	build(attr: IFish): FishDoc;
}

interface FishDoc extends mongoose.Document {
	title: string;
	description: string;
}

const fishSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

fishSchema.statics.build = (attr: IFish) => {
	return new Fish(attr);
};

const Fish = mongoose.model<FishDoc, fishModelInterface>('Fish', fishSchema);

Fish.build({
	title: 'some title',
	description: 'some description',
});

export { Fish };
