const HttpStatus = require('../enums/http-status.enum');
const ErrorMessages = require('../enums/error-messages.enum');

class ErrorMiddleware {
  handle(err, req, res, next) {
    if (err.name === 'PrismaClientValidationError') {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Erreur de validation des donnees',
        errors: [{ message: err.message }]
      });
    }

    if (err.code === 'P2002') {
      return res.status(HttpStatus.CONFLICT).json({
        success: false,
        message: 'Conflit: une valeur unique existe deja'
      });
    }

    if (err.code === 'P2003') {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Reference invalide vers une ressource inexistante'
      });
    }

    const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || ErrorMessages.ERREUR_INTERNE;

    return res.status(statusCode).json({
      success: false,
      message
    });
  }
}

module.exports = new ErrorMiddleware();
