import express from "express";
import configViewEngine from "./configs/viewEngine";
import initwebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 8080;

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config view engine
configViewEngine(app);

//init web routes
initwebRoutes(app);

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port: " + PORT);
})