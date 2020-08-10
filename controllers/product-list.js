const Product = require('../models/products');
const ITEMS_PER_PAGE = 10;

exports.getProductlist = (req,res,next) => {
    const page = req.query.page;
    let totalItems;

    Product.find()
    .countDocuments()
    .then(numProducts => {
        totalItems = numProducts;
        return Product.find()
        .skip((page-1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
    })
    .then(products => {
        res.render('product-list',{
         prods: products,
         isAuthenticated:true,
         currentPage: page,
         hasNextPage: ITEMS_PER_PAGE * page < totalItems,
         hasPreviousPage: page > 1,
         nextPage: page + 1,
         previousPage: page - 1,
         lastPage: Math.ceil(totalItems/ITEMS_PER_PAGE)
        });
    })
    .catch(err => {
        console.log(err);
        throw err;
    })
    
}

exports.postdeleteproduct = (req,res,next) => {
    const prodId = req.params.prodId;
    Product.findByIdAndRemove(prodId)
    .then(() => {
        console.log("Product Destroyed");
        res.redirect('/product-list');
    })
    .catch(err => console.log(err));
}