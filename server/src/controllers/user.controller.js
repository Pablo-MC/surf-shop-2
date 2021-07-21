import User from '../models/User';

export const getUsers = async function (req, res) {
  try {
    const users = await User.find().sort({ _id: -1 }); // sort({ _id: -1 }) // asc === -1 | desc === 1
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getUserById = async function (req, res) {
  try {
    // console.log(req.params); // { userId: '60e73953e4a2db27502a06d7' }
    const user = await User.findById(req.params.userId).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateUserById = async function (req, res) {
  try {
    // await User.findByIdAndUpdate(req.params.userId, req.body);
    await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    res.status(200).json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteUserById = async function (req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);  // :userId  === req.params.userId
    res.status(200).json({ message: `User ${deletedUser.username} deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// export const changePassword = async function (req, res) {}