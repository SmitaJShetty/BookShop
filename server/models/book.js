
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookSchema = new schema({
    id: String,
    name: String,
    authorId: String, 
    genre: String
});

module.exports = mongoose.model('book', bookSchema);