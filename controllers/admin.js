const Product = require('../models/products');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

//GETHOME
exports.getHome = (req,res,next) => {
    isAuthenticated = req.session.isLoggedIn;
    res.render('home',{isAuthenticated});
}
//POST ADDPRODUCT
exports.postAddProduct =  (req,res,next) => {
    res.redirect('/product-list',{isAuthenticated: false});
}
 
//LOGIN
exports.getLogin = (req,res,next) => {
    isAuthenticated = req.session.isLoggedIn;
    res.render('login',{isAuthenticated});
}
exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    .then(user => {
        if(!user) {
            return res.redirect('/login');
        }
        bcrypt
        .compare(password,user.password)
        .then(doMatch => {
            if(doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(() => {
                    res.redirect('/');
                });
            }
            res.redirect('/login');
        })
        .catch(err => {
            console.log('Originated from POST LOGIN',err);
        })

    })
}

//LOGOUT
exports.getLogout = (req,res,next) => {
    isAuthenticated = req.session.isLoggedIn;
    req.session.destroy(() => {
        res.redirect('/');
    });
}

//CART
exports.getCart = (req,res,next) => {
    isAuthenticated = req.session.isLoggedIn;
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items;
        res.render('cart',{products: products,isAuthenticated});
    })

    .catch(err => console.log('BHAI GETCART SE ===',err));
}
exports.postAddToCart = (req,res,next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect('/cart');
    });
}

//Your Property
exports.getYours = (req,res,next) => {
    isAuthenticated = req.session.isLoggedIn;
    Product.find()
    .then(products => {
        res.render('your-property',{prods: products,isAuthenticated});
    })
    .catch(err => console.log(err));
}

//Signup
exports.getSignUp = (req,res,next) => {
    isAuthenticated = req.session.isLoggedIn;
    res.render('signup',{isAuthenticated});
}

exports.postSignUp = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmpass;
    User.findOne({email:email})
    .then(userDoc => {
        if(userDoc)
        {
            return res.redirect('/sign-up');
        }
        return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password:hashedPassword,
                cart: {items: [] }
            });
            return user.save();
        })
        .then(result => {
            res.redirect('/login');
        });
    })
    .catch(err => {
        console.log('Originated from POSTSIGNUP',err);
    });
}

//profile
exports.getProfile = (req,res,next) => {
    isAuthenticated = req.session.isLoggedIn;
    const profile = req.params.profile;
    res.render(profile);
}
