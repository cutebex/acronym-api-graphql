import { model, Schema, Document } from 'mongoose';
import { Acronym } from '@interfaces/acronym.interface';

const acronymSchema: Schema = new Schema({
  acronym: {
    type: String,
    required: true,
    unique: true,
  },
  definition: {
    type: String,
    required: true,
  },
});

const userModel = model<Acronym & Document>('Acronym', acronymSchema);

export default userModel;
