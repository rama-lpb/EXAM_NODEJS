const fournisseurRepository = require('../repositories/fournisseur.repository');
const ApiError = require('../utils/apiError');
const HttpStatus = require('../enums/http-status.enum');
const ErrorMessages = require('../enums/error-messages.enum');

class FournisseurService {
  create(data) {
    return fournisseurRepository.create(data);
  }

  findAll() {
    return fournisseurRepository.findAll();
  }

  async findById(id) {
    const fournisseur = await fournisseurRepository.findById(id);
    if (!fournisseur) throw new ApiError(HttpStatus.NOT_FOUND, ErrorMessages.FOURNISSEUR_NON_TROUVE);
    return fournisseur;
  }

  async update(id, data) {
    const updated = await fournisseurRepository.update(id, data);
    if (!updated) throw new ApiError(HttpStatus.NOT_FOUND, ErrorMessages.FOURNISSEUR_NON_TROUVE);
    return updated;
  }

  async delete(id) {
    const deleted = await fournisseurRepository.delete(id);
    if (!deleted) throw new ApiError(HttpStatus.NOT_FOUND, ErrorMessages.FOURNISSEUR_NON_TROUVE);
    return deleted;
  }
}

module.exports = new FournisseurService();
