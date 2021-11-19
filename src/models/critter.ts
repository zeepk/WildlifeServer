import mongoose from 'mongoose';

interface ICritter {
	title: string;
	description: string;
}

interface critterModelInterface extends mongoose.Model<critterDoc> {
	build(attr: ICritter): critterDoc;
}

interface critterDoc extends mongoose.Document {
	title: string;
	description: string;
}

const critterSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

critterSchema.statics.build = (attr: ICritter) => {
	return new Critter(attr);
};

const Critter = mongoose.model<critterDoc, critterModelInterface>(
	'critter',
	critterSchema
);

Critter.build({
	title: 'some title',
	description: 'some description',
});

export { Critter };
