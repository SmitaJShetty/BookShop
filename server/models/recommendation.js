
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const recommendationSchema = new schema({
    id: String, 
    bookId: String,
});

module.exports = mongoose.model('recommendation', recommendationSchema);