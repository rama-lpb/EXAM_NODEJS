const prisma = require('../config/prisma');

class BaseRepository {
  constructor(modelName) {
    this.modelName = modelName;
  }

  getModel(tx) {
    const client = tx || prisma;
    return client[this.modelName];
  }

  create(data, tx) {
    return this.getModel(tx).create({ data });
  }

  findAll(options = {}, tx) {
    return this.getModel(tx).findMany(options);
  }

  findById(id, options = {}, tx) {
    return this.getModel(tx).findUnique({ where: { id: Number(id) }, ...options });
  }

  async update(id, data, tx) {
    const entity = await this.findById(id, {}, tx);
    if (!entity) return null;
    return this.getModel(tx).update({ where: { id: Number(id) }, data });
  }

  async delete(id, tx) {
    const entity = await this.findById(id, {}, tx);
    if (!entity) return null;
    await this.getModel(tx).delete({ where: { id: Number(id) } });
    return entity;
  }
}

module.exports = BaseRepository;
