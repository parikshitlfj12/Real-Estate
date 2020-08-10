const express = require('express');
const routes = express.Router();
const productlistcont = require('../controllers/product-list');

routes.get('/product-list', productlistcont.getProductlist);
routes.post('/delete-product/:prodId',productlistcont.postdeleteproduct);
module.exports = routes;

