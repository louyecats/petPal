const mongoose = require('mongoose');
const {isEmail} = require('validator'); 
//instead of bringing in everything from npm validator package - just bring in {isEmail}, then use it to validate the email key in User Model //this creates a built-in REGEX email pattern validation 
const bcrypt = require('bcrypt');

const PetAppUserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minLength: [2, 'First name must be at least 2 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minLength: [2, 'Last name must be at least 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: [true],
        unique: [true, 'Email already exists'],
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters long']
    }
}, {timestamps: true});

//middleware created virtual attribute for confirmPassword that we won't see in our database, get() grabs the virtual field on form, then set() sets value 
PetAppUserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set((value)=> this._confirmPassword = value);

//pre(save) means before saving User instance, use middleware to hash the password, (next) means move forward, use hash w/Bcrypt this (user instance) value for key password, add 10 rounds of salt, hashed password is returned and stored as value
PetAppUserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
})

//export model file to access on controller.js
const User = mongoose.model('User', PetAppUserSchema);
module.exports = User;