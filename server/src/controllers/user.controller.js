const User = require('../models/User');


exports.getUsers = async (req, res) => {
   try {
      const users = await User.find();
      res.json(users);         
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

exports.getUser = async (req, res) => {
   try {
      const user = await User.findById(req.params.id).select('-password');  // retorno los datos del usuario menos el password por cuestiones de seguridad. 
      res.json(user);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

exports.updateUser = async (req, res) => {
   try {
      await User.findByIdAndUpdate(req.params.id, req.body);
      res.json({ message: 'User update' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

exports.deleteUser = async (req, res) => {
   try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);  // :id  === id
      res.json({ message: `User ${deletedUser.username} deleted` });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}