import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    // maxlength: 32,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    // trim: true,
    // match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  },
  password: {
    type: String,
    required: true,
    // select: false, // select: false -> El password nunca se enviará al cliente. NUNCA PONER ESTOOO!!!
  },
  avatar: {
    type: String, // url del avatar.
    default: 'avatar.png',
  },
  role: {
    type: String,
    default: 'user', // 'user' or 'admin'
    // enum: ['user', 'admin'],
  },
  cart: {
    type: Array,
    default: [],
  },
  // phoneNumber: {
  //   type: Number,
  //   default: 0,
  // },
  // history: {
  //   type: Array,
  //   default: [],
  // },
}, {
  timestamps: true,
  versionKey: false
});

export default model('User', UserSchema, 'users');

// OBS: En la base de datos no guardamos archivos de imagen, etc. En ese caso guardamos como string la url del archivo.