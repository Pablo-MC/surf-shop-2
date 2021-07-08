// Modelo de Productos. Colección 'products'.
import { Schema, model } from 'mongoose';

const productSchema = new Schema({
   name: String,
   description: String,
   imageURL: String,  // URL image Cloudinary
   imageId: String,   // id image Cloudinary
   price: Number,
   stock: Number,
   shipping: { type: Boolean, default: false },
   sold: { type: Number, default: 0 },
   category: {  // Relación entre dos colecciones (products y categories).
      ref: 'Category',
      type: Schema.Types.ObjectId, // Guarda una relación a traves de ids. (_id)
      autopopulate: true, // Muestra el objeto referenciado completo. 
      required: true // Required === campo obligatorio
   },
}, {
   timestamps: true,  // Agrega la fecha de creación (createdAt) y de actualización (updatedAt). 
   versionKey: false  // Uculta el key '__v:0'.  
});

productSchema.plugin(require('mongoose-autopopulate'));

export default model('Product', productSchema, 'products');


/*

// Schema() permite definir los campos y el formato que tendrán los datos.
// model() permite crear un modelo de dicho Schema para que MongoDB pueda interactuar con dicho modelo (consultar datos, actualizarlos, guardarlos, etc)

'Product' es el nombre del modelo.
 productSchema es el modelo del cual 'Product' va a estar basado.
'products' es el nombre de la colección que se va a registrar en la Base de Datos.

unique: true -> determina que no puede haber dos emails/username iguales.
minlength: 5 -> determina que el campo debe tener un mínimo de 5 caracteres.

createdAt: { type: Date, default: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)) }
updatedAt: { type: Date, default: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)) }

*/