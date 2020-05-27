import {SubscriptionServer} from 'subscriptions-transport-ws';
import { createServer } from 'http';

const express = require('express');
const schema = require('./schema.js');
const graphQLHttp = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

mongoose.connect("mongodb+srv://test123:q8qWhZvNO5RNJkaZ@cluster0-gvlfa.mongodb.net/test?retryWrites=true&w=majority");
mongoose.connection.once('open', ()=>{
    console.log("connected to mongodb");
});

app.use('/graphql', graphQLHttp({
    schema, 
    graphiql:true,
}));

let ws =createServer(app);
ws.listen(4000, ()=>{
    console.log('listening on requests on port 4000');
    new SubscriptionServer({
        execute, 
        subscribe, 
        schema
    }, {
        server: ws,
        path: '/subscriptions'
    });
})


