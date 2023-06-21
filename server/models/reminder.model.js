const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
    reminderDate: {
        type: Date
    },
    description: {
        type:  String,
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }
}, {timestamps: true});

const Reminder = mongoose.model("Reminder", ReminderSchema);
module.exports = Reminder;
