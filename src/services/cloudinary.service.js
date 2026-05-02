const cloudinary = require('../config/cloudinary');
const ApiError = require('../utils/apiError');
const HttpStatus = require('../enums/http-status.enum');
const ErrorMessages = require('../enums/error-messages.enum');
const env = require('../config/env');

class CloudinaryService {
  async uploadImage(fileBuffer, folder = 'produits') {
    if (!fileBuffer) throw new ApiError(HttpStatus.BAD_REQUEST, ErrorMessages.IMAGE_REQUISE);
    if (!env.cloudinary.cloudName || !env.cloudinary.apiKey || !env.cloudinary.apiSecret) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Configuration Cloudinary manquante dans .env');
    }

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
        if (error) {
          const cloudinaryMessage = error?.error?.message || error?.message;
          if (cloudinaryMessage) {
            return reject(
              new ApiError(
                HttpStatus.BAD_REQUEST,
                `Echec upload Cloudinary: ${cloudinaryMessage}`
              )
            );
          }
          return reject(new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, ErrorMessages.ECHEC_UPLOAD_CLOUDINARY));
        }
        return resolve(result.secure_url);
      });

      stream.end(fileBuffer);
    });
  }

  extractPublicIdFromUrl(imageUrl) {
    try {
      const parsed = new URL(imageUrl);
      const parts = parsed.pathname.split('/').filter(Boolean);
      const uploadIndex = parts.findIndex((part) => part === 'upload');
      if (uploadIndex === -1) return null;

      const afterUpload = parts.slice(uploadIndex + 1);
      if (!afterUpload.length) return null;

      const noVersion = afterUpload[0].startsWith('v') ? afterUpload.slice(1) : afterUpload;
      if (!noVersion.length) return null;

      const last = noVersion[noVersion.length - 1];
      const lastNoExt = last.includes('.') ? last.substring(0, last.lastIndexOf('.')) : last;
      const publicIdParts = [...noVersion.slice(0, -1), lastNoExt];
      return publicIdParts.join('/');
    } catch (error) {
      return null;
    }
  }

  async deleteImageByUrl(imageUrl) {
    const publicId = this.extractPublicIdFromUrl(imageUrl);
    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
  }
}

module.exports = new CloudinaryService();
