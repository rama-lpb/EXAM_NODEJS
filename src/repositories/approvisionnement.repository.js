const BaseRepository = require('./base.repository');

class ApprovisionnementRepository extends BaseRepository {
  constructor() {
    super('approvisionnement');
  }

  findAllWithRelations(options = {}, tx) {
    return this.findAll(
      {
        ...options,
        include: { fournisseur: true, produit: true }
      },
      tx
    );
  }

  findByIdWithRelations(id, options = {}, tx) {
    return this.findById(
      id,
      {
        ...options,
        include: { fournisseur: true, produit: true }
      },
      tx
    );
  }
}

module.exports = new ApprovisionnementRepository();
