//connect controller to model by importing the pet variable that we exported from the model.js
const Pet = require('../models/pet.model');
//import user token to place as creator value
//use the secret key on .env file, use process for .env, then key variable name
const secret = process.env.SECRET_KEY;
//refer to web token - package we installed 
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const util = require('util');


module.exports = {
    //CREATE
    createPet: (req, res) => {
        //get logged in users token to place as creator value for pet model
        const user = jwt.verify(req.cookies.usertoken, secret);
        //Mongoose create method using model.js to add new Pet to Pet collection in DB w/form data
        Pet.create({ ...req.body, creator: user })
            .then(newPet => {
                res.status(201).json({ pet: newPet })
                //setting API's response to requesting client
            })
            .catch(err => {
                console.log("create error", err)
                res.status(400).json(err)
            });
    },

    //READ ALL
    findAllPets: (req, res) => {
        Pet.find({})
            .then(allPets => {
                // console.log(allPets)
                res.json({ pets: allPets })
            })
            .catch(err => {
                console.log("findAll error", err)
                res.status(400).json(err)
            });
    },
    //READ ONE
    findOnePet: (req, res) => {
        Pet.findById(req.params.id)
            .then(onePet => {
                res.json({ pet: onePet });
            })
            .catch((err) => {
                console.log("findOne error", err);
                res.status(400).json(err)
            });
    },
    //UPDATE
    updatePet: (req, res) => {
        console.log("req.body", req.body)
        Pet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then(updatedPet => res.json({ pet: updatedPet }))
            .catch((err) => {
                console.log("update error", err);
                res.status(400).json(err)
            });
    },

    //DELETE
    deletePet: (req, res) => {
        Pet.findByIdAndDelete(req.params.id)
            .then(deletedPet => res.json(deletedPet))
            .catch((err) => {
                console.log("delete error", err);
                res.status(400).json(err)
            });
    },
    //get all user pet appointments
    getByUser: (req, res) => {
        const user = jwt.verify(req.cookies.usertoken, secret);
        Pet.find({ creator: user._id })
            // .populate('creator')
            .then(e => res.json(e))
            .catch(e => res.status(400).json({ message: 'problem finding obj by user', error: e }))
    },
    //add appt
    addAppointment: (req, res) => {
        console.log("req.body add appt", req.body)
        Pet.updateOne(
            { _id: req.params.id },
            {
                $push: { appointments: req.body }
            }
        )
            .then(updatedAppt => res.json(updatedAppt))
            .catch(err =>
                res.status(400).json(err))
    },
    deleteApptObj: (req, res) => {
        Pet.deleteOne({ _id: req.params.id })
            .then((result) => res.json({ result: result }))
            .catch((err) =>
                res.json({
                    message: "Something went wrong. Can't DELETE a list",
                    error: err,
                })
            );
    },
    // Method to delete an appointment from a pet's appointments array
    deleteAppointment: async function (req, res) {
        const petId = req.params.petId;
        const appointmentId = req.params.appointmentId;

        try {
            if (!mongoose.Types.ObjectId.isValid(petId) || !mongoose.Types.ObjectId.isValid(appointmentId)) {
                throw new Error('Invalid petId or appointmentId');
            }

            const pet = await Pet.findById(petId);

            if (!pet) {
                return res.status(404).json({ message: 'Pet not found' });
            }

            const appointment = pet.appointments.find(app => app._id.toString() === appointmentId);

            if (!appointment) {
                return res.status(404).json({ message: 'Appointment not found' });
            }

            pet.appointments.pull(appointment._id);
            await pet.save();

            return res.sendStatus(200);
        } catch (error) {
            console.log('Error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

