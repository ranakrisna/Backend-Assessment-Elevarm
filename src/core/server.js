require('dotenv').config()
const express = require("express");
const cors = require("cors");
const database = require('./src/config/database')

const Router = require('express-group-router');
const router = new Router();

const app = express();
const APP_PORT = process.env.APP_PORT || 8000;

database.connect()

var corsOptions = {
    origin: `http://localhost:${APP_PORT}`,
    methods: "GET,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
    res.json({ message: "Hello World." });
});
require("@elevarm/user-modules/src/config/routes")(router)
let listRoutes = router.init();
app.use(listRoutes);

app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}.`);
});