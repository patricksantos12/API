import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import { carRouter } from "./routes/carRouter";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("api/v1/platonix/", carRouter);

app.listen(process.env.PORT, () => {
    console.log("Platonix API is running at", process.env.PORT);
});