const multer = require('multer');

class UploadMiddleware {
  constructor() {
    const storage = multer.memoryStorage();
    this.uploader = multer({
      storage,
      limits: { fileSize: 5 * 1024 * 1024 }
    });
  }

  singleImage(fieldName = 'image') {
    return this.uploader.single(fieldName);
  }
}

module.exports = new UploadMiddleware();
