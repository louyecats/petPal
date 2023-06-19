const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [1, "Name must be at least 1 character"],
        maxlength: [255, "Name cannot be more than 255 characters"]
    },
    birthday: {
        type: Date,
        required: [true, "Birthday is required"]
    },
    age: {
        type: Number,
        required: [true, "Age is required"]
    },
    breed: {
        type: String,
        required: [true, "Breed is required, can write unknown or mix."],
        minlength: [1, "Breed must be at least 1 character"],
        maxlength: [100, "Breed cannot be more than 100 characters"]
    },
    weight: {
        type: Number,
        required: [true, "Weight is required"], 
        min: [0.1, "Weight must be at least 0.1"]
    },
    allergies: {
        type: String,
        required: [true, "Alergies is required. Enter - or n/a if needed"],
        minlength: [1, "Allergies must be at least 1 character"],
        maxlength: [255, "Allergies cannot be more than 255  characters"]
    },
    illnesses: {
        type: String,
        required: [false],
        maxlength: [255, "Illnesses cannot exceed 255 characters"],
        default: "n/a"
    },
    medications: {
        type: String,
        required: [false],
        maxlength: [255, "Medications cannot exceed 255 characters"],
        default: "n/a"
    },
    vaccinations: {
        type: String,
        required: [false],
        maxlength: [255, "Vaccinations cannot exceed 255 characters"],
        default: "n/a"

    },
    surgeries: {
        type: String,
        required: [false],
        maxlength: [255, "Surgeries cannot exceed 255 characters"],
        default: "n/a"
    },
    notes: {
        type: String,
        required: [false],
        default: "None yet!"

    },
    reminders: {
        type: Array,
        required: [false]
    },
    appointments: [
        {
            apptDateTime: {
                type: Date, 
                required: [false]
            },
            apptReason: {
                type: String,
                required: [false]
            },
            apptOther: {
                type: String,
                required: [false]
            }
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

}, {timestamps: true})

const Pet = mongoose.model('Pet', PetSchema);
//connect controller to model, creates collection 'Pet'
module.exports = Pet;

/* USER JOIN
createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
}
*/
