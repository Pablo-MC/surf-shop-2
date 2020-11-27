const express = require('express');
const router = express.Router();

const { 
   getAllCategories, 
   getCategory,
   createCategory, 
   updateCategory,
   deleteCategory
} = require('../controllers/category.controller');

const { isAuthenticated, isAdmin, categoryById } = require('../middleware/auth');


router.get('/', getAllCategories ); 
router.get('/:categoryId', categoryById, getCategory ); 

router.post('/', [isAuthenticated, isAdmin], createCategory ); 

router.put('/:categoryId', [isAuthenticated, isAdmin, categoryById], updateCategory); 

router.delete('/:categoryId', [isAuthenticated, isAdmin, categoryById], deleteCategory); 

module.exports = router;