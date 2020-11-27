const multer = require('multer');
const shortid = require('shortid');
const path = require('path');


const storage = multer.diskStorage({
   destination: 'public/images/uploads',  // nombre de la carpeta donde se van almacenar las imágenes. 
   filename: (req, file, cb) => {  // Hashear el nombre de las imágenes para que no se reemplacen.
      cb(null, shortid.generate() + path.extname(file.originalname));  // 'photo.jpg' --> 'kgv32v42w4.jpg'   . OBS: extname() extrae solo la extensión de la imágen. 
   }
});

module.exports = multer({storage});
