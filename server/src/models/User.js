import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: 'user' },  // 'user' or 'admin'  
}, {
  timestamps: true,
  versionKey: false
});

export default model('User', userSchema, 'users');