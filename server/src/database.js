// Conexión con la Base de Datos. OBS: utilización del módulo mongoose para conectarnos a MongoDB.
import mongoose from 'mongoose';

export const connectDB = async function () {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('DB is connected');
  } catch (error) {
    console.error(error);
  }
}