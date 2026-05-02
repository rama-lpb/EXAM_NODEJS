const { PrismaClient } = require('@prisma/client');

class PrismaConfig {
  constructor() {
    this.client = new PrismaClient();
  }

  getClient() {
    return this.client;
  }
}

module.exports = new PrismaConfig().getClient();
