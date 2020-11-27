const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
   username: String,
   email: String,
   password: String,
   roles: { type: String, default: 'user' }  // 'user' or 'admin'  
}, {
   timestamps: true,
   versionKey: false  
});

module.exports = mongoose.model('User', UserSchema, 'users');     
