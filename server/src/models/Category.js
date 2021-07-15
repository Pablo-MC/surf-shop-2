import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
  name: String,
  description: String,
  // imageURL: String,
}, {
  timestamps: true,
  versionKey: false
});

export default model('Category', CategorySchema, 'categories');