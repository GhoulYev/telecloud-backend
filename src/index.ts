import { PrismaClient } from '@prisma/client';
import express from 'express';
import { PORT } from './consts';

const prisma = new PrismaClient();
const app = express();

const main = async () => {
  app.get('/', (req, res) => {
    res.send('hello world');
  });
  app.listen(PORT, () => console.log('WebServer has been started'));
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
