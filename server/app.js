const express = require('express');
const schema = require('./schema.js');
const graphQLHttp = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

mongoose.connect("mongodb+srv://test123:<PasswordHere>@cluster0-gvlfa.mongodb.net/test?retryWrites=true&w=majority");
mongoose.connection.once('open', ()=>{
    console.log("connected to mongodb");
});

app.use('/graphql', graphQLHttp({
    schema, 
    graphiql:true,
}));

app.listen(4000, ()=>{
    console.log('listening on requests on port 4000');
})
