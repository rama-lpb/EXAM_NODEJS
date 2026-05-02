const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');
const ApiError = require('../utils/apiError');
const env = require('../config/env');
const HttpStatus = require('../enums/http-status.enum');
const ErrorMessages = require('../enums/error-messages.enum');

class AuthService {
  async register(payload) {
    const { nom, email, motDePasse } = payload;
    const existing = await userRepository.findByEmail(email);
    if (existing) throw new ApiError(HttpStatus.CONFLICT, ErrorMessages.EMAIL_DEJA_UTILISE);

    const hashed = await bcrypt.hash(motDePasse, 10);
    const user = await userRepository.create({ nom, email, motDePasse: hashed });

    return { id: user.id, nom: user.nom, email: user.email };
  }

  async login(payload) {
    const { email, motDePasse } = payload;
    const user = await userRepository.findByEmail(email);
    if (!user) throw new ApiError(HttpStatus.UNAUTHORIZED, ErrorMessages.IDENTIFIANTS_INVALIDES);

    const ok = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!ok) throw new ApiError(HttpStatus.UNAUTHORIZED, ErrorMessages.IDENTIFIANTS_INVALIDES);

    const token = jwt.sign({ userId: user.id, email: user.email }, env.jwt.secret, {
      expiresIn: env.jwt.expiresIn
    });

    return { token };
  }
}

module.exports = new AuthService();
