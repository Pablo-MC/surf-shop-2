// Seguir implementando para proyecto a futuro.
// import { Schema, model } from 'mongoose';

// const CartSchema = new Schema({
//   amount: {
//     type: Number,
//     default: 0,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'completed'],
//     default: 'pending',
//   },
//   products: [{ // ✅
//     product: {
//       ref: 'Product',
//       type: Schema.Types.ObjectId,
//       autopopulate: true,
//     },
//     quantity: {
//       type: Number,
//       default: 0 // 1 ✅
//     }
//   }],
//   user: { // ✅
//     ref: 'User',
//     type: Schema.Types.ObjectId,
//     autopopulate: true,
//     require: true,
//   },
// }, {
//   timestamps: true,
//   versionKey: false
// });

// CartSchema.plugin(require('mongoose-autopopulate'));

// export default model('Cart', CartSchema, 'carts');