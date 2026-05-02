const BaseRepository = require('./base.repository');

class FournisseurRepository extends BaseRepository {
  constructor() {
    super('fournisseur');
  }
}

module.exports = new FournisseurRepository();
