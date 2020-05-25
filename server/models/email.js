
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const emailSchema = new schema({
    id: String, 
    recipientEmailAddress: String,
    recipientName: String, 
    subject: String, 
    body: String,
    from: String,
});




module.exports = mongoose.model('email', emailSchema);