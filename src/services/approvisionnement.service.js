const prisma = require('../config/prisma');
const approvisionnementRepository = require('../repositories/approvisionnement.repository');
const fournisseurRepository = require('../repositories/fournisseur.repository');
const produitRepository = require('../repositories/produit.repository');
const ApiError = require('../utils/apiError');
const HttpStatus = require('../enums/http-status.enum');
const ErrorMessages = require('../enums/error-messages.enum');

class ApprovisionnementService {
  normalizeDate(dateValue) {
    if (!dateValue) return dateValue;
    if (dateValue instanceof Date) return dateValue;
    return new Date(`${dateValue}T00:00:00.000Z`);
  }

  async create(data) {
    const payload = {
      ...data,
      date: this.normalizeDate(data.date),
      quantite: Number(data.quantite),
      fournisseurId: Number(data.fournisseurId),
      produitId: Number(data.produitId)
    };

    const { fournisseurId, produitId, quantite } = payload;
    if (quantite <= 0) throw new ApiError(HttpStatus.BAD_REQUEST, ErrorMessages.QUANTITE_INVALIDE);

    return prisma.$transaction(async (tx) => {
      const fournisseur = await fournisseurRepository.findById(fournisseurId, {}, tx);
      if (!fournisseur) throw new ApiError(HttpStatus.NOT_FOUND, ErrorMessages.FOURNISSEUR_NON_TROUVE);

      const produit = await produitRepository.findById(produitId, {}, tx);
      if (!produit) throw new ApiError(HttpStatus.NOT_FOUND, ErrorMessages.PRODUIT_NON_TROUVE);

      const appro = await approvisionnementRepository.create(payload, tx);
      const nextStock = Number(produit.quantiteStock) + Number(quantite);
      await produitRepository.updateStock(produitId, nextStock, tx);

      return approvisionnementRepository.findByIdWithRelations(appro.id, {}, tx);
    });
  }

  findAll() {
    return approvisionnementRepository.findAllWithRelations();
  }

  async findById(id) {
    const appro = await approvisionnementRepository.findByIdWithRelations(id);
    if (!appro) throw new ApiError(HttpStatus.NOT_FOUND, ErrorMessages.APPRO_NON_TROUVE);
    return appro;
  }

  async update(id, data) {
    return prisma.$transaction(async (tx) => {
      const payload = { ...data };
      if (payload.date !== undefined) payload.date = this.normalizeDate(payload.date);
      if (payload.quantite !== undefined) payload.quantite = Number(payload.quantite);
      if (payload.fournisseurId !== undefined) payload.fournisseurId = Number(payload.fournisseurId);
      if (payload.produitId !== undefined) payload.produitId = Number(payload.produitId);

      const appro = await approvisionnementRepository.findById(id, {}, tx);
      if (!appro) throw new ApiError(HttpStatus.NOT_FOUND, ErrorMessages.APPRO_NON_TROUVE);

      const currentProduitId = appro.produitId;
      const nextProduitId = payload.produitId || currentProduitId;
      const nextQuantite = payload.quantite !== undefined ? Number(payload.quantite) : Number(appro.quantite);

      if (nextQuantite <= 0) throw new ApiError(HttpStatus.BAD_REQUEST, ErrorMessages.QUANTITE_INVALIDE);

      const currentProduit = await produitRepository.findById(currentProduitId, {}, tx);
      if (!currentProduit) throw new ApiError(HttpStatus.NOT_FOUND, ErrorMessages.PRODUIT_NON_TROUVE);

      const nextProduit = nextProduitId === currentProduitId
        ? currentProduit
        : await produitRepository.findById(nextProduitId, {}, tx);

      if (!nextProduit) throw new ApiError(HttpStatus.NOT_FOUND, ErrorMessages.PRODUIT_NON_TROUVE);

      if (payload.fournisseurId) {
        const fournisseur = await fournisseurRepository.findById(payload.fournisseurId, {}, tx);
        if (!fournisseur) throw new ApiError(HttpStatus.NOT_FOUND, ErrorMessages.FOURNISSEUR_NON_TROUVE);
      }

      if (nextProduitId === currentProduitId) {
        const diff = nextQuantite - Number(appro.quantite);
        const resultingStock = Number(currentProduit.quantiteStock) + diff;
        if (resultingStock < 0) throw new ApiError(HttpStatus.BAD_REQUEST, ErrorMessages.STOCK_INSUFFISANT);
        await produitRepository.updateStock(currentProduitId, resultingStock, tx);
      } else {
        const rollbackQty = Number(appro.quantite);
        const currentStockAfterRollback = Number(currentProduit.quantiteStock) - rollbackQty;
        if (currentStockAfterRollback < 0) throw new ApiError(HttpStatus.BAD_REQUEST, ErrorMessages.STOCK_INSUFFISANT);

        const nextStock = Number(nextProduit.quantiteStock) + nextQuantite;
        await produitRepository.updateStock(currentProduitId, currentStockAfterRollback, tx);
        await produitRepository.updateStock(nextProduitId, nextStock, tx);
      }

      await approvisionnementRepository.update(id, payload, tx);
      return approvisionnementRepository.findByIdWithRelations(id, {}, tx);
    });
  }

  async delete(id) {
    const deleted = await approvisionnementRepository.delete(id);
    if (!deleted) throw new ApiError(HttpStatus.NOT_FOUND, ErrorMessages.APPRO_NON_TROUVE);
    return deleted;
  }
}

module.exports = new ApprovisionnementService();
