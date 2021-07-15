import User from '../models/User';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async function (req, res) {
  try {
    const { username, email, password } = req.body;

    // Revisar en la Base de Datos que no haya un usuario registrado con el mismo email.
    const emailExist = await User.findOne({ email: email }); // Retorna un objeto completo o vacio
    if (emailExist) return res.status(400).json({ message: 'User already exists' });

    // Hashear el password del Usuario
    const salt = await bcryptjs.genSalt(10);  // Genero un hash aleatorio. Repeticion del algoritmo: 10 
    const passwordHash = await bcryptjs.hash(password, salt);  // Hasheo el password del usuario.

    // Crear Usuario
    const newUser = new User({
      username: username,
      email: email,
      password: passwordHash,
    });

    // Guardar Usuario en la Base de datos
    await newUser.save();

    res.status(200).json({ message: 'Successful registration! 😀' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const login = async function (req, res) {
  try {
    const { email, password } = req.body;

    // Verificar si es un usuario que ya esta registrado.
    const user = await User.findOne({ email: email }); // Retorna un objeto (true) ó null (false).
    if (!user) return res.status(400).json({ message: 'The user not exist' });

    // Verificar si el password que nos envía el usuario matchea con el password del usuario registrado.
    const matchPassword = await bcryptjs.compare(password, user.password); // Retorna un boolean. 
    if (!matchPassword) return res.status(400).json({ message: 'Invalid password' });

    // Crear el Token. sign() recibe tres argumentos:
    //1). Dato que se va guardar adentro del Token. (en este caso: el dato es el id del usuario). 
    //2). Palabra secreta que se va a utilizar para cifrar el dato del Token.
    //3). Tiempo de expiración del Token. (Opcional) -> Ej: 24hs = 86400 seg. 
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 86400 // 24hs });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Enviar el token al cliente que será almacenado en el LocalStorage. 
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getAuthenticatedUser = async function (req, res) {
  try {
    // Retorna el usuario referente al id pasado por parametro SIN el password.
    const userAuth = await User.findById(req.userId).select('-password');
    res.status(200).json({ userAuth: userAuth });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}