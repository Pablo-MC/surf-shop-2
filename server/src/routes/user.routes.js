// Enrutador de Usuarios: definición de las rutas del servidor que estan relacionadas con los Usuarios.

const express = require('express');
const router = express.Router();

const { 
   getUsers, 
   getUser, 
   deleteUser,
   updateUser,
} = require('../controllers/user.controller');


router.get('/', getUsers);
router.get('/:id', getUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;