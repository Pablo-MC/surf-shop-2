const express = require('express');
const router = express.Router();

const { 
   getAuthenticatedUser, 
   register, 
   login 
} = require('../controllers/auth.controller');

const { isAuthenticated } = require('../middleware/auth');


router.get('/', isAuthenticated, getAuthenticatedUser); 

router.post('/register', register);
router.post('/login', login);

module.exports = router;