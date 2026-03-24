import express from "express";
import configViewEngine from "./config/viewEngine";
import initwebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from 'body-parser';
//import connection from "./config/connectDB";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";

const app = express();
const PORT = process.env.PORT || 8080;

//config CORS
configCors(app);


//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config view engine
configViewEngine(app);

//test connection db
//connection();

//init web routes
initwebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port: " + PORT);
})