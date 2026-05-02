const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || 'appro_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'change_me',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
  }
};
