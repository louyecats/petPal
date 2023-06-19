const express = require("express"); //import express module
const cors = require('cors');
const app = express(); //use express to create app
const port = 8000; //optional port pick localhost://8000
const cookieParser = require('cookie-parser'); //to use cookies in express for JWT
require('dotenv').config(); //to access and use process.env
require('./config/mongoose.config');

require('./config/mongoose.config');
//if planning to handle post requests, must have middleware express as it allows us to use a post request and pass it throug
app.use(express.json(), express.urlencoded({extended:true}));

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser()); //to use cookies in express for JWT


//bring in routes to server & give app we imported access to them
require('./routes/pet.routes')(app); 
require('./routes/user.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));

//LOGIN/REG TERMINAL INSTALL
//npm i bcrypt validator jsonwebtoken dotenv cookie-parser 