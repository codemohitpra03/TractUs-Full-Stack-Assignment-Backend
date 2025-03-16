import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware';
import { notFound } from './middlewares/notFound.middleware';

import { contractRouter } from './routes/contract.routes';

dotenv.config();


const app = express();

const PORT = process.env.PORT;


app.use(express.json());

const whitelist = [
  'http://localhost:5173',
  
]; //white list consumers
const corsOptions = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200,
  credentials: true, 
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'device-remember-token',
    'Access-Control-Allow-Origin',
    'Origin',
    'Accept',
    'x-api-key',
  ],
};

app.use(cors(corsOptions)); //adding cors middleware to the express with above configurations

app.use((req, _res, next) => {
  console.info(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});



app.get('/', (_req, res) => {
  return res.status(200).json({
    message: 'Server is running',
    status: 200,
    success: true,
  });
});

// Routes
app.use('/api/v1/contract',contractRouter)

app.use(errorHandlerMiddleware);
app.use(notFound);


app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
  console.info(`Environment: ${process.env.NODE_ENV === 'production' ? 'production' : 'development'}`);
});
