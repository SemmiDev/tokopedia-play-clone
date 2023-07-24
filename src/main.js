import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import protectedRouter from "./protected-routes.js";
import publicRouter from "./public-routes.js";
import mongoose from "mongoose";
import cors from 'cors';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import seedData from "./model/seeder.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI ?? 'mongodb://localhost:27017/toped-play-clone', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

const apiSpec = YAML.load('./open-api.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

app.use(publicRouter);
app.use(protectedRouter);

const argv = yargs(hideBin(process.argv))
  .option('reset', {
    alias: 'r',
    type: 'boolean',
    description: 'Reset collections by removing all data',
  })
  .argv;

if (argv.reset) {
    console.log('Resetting collections...');
    await mongoose.connection.dropDatabase();
    console.log('Collections resetted.');
}

// run db seeder
await seedData();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
