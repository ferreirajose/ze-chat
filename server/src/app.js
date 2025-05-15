// refatora esse codigo para um arquivo externo
const path = require('path');

const config = {
  path: path.resolve(__dirname, '../envs', `.env.${process.env.NODE_ENV || 'development'}`)
}

// 1. Primeiro carrega as variáveis de ambiente
require('dotenv').config(config);

// 2. Depois valida as variáveis
const validateEnv = require('./utils/envValidator');
validateEnv();

// const loadEnv = require('./config/envLoader');
// loadEnv();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./helpers/errorHandler');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorHandling();
  }

  middlewares() {
    // Configure CORS - você pode mover isso para o .env também
    const corsOptions = {
      origin: process.env.CORS_ORIGIN || '*',
      optionsSuccessStatus: 200
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use('/api', routes);
  }

  errorHandling() {
    this.app.use(errorHandler);
  }
}

module.exports = new App().app;