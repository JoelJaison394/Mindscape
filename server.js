const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const journelRoute = require('./routes/journals')


const app = express();

app.use(cors());


app.use(express.json());

app.use("/api",journelRoute);

mongoose.connect("mongodb+srv://joeljaison:joel2003@cluster0.7qhxzqu.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("connect to database");
    app.listen(8000,() => {
        console.log('listening on http://localhost:8000');
    })
}).catch(err => {console.error(err)});