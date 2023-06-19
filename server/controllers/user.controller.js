const User = require('../models/user.model');
//in order to use the secret key on .env file, need to use process for .env files, then the key variable name
const secret = process.env.SECRET_KEY;
//refer to web token - package we installed 
const jwt = require('jsonwebtoken');
//need for login functionality - since we won't know the password to compare
const bcrypt = require('bcrypt');


        
module.exports = {
    //you can use an arrow function as an asynchronous function by adding the word async before (req,res), then add try/catch similar to async_await.js
    register: async (req, res) => {
        try { //before create user, check to see if they already exist, use wait so doesn't run to rest of code
            const potentialUser = await User.findOne({email: req.body.email});
            if (potentialUser) { //if that findOne returns a value matching existing email- return error message
                return res.status(400).json({
                    message: "Email already exits"
                });
            }
            //instead of creating a new user right away, want to initiate a web token first
            const newUser = await User.create(req.body)
            //the info we want to save inside user token is their id and email, any time use token have to pass in the secret variable declared above holding secret key, you can also pass in when it expires
            const userToken = jwt.sign({_id: newUser._id, email: newUser.email}, secret, {expiresIn: "2h"});
            //create the new cookie that is called userToken that holds our webtoken secret, the httpOnly is based off request, response message
            res.cookie("usertoken", userToken, {httpOnly: true}).json({
                message: "Success!",
                user: newUser
            });
        } catch (err) {
            console.log("register error", err);
            return res.status(400).json(err);
        }
    },
    // login an existing user
    login: async (req, res) => {
        try { //user is trying to log in w/email+password, so we need to check if there's a user in our database who's email matches the value that comes across in the request form key "email" input 
            //we need to use await to wait to run code to log user in until we find out if they're in database or not
            const user = await User.findOne({ email: req.body.email });
            if(user){ //if user email is in database, wait to to compare passwords from the request form key "password" input to the found users password in database from findOne method above & return true or false for match
                const passwordMatch = await bcrypt.compare(req.body.password, user.password);
                if(passwordMatch){ //if passwords match, create web token called userToken, that holds the id and email, must pass in the secret variable declared above holding secret key, pass in when expries
                    const userToken = jwt.sign({_id: user._id, email:user.email}, secret, {expiresIn: "2h"});
                    res.cookie("usertoken", userToken, secret, {httpOnly: true}).json({
                        message: "Success!",
                        user: user
                    });
                }
                else{ //if passwords don't match
                    res.status(400).json({
                        message: "Invalid login attempt"
                    });
                }
            } else { // error message for  try above, if user email on log in form input is not in database
                res.status(400).json({
                    message: "Invalid login attempt"
                });
            }
        }
        catch (err) {
            return res.json(err);
        }
    },
    //logout an existing user
    logout: (req, res) => {
        console.log("logged out user");
        res.clearCookie('usertoken');
        res.sendStatus(200).json({message: "successfully logged out"});
    },

    //logged in user
    loggedUser: async (req, res) =>{
        console.log("I'm here!")
        try {
            console.log(req.cookies.usertoken)
            const user = jwt.verify(req.cookies.usertoken, secret);
            console.log("user", user)
            // const currentUser = await Model.findOne({_id: user._id});
            // console.log("loggedUser", currentUser);
            res.json(user);
        } catch (error) {
            res.status(400).json({errors: 'error loggedUser'})
        }
    }
    
}
