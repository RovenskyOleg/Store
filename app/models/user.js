// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var Product = new mongoose.Schema({
        name: String,
        price: String,
        imgUrl: String,
        description: String  
    }),
    userSchema = new mongoose.Schema({
    local: {
        email: String,
        firstname: String,
        lastname: String,
        password: String,
        phone: String,
        products: [Product]
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);