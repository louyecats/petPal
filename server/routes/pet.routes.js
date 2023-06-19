const PetController = require('../controllers/pet.controller');

module.exports = app => {
    // pets
    app.post('/api/pet', PetController.createPet);
    app.get('/api/pets', PetController.findAllPets);
    app.get('/api/pet/:id', PetController.findOnePet);
    app.patch('/api/pet/:id', PetController.updatePet);
    app.delete('/api/pet/:id', PetController.deletePet);
    app.put('/api/appt/:id', PetController.addAppointment);
    app.get("/api/appts", PetController.getByUser);
    app.delete('/appt/delete/:petId/:appointmentId', PetController.deleteAppointment);
}
