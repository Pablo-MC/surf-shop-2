import Category from '../models/Category';

export const createCategory = async function (req, res) {
  try {
    const { name } = req.body;

    const category = await Category.findOne({ name });
    if (category) return res.status(403).json({ message: 'Category already exist' });

    const newCategory = new Category({ name: name });

    await newCategory.save();
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getAllCategories = async function (req, res) {
  try {
    let categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Obtener categoria por id
export const getCategory = async function (req, res) {
  res.json(req.category);
}

export const updateCategory = async function (req, res) {
  try {
    let category = req.category;
    const { name } = req.body;

    if (name) category.name = name.trim();

    category = await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteCategory = async function (req, res) {
  try {
    let category = req.category;

    let deleteCategory = await category.remove();

    res.json({ message: `${deleteCategory.name} deleted sucessfully` })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}