const Product = require('../models/Product');

const fs = require('fs-extra');  // Módulo que permite eliminar archivos.
const cloudinary = require('cloudinary');

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
});


// Cada vez que hacemos una consulta a la base de datos debemos usar async/await
// req.params.id -> retorna el valor del /:id
// req.body -> retorna un objeto en formato json con la información que nos envia el cliente. 


exports.createProduct = async (req, res) => {
   try {

      // console.log(req.body);  // console.log(req.file); 

      if (req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
         res.status(400).json({ message: 'Image type not allowed' }); // Tipo de imagen no permitido  
         await fs.unlink(req.file.path);  // Eliminar imagen fallida del servidor (public/images/uploads)
         return;
      }

      // Crear el Producto
      const product = new Product(req.body);

      // Subir imagen a Claudinary
      const imgInfo = await cloudinary.v2.uploader.upload(req.file.path);  // console.log(imgInfo);

      // Agrego la propiedad imageURL e imageId al producto
      product.imageURL = imgInfo.url;
      product.imageId = imgInfo.public_id;

      // console.log(product);

      await product.save();

      // Eliminar la imagen del Servidor (public/images/uploads)
      await fs.unlink(req.file.path);

      res.status(200).json({ message: 'Product successfully created', product });
   } catch (error) {
      res.status(500).json({ message: error.message });  // SERVER ERROR
   }
}


exports.getAllProducts = async (req, res) => {
   try {
      const products = await Product.find();
      res.status(200).json(products);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}


// Obtener producto según el id
exports.getProduct = async (req, res) => {
   try {
      const product = await Product.findById(req.params.id); // :id === id
      res.status(200).json(product);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}


// Obtener lista de productos filtrado por categoría
exports.getProductsCategory = async (req, res) => {
   try {
      const product = await Product.find({ category: req.params.id }); // :categories === categories
      res.status(200).json(product);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}


// Actualizar un Producto segun el id  (Se necesita el id y los nuevos datos del producto MENOS la imagen)
exports.updateProduct = async (req, res) => {
   try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });  // new: true retorna el producto con los datos actualizados. De lo contrario retorna el producto anterior sin los datos actualizados. 
      res.status(200).json({ message: 'Product successfullt updated', updatedProduct });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}


// Eliminar producto segun el id
exports.deleteProduct = async (req, res) => {
   try {
      const product = await Product.findByIdAndDelete(req.params.id);  // Elimina el producto de la Base de Datos.
      await cloudinary.v2.uploader.destroy(product.imageId);  // Elimina la imagen del producto del hosting Cloudinary. 
      res.status(200).json({ message: 'Product successfull deleted' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}