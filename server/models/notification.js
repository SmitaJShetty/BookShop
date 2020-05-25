
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const notificationSchema = new schema({
    id: String,
    name: String,
    recipientEmailAddress: String, 
});

module.exports = mongoose.model('notification', notificationSchema);