require('dotenv').config()
const express = require("express");
const cors = require("cors");
const database = require('./src/config/database')

const app = express();
const APP_PORT = process.env.APP_PORT || 8000;

database.connect()

var corsOptions = {
    origin: `http://localhost:${APP_PORT}`,
    methods: "GET,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello World." });
});

require('./src/config/routes')(app)

// set port, listen for requests
app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}.`);
});