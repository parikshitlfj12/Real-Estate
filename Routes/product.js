const express = require('express');
const routes = express.Router();
const productcont = require('../controllers/product');

routes.get('/product/:productid',productcont.getProduct);


exports.routes = routes;