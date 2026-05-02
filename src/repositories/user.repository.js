const BaseRepository = require('./base.repository');

class UserRepository extends BaseRepository {
  constructor() {
    super('user');
  }

  findByEmail(email, tx) {
    return this.getModel(tx).findUnique({ where: { email } });
  }
}

module.exports = new UserRepository();
