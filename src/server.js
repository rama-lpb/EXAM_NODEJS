const app = require('./app');
const env = require('./config/env');
const prisma = require('./config/prisma');

async function bootstrap() {
  try {
    await prisma.$connect();

    app.listen(env.port, () => {
      console.log(`Serveur demarre sur le port ${env.port}`);
      console.log(`Swagger: http://localhost:${env.port}/api-docs`);
    });
  } catch (error) {
    console.error('Erreur de demarrage:', error.message);
    process.exit(1);
  }
}

bootstrap();
