const BaseRepository = require('./base.repository');

class FournisseurRepository extends BaseRepository {
  constructor() {
    super('fournisseur');
  }

  findByTelephone(telephone, tx) {
    return this.getModel(tx).findUnique({ where: { telephone } });
  }
}

module.exports = new FournisseurRepository();
