import express, {Request, Response} from "express";
import { Platonix, PlatonixApp} from "../types/platonix";
import * as carPlatonix from "../model/platonixAppInsert";


const carRouter = express.Router();

carRouter.post("/", async (req: Request, res: Response) => {
    const newCarRegister: Platonix = req.body;
    carPlatonix.create(newCarRegister, (err: Error, platonixID: number) => {
        if(err) {
            return res.status(500).json({
                "message": err.message
            });
        }
        res.status(200).json({
            "platonixID": platonixID
        })
    });
});

export {carRouter};