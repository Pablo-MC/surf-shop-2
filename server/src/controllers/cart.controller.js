// import Cart from '../models/Cart';

// export const createCart = async function (req, res) {
//   try {
//     const cart = new Cart();
//     await cart.save();
//     res.status(201).json({ message: 'Cart successfully created' })
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// export const getCarts = async function (req, res) {
//   try {
//     const carts = await Cart.find();
//     res.json(carts);
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }

// export const getCartByUserId = async function (req, res) {
//   try {
//     const cart = await Cart.find({ user: req.params.userId });
//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }