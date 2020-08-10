const express = require('express');
const routes = express.Router();

const admincont = require('../controllers/admin'); 
const isAuth = require('../middleware/is-auth');
//HOME
routes.get('/',admincont.getHome);

//SIGNUP
routes.get('/sign-up',admincont.getSignUp);
routes.post('/sign-up',admincont.postSignUp);

//LOGIN
routes.post('/login',admincont.postLogin);
routes.get('/login',admincont.getLogin);

//LOGOUT
routes.get('/logout',admincont.getLogout);

//ADD PRODUCT
routes.post('/add-product',isAuth,admincont.postAddProduct);

//cart
routes.get('/cart',isAuth, admincont.getCart);
routes.post('/addtocart/:productId',isAuth, admincont.postAddToCart);

//Property list
routes.get('/your-property',isAuth,admincont.getYours);

//Profiles
routes.get('/home/:profile',admincont.getProfile);


exports.routes = routes;




