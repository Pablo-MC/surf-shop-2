// import cloudinary from 'cloudinary';

const cloudinary = require('cloudinary').v2;

import fs from 'fs-extra'; // Módulo que permite eliminar archivos.

import Product from '../models/Product';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cada vez que hacemos una consulta a la base de datos debemos usar async/await
// req.params.productId -> retorna el valor del /:productId
// req.body -> retorna un objeto con la información que nos envia el cliente. 
// req.file -> retorna un objeto con la información que de la imagen cargada.

export const createProduct = async function (req, res) {
  try {
    // Validar la carga de la imagen. 
    if (req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
      res.status(400).json({ message: 'Image type not allowed' }); // Tipo de imagen no permitido  
      await fs.unlink(req.file.path);  // Eliminar imagen fallida del servidor (public/images/uploads)
      return;
    }
    // Crear Producto
    const product = new Product(req.body);
    // Subir imagen a Claudinary
    const imgInfo = await cloudinary.uploader.upload(req.file.path);  // console.log(imgInfo);
    // Agregar propiedades imageURL e imageId al producto
    product.imageURL = imgInfo.url;
    product.imageId = imgInfo.public_id;
    // Guardar producto en la Base de Datos 
    await product.save();

    // Eliminar la imagen del Servidor (public/images/uploads)
    await fs.unlink(req.file.path);

    res.status(201).json({ message: 'Product successfully created', product });
  } catch (error) {
    res.status(500).json({ message: error.message });  // SERVER ERROR
  }
}

export const getProducts = async function (req, res) {
  try {
    const products = await Product.find().sort({ _id: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getProductById = async function (req, res) {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getProductsByCategory = async function (req, res) {
  try {
    const products = await Product.find({ category: req.params.categoryId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Actualizar un Producto segun el id  (Se necesita el id y los nuevos datos del producto MENOS la imagen)
export const updateProductById = async function (req, res) {
  try {
    // { new: true } retorna el producto con los datos actualizados. De lo contrario retorna el producto anterior SIN los datos actualizados.
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    res.status(200).json({ message: 'Product successfull updated', updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const deleteProductById = async function (req, res) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
    // Eliminar la imagen del producto del hosting Cloudinary.
    // await cloudinary.uploader.destroy(deletedProduct.imageId);
    await cloudinary.uploader.destroy(deletedProduct.imageId);
    console.log('Pase la eliminacion de Claudinary!');
    res.status(200).json({ message: 'Product successfull deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}