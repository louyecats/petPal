const ReminderController = require("../controllers/reminder.controller");

module.exports = app => {
    app.get("/api/reminders", ReminderController.findAllReminders);
    app.put("/api/reminders/:id", ReminderController.updateReminder);
    app.post("/api/reminders", ReminderController.createReminder);
    app.delete("/api/reminders/:id", ReminderController.deleteReminder);
}
