
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const authorSchema = new schema({
    id: String,
    name: String, 
    age: String,
    isbn: String
});

module.exports = new mongoose.model('Author', authorSchema);