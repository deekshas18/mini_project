require('./db/mongoose');
const express = require('express');
const app = express();

const env = require('dotenv');
env.config({path:__dirname + '/env/.env'});
const port = process.env.PORT;

app.listen(port,() => {
    console.log("server running on port ", port);
})