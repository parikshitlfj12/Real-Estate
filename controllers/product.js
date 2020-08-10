const Product = require('../models/products');

exports.getProduct = (req,res,next) => {
    isAuthenticated = req.session.isLoggedIn;
    const prodId = req.params.productid;
    Product.findById(prodId)
    .then(product => {
        res.render('product',{
            prods: product,
            isAuthenticated
        });
        console.log(product);
    })
    
}