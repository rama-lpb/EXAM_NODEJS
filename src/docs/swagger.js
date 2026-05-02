const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API RESTful Gestion des Approvisionnements',
      version: '1.0.0',
      description: 'API Node.js/Express pour la gestion des fournisseurs, produits et approvisionnements.'
    },
    servers: [{ url: 'http://localhost:3000' }],
    tags: [
      { name: 'Auth', description: 'Authentification utilisateur' },
      { name: 'Fournisseurs', description: 'CRUD fournisseurs' },
      { name: 'Produits', description: 'CRUD produits + stock + image Cloudinary' },
      { name: 'Approvisionnements', description: 'CRUD approvisionnements + MAJ automatique du stock' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Erreur de validation des donnees' }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'motDePasse'],
          properties: {
            email: { type: 'string', example: 'rama@gmail.com' },
            motDePasse: { type: 'string', example: 'secret123' }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['nom', 'email', 'motDePasse'],
          properties: {
            nom: { type: 'string', example: 'Rama' },
            email: { type: 'string', example: 'rama@gmail.com' },
            motDePasse: { type: 'string', example: 'secret123' }
          }
        },
        FournisseurCreate: {
          type: 'object',
          required: ['nom', 'telephone', 'adresse'],
          properties: {
            nom: { type: 'string', example: 'Fournisseur A' },
            telephone: { type: 'string', example: '771234567' },
            adresse: { type: 'string', example: 'Dakar' }
          }
        },
        Fournisseur: {
          allOf: [
            { $ref: '#/components/schemas/FournisseurCreate' },
            {
              type: 'object',
              properties: {
                id: { type: 'integer', example: 1 },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
              }
            }
          ]
        },
        Produit: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            libelle: { type: 'string', example: 'Riz 50kg' },
            prixUnitaire: { type: 'number', example: 25000 },
            quantiteStock: { type: 'integer', example: 40 },
            imageUrl: { type: 'string', example: 'https://res.cloudinary.com/...jpg' }
          }
        },
        ApprovisionnementCreate: {
          type: 'object',
          required: ['date', 'quantite', 'fournisseurId', 'produitId'],
          properties: {
            date: { type: 'string', format: 'date', example: '2026-05-02' },
            quantite: { type: 'integer', example: 20 },
            fournisseurId: { type: 'integer', example: 1 },
            produitId: { type: 'integer', example: 1 }
          }
        }
      }
    },
    paths: {
      '/api/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Creer un compte utilisateur',
          security: [],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/RegisterRequest' } } }
          },
          responses: {
            201: { description: 'Utilisateur cree' },
            409: { description: 'Email deja utilise', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        }
      },
      '/api/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Se connecter pour obtenir un token',
          security: [],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } }
          },
          responses: {
            200: { description: 'Token retourne' },
            401: { description: 'Identifiants invalides' }
          }
        }
      },
      '/api/fournisseurs': {
        post: {
          tags: ['Fournisseurs'],
          summary: 'Creer un fournisseur',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/FournisseurCreate' } } }
          },
          responses: {
            201: { description: 'Fournisseur cree' },
            400: { description: 'Validation error (ex: id envoye, champ manquant)' },
            401: { description: 'Non authentifie' }
          }
        },
        get: {
          tags: ['Fournisseurs'],
          summary: 'Lister les fournisseurs',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'OK' }, 401: { description: 'Non authentifie' } }
        }
      },
      '/api/fournisseurs/{id}': {
        get: {
          tags: ['Fournisseurs'],
          summary: 'Recuperer un fournisseur par id',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'OK' }, 404: { description: 'Non trouve' } }
        },
        put: {
          tags: ['Fournisseurs'],
          summary: 'Modifier un fournisseur',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/FournisseurCreate' } } }
          },
          responses: { 200: { description: 'Modifie' }, 400: { description: 'Validation error' }, 404: { description: 'Non trouve' } }
        },
        delete: {
          tags: ['Fournisseurs'],
          summary: 'Supprimer un fournisseur',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Supprime' }, 404: { description: 'Non trouve' } }
        }
      },
      '/api/produits': {
        post: {
          tags: ['Produits'],
          summary: 'Creer un produit avec image Cloudinary',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  required: ['libelle', 'prixUnitaire', 'image'],
                  properties: {
                    libelle: { type: 'string' },
                    prixUnitaire: { type: 'number' },
                    quantiteStock: { type: 'integer' },
                    image: { type: 'string', format: 'binary' }
                  }
                }
              }
            }
          },
          responses: { 201: { description: 'Cree' }, 400: { description: 'Erreur validation/config Cloudinary' } }
        },
        get: {
          tags: ['Produits'],
          summary: 'Lister les produits',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'OK' } }
        }
      },
      '/api/produits/{id}': {
        get: {
          tags: ['Produits'],
          summary: 'Recuperer un produit par id',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'OK' }, 404: { description: 'Non trouve' } }
        },
        put: {
          tags: ['Produits'],
          summary: 'Modifier un produit',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Modifie' }, 400: { description: 'Validation error' } }
        },
        delete: {
          tags: ['Produits'],
          summary: 'Supprimer un produit',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Supprime' }, 404: { description: 'Non trouve' } }
        }
      },
      '/api/produits/{id}/increment': {
        patch: {
          tags: ['Produits'],
          summary: 'Incrementer le stock',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object', properties: { quantite: { type: 'integer', example: 5 } } } } }
          },
          responses: { 200: { description: 'Stock incremente' }, 400: { description: 'Quantite invalide' } }
        }
      },
      '/api/produits/{id}/decrement': {
        patch: {
          tags: ['Produits'],
          summary: 'Decrementer le stock',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object', properties: { quantite: { type: 'integer', example: 2 } } } } }
          },
          responses: { 200: { description: 'Stock decremente' }, 400: { description: 'Stock insuffisant ou quantite invalide' } }
        }
      },
      '/api/approvisionnements': {
        post: {
          tags: ['Approvisionnements'],
          summary: 'Creer un approvisionnement et augmenter automatiquement le stock',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ApprovisionnementCreate' } } }
          },
          responses: { 201: { description: 'Cree' }, 400: { description: 'Validation error' }, 404: { description: 'Fournisseur/produit non trouve' } }
        },
        get: {
          tags: ['Approvisionnements'],
          summary: 'Lister les approvisionnements',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'OK' } }
        }
      },
      '/api/approvisionnements/{id}': {
        get: {
          tags: ['Approvisionnements'],
          summary: 'Recuperer un approvisionnement par id',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'OK' }, 404: { description: 'Non trouve' } }
        },
        put: {
          tags: ['Approvisionnements'],
          summary: 'Modifier un approvisionnement (stock ajuste automatiquement)',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Modifie' }, 400: { description: 'Validation/stock' }, 404: { description: 'Non trouve' } }
        },
        delete: {
          tags: ['Approvisionnements'],
          summary: 'Supprimer un approvisionnement',
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Supprime' }, 404: { description: 'Non trouve' } }
        }
      }
    }
  },
  apis: []
};

module.exports = swaggerJsdoc(options);
