const Reminder = require("../models/reminder.model");

module.exports = {
    //CREATE
    createReminder: (req, res) => {
        const petId = req.params.id ; //get selected petID from form
        Reminder.create({...req.body, pet: petId})
            .then(newReminder => {
                res.status(201).json({ reminder: newReminder })
                //setting API's response to requesting client
            })
            .catch(err => {
                console.log("reminder create error", err.data, req.body)
                res.status(400).json(err)
            });
    },
    //READ ALL
    findAllReminders: (req, res) => {
        Reminder.find()
        .then(allReminders => {
            // console.log(allReminders)
            res.json({ reminders: allReminders })
        })
        .catch(err => {
            console.log("reminder findAll error", err)
            res.status(400).json(err)
        });
    },

    //UPDATE
    updateReminder: (req, res) => {
        // console.log("req.body", req.body)
        Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(updatedReminder => res.json({ reminder: updatedReminder }))
            .catch((err) => {
                console.log("reminder update error", err);
                res.status(400).json(err)
            });
    },

    //DELETE
    deleteReminder: (req, res) => {
        // const petId = req.params.petId;
        // const remindertId = req.params.reminderId;
        Reminder.deleteOne({ _id: req.params.id })
            .then((result) => res.json({ result: result }))
            .catch((err) => {
                console.log("reminder update error", err);
                res.status(400).json(err)
            });
    }
}
