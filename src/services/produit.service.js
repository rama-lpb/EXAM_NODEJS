const prisma = require('../config/prisma');
const produitRepository = require('../repositories/produit.repository');
const cloudinaryService = require('./cloudinary.service');
const ApiError = require('../utils/apiError');
const HttpStatus = require('../enums/http-status.enum');
const ErrorMessages = require('../enums/error-messages.enum');

class ProduitService {
  async create(data, file) {
    const imageUrl = await cloudinaryService.uploadImage(file && file.buffer);
    const payload = {
      ...data,
      imageUrl
    };

    if (payload.quantiteStock !== undefined) payload.quantiteStock = Number(payload.quantiteStock);
    if (payload.prixUnitaire !== undefined) payload.prixUnitaire = Number(payload.prixUnitaire);

    return produitRepository.create(payload);
  }

  findAll() {
    return produitRepository.findAll();
  }

  async findById(id) {
    const produit = await produitRepository.findById(id);
    if (!produit) throw new ApiError(HttpStatus.NOT_FOUND, ErrorMessages.PRODUIT_NON_TROUVE);
    return produit;
  }

  async update(id, data) {
    const payload = { ...data };
    if (payload.quantiteStock !== undefined) payload.quantiteStock = Number(payload.quantiteStock);
    if (payload.prixUnitaire !== undefined) payload.prixUnitaire = Number(payload.prixUnitaire);

    const updated = await produitRepository.update(id, payload);
    if (!updated) throw new ApiError(HttpStatus.NOT_FOUND, ErrorMessages.PRODUIT_NON_TROUVE);
    return updated;
  }

  async delete(id) {
    const produit = await produitRepository.findById(id);
    if (!produit) throw new ApiError(HttpStatus.NOT_FOUND, ErrorMessages.PRODUIT_NON_TROUVE);

    if (produit.imageUrl) {
      await cloudinaryService.deleteImageByUrl(produit.imageUrl);
    }

    return produitRepository.delete(id);
  }

  async incrementStock(id, quantite) {
    if (quantite <= 0) throw new ApiError(HttpStatus.BAD_REQUEST, ErrorMessages.QUANTITE_INVALIDE);

    return prisma.$transaction(async (tx) => {
      const produit = await produitRepository.findById(id, {}, tx);
      if (!produit) throw new ApiError(HttpStatus.NOT_FOUND, ErrorMessages.PRODUIT_NON_TROUVE);

      const nextStock = Number(produit.quantiteStock) + Number(quantite);
      return produitRepository.updateStock(id, nextStock, tx);
    });
  }

  async decrementStock(id, quantite) {
    if (quantite <= 0) throw new ApiError(HttpStatus.BAD_REQUEST, ErrorMessages.QUANTITE_INVALIDE);

    return prisma.$transaction(async (tx) => {
      const produit = await produitRepository.findById(id, {}, tx);
      if (!produit) throw new ApiError(HttpStatus.NOT_FOUND, ErrorMessages.PRODUIT_NON_TROUVE);

      const nextStock = Number(produit.quantiteStock) - Number(quantite);
      if (nextStock < 0) {
        throw new ApiError(HttpStatus.BAD_REQUEST, ErrorMessages.STOCK_INSUFFISANT);
      }

      return produitRepository.updateStock(id, nextStock, tx);
    });
  }
}

module.exports = new ProduitService();
