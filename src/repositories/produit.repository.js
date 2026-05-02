const BaseRepository = require('./base.repository');

class ProduitRepository extends BaseRepository {
  constructor() {
    super('produit');
  }

  updateStock(id, nextStock, tx) {
    return this.getModel(tx).update({
      where: { id: Number(id) },
      data: { quantiteStock: Number(nextStock) }
    });
  }
}

module.exports = new ProduitRepository();
