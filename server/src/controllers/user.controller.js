import User from '../models/User';

export const getUsers = async function (req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getUserById = async function (req, res) {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateUserById = async function (req, res) {
  try {
    await User.findByIdAndUpdate(req.params.userId, req.body);
    res.json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteUserById = async function (req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);  // :userId  === req.params.userId
    res.json({ message: `User ${deletedUser.username} deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}