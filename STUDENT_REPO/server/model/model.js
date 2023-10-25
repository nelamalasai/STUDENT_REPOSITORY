const mongoose = require('mongoose');

const signUpTemplate = new mongoose.Schema(
    {
    gender: String,
    name: {
        first: String,
        last: String,
    },
    location: {
        city: String,
        state: String,
        country: String,
        postcode: String,
    },
    email: String,
    login: {
        username: String,
        password: String,
    },
    dob: {
        date: String,
        age: Number,
    },
    phone: String,
    thumbnail: String
}
);

module.exports = mongoose.model('users', signUpTemplate)