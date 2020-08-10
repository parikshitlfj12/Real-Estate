const express = require('express');
const bodyParser = require('body-parser');
const app =express();
const mongoose = require('mongoose');
const session = require('express-session');
//This gives you a function which has a session as a parameter
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI = 'mongodb+srv://ghost:ghost@mycluster-jfog5.mongodb.net/shop?retryWrites=true';
const multer = require('multer');

//storing session in mongo
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})


//Importing Routes
const adminData = require('./Routes/admin');
const productlist = require('./Routes/product-list');
const apply = require('./Routes/apply');
const product = require('./Routes/product');
const User = require('./models/user');

const fileStorage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'images');
    },
    filename:(req,file,cb) => {
        cb(null,file.originalname);
    }
})
const fileFilter = (req,file,cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
    cb(null,true);
    }
    else{
    cb(null,true);
    }
}

//Using
app.set('view engine','ejs');
app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));
app.use('/public/images', express.static('public/images'));
app.use(bodyParser.urlencoded({extended: false}));

//Multer
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

app.use(productlist); 

    //session
    app.use(
      session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
      })
    );
    app.use((req, res, next) => {
        if (!req.session.user) {
          return next();
        }
        User.findById(req.session.user._id)
          .then(user => {
            req.user = user;
            next();
          })
          .catch(err => console.log(err));
      });



// Using Routes
app.use(adminData.routes);
app.use(apply.routes);
app.use(product.routes);



mongoose
    .connect(MONGODB_URI)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err),{ autoIndex: false });