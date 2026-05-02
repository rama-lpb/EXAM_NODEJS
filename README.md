# API RESTful Gestion des Approvisionnements

Projet Node.js + Express + PostgreSQL (Docker), architecture POO, upload Cloudinary, Swagger et authentification JWT.

## 1. Installation

```bash
npm install
cp .env.example .env
```

Renseigner les variables Cloudinary dans `.env`.

## 2. Lancer PostgreSQL via Docker

```bash
docker compose up -d
```

## 3. Lancer le serveur

```bash
npm run dev
```

Swagger est disponible ici: `http://localhost:3000/api-docs`

## 4. Authentification

1. `POST /api/auth/register`
2. `POST /api/auth/login` -> récupérer le token
3. Dans Swagger, bouton `Authorize` et coller `Bearer <token>`

Toutes les routes métier sont protégées après connexion.

## 5. Endpoints implémentés

- Fournisseurs: CRUD complet
- Produits: CRUD + `PATCH /increment` + `PATCH /decrement`
- Approvisionnements: CRUD + incrément auto du stock produit à la création

## 6. Règles métier couvertes

- Stock jamais négatif (`400` si décrément impossible)
- Upload image produit via `multipart/form-data` + Cloudinary
- Incrément du stock dans la même transaction à la création d'un approvisionnement
