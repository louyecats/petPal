const mongoose = require('mongoose');
//when writing name of DB below after connection string, Mongoose SHOULD create the database for you, won't show til have a collection 
//if already exists - in mongoDBCompass by clicking … top left > copy connection string
mongoose.connect('mongodb://127.0.0.1:27017/pawsPortal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    //promise below - since don't know how long connection will take
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));
