const express = require('express');
const routes = express.Router();
const applycont = require('../controllers/apply');
const isAuth = require('../middleware/is-auth');
//GET
routes.get('/apply1',isAuth,applycont.getApply1);

//POST
routes.post('/apply1',applycont.postApply1);

exports.routes = routes;
