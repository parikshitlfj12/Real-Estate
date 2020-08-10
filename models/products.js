const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productSchema = new Schema({
    nameofapartment: {
        type: String,
        required: true
    },
    ob: String,
    rs: String,
    price: {
        type: Number,
        required: true
    },
    StreetAreaLandmark: String,
    city: String,
    locality: String,
    BuildingProjectSociety: String,
    special: String,
    proptype: String,
    bedrooms: Number,
    bathrooms: Number,
    furnishtype: String,
    tenenttype: String,
    builduparea: Number,
    floornumber: Number,
    availablefrom: Number,
    carpetarea: Number,
    totalfloors: Number,
    ageofproperty: Number,
    monthlyrent: {
        type: Number,
        required: true
    },
    maintanancecharges: {
        type: Number,
        required: true
    },
    securitydeposit: {
        type: Number,
        required: true
    },
    description: String,
    // Relational Setup between users and products models
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: String
});

module.exports = mongoose.model('Product',productSchema);