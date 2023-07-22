import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import protectedRouter from "./protected-routes.js";
import publicRouter from "./public-routes.js";
import mongoose from "mongoose";
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI ?? 'mongodb://localhost:27017/toped-play-clone', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

app.use(publicRouter);
app.use(protectedRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Something went wrong.'});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});