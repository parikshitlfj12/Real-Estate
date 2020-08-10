const Product = require('../models/products');
// const upload = require('../services/file-upload');
// const uploadSingle = upload.single('image');
 
//GET
exports.getApply1 =  (req,res,next) => {
    isAuthenticated = req.session.isLoggedIn;
    res.render('apply',{isAuthenticated});
}


//POST
exports.postApply1 =  (req,res,next) => {
    console.log("THE req.user object ====", req.user);
    const nameofapartment = req.body.nameofapartment;
    const ob = req.body.ob;
    const rs = req.body.rs;
    const price = req.body.price;
    const StreetAreaLandmark = req.body.StreetAreaLandmark;
    const city = req.body.city;
    const locality = req.body.locality;
    const BuildingProjectSociety = req.body.BuildingProjectSociety;
    const special = req.body.special;
    const description = req.body.description;
    const proptype = req.body.proptype;
    const bedrooms = req.body.bathrooms;
    const bathrooms = req.body.bathrooms;
    const furnishtype = req.body.furnishtype;
    const tenanttype = req.body.tenanttype;
    const builduparea = req.body.builduparea;
    const floornumber = req.body.floornumber;
    const availablefrom = req.body.availablefrom;
    const carpetarea = req.body.carpetarea;
    const totalfloors = req.body.totalfloors;
    const ageofproperty = req.body.ageofproperty;
    const monthlyrent = req.body.monthlyrent;
    const maintanancecharges = req.body.maintanancecharges;
    const securitydeposit = req.body.securitydeposit;
    const imageURL = req.file.filename;

    const product = new Product({
        nameofapartment: nameofapartment,
        ob: ob,
        rs: rs,
        price: price,
        StreetAreaLandmark: StreetAreaLandmark,
        city: city,
        locality: locality,
        BuildingProjectSociety: BuildingProjectSociety,
        special: special,
        proptype:proptype,
        bedrooms: bedrooms ,
        bathrooms: bathrooms,
        furnishtype: furnishtype,
        tenanttype: tenanttype,
        builduparea: builduparea,
        floornumber: floornumber,
        availablefrom: availablefrom,
        carpetarea: carpetarea,
        totalfloors: totalfloors,
        ageofproperty: ageofproperty,
        monthlyrent: monthlyrent,
        maintanancecharges: maintanancecharges,
        securitydeposit: securitydeposit,
        description: description,
        userId: req.user,
        image: 'images/'+imageURL
    });

    product
    .save()
    .then(result => {
        console.log('Results Successfully Saved');
    })
    .catch(err => {
        console.log("BHAI APPLY ME ERROR HAI err");
        throw err;
    });
    console.log("Done");
    res.redirect('/');
}
    
    
