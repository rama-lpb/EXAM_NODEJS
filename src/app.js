const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');
const swaggerSpec = require('./docs/swagger');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Creer un compte utilisateur
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nom, email, motDePasse]
 *             properties:
 *               nom: { type: string }
 *               email: { type: string }
 *               motDePasse: { type: string }
 *     responses:
 *       201: { description: Utilisateur cree }
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Se connecter pour obtenir un token
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               motDePasse: { type: string }
 *     responses:
 *       200: { description: Token retourne }
 */

/**
 * @swagger
 * /api/fournisseurs:
 *   post:
 *     summary: Creer un fournisseur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fournisseur'
 *     responses:
 *       201: { description: Cree }
 *   get:
 *     summary: Lister les fournisseurs
 *     responses:
 *       200: { description: OK }
 */

/**
 * @swagger
 * /api/fournisseurs/{id}:
 *   get:
 *     summary: Recuperer un fournisseur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *   put:
 *     summary: Modifier un fournisseur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Modifie }
 *   delete:
 *     summary: Supprimer un fournisseur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Supprime }
 */

/**
 * @swagger
 * /api/produits:
 *   post:
 *     summary: Creer un produit avec upload image Cloudinary
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [libelle, prixUnitaire, image]
 *             properties:
 *               libelle: { type: string }
 *               prixUnitaire: { type: number }
 *               quantiteStock: { type: integer }
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201: { description: Cree }
 *   get:
 *     summary: Lister les produits
 *     responses:
 *       200: { description: OK }
 */

/**
 * @swagger
 * /api/produits/{id}:
 *   get:
 *     summary: Recuperer un produit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *   put:
 *     summary: Modifier un produit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Modifie }
 *   delete:
 *     summary: Supprimer un produit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Supprime }
 */

/**
 * @swagger
 * /api/produits/{id}/increment:
 *   patch:
 *     summary: Incrementer le stock d'un produit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantite: { type: integer }
 *     responses:
 *       200: { description: Stock mis a jour }
 */

/**
 * @swagger
 * /api/produits/{id}/decrement:
 *   patch:
 *     summary: Decrementer le stock d'un produit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantite: { type: integer }
 *     responses:
 *       200: { description: Stock mis a jour }
 *       400: { description: Stock insuffisant }
 */

/**
 * @swagger
 * /api/approvisionnements:
 *   post:
 *     summary: Creer un approvisionnement et incrementer automatiquement le stock du produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Approvisionnement'
 *     responses:
 *       201: { description: Cree }
 *   get:
 *     summary: Lister les approvisionnements
 *     responses:
 *       200: { description: OK }
 */

/**
 * @swagger
 * /api/approvisionnements/{id}:
 *   get:
 *     summary: Recuperer un approvisionnement
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *   put:
 *     summary: Modifier un approvisionnement
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Modifie }
 *   delete:
 *     summary: Supprimer un approvisionnement
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Supprime }
 */

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware.handle);

module.exports = app;
