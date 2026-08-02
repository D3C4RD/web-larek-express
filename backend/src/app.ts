import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import routers from './routes';
import { errors as celebrateErrors } from 'celebrate';
import { requestLogger, errorLogger } from '../src/middlewares/logger';

dotenv.config();
const { PORT = 3000, DB_ADDRESS = 'mongodb://localhost:27017/weblarek' } = process.env;
const app = express();
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(DB_ADDRESS);
app.use(requestLogger);

app.use('/', routers);
app.use(celebrateErrors());
app.use(errorLogger);

app.listen(PORT, ()=>{
  console.log(`listening on port ${PORT}`)
})