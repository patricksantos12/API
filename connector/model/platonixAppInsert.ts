import { Platonix } from "../types/platonix";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";


export const create = (car: Platonix, callback: Function) => {
    const queryString = "INSERT INTO platonixApp (platonixID, plateNumber, carRegistrationStatus, carColor, carMaker, carModel, carCityLocation) VALUES (?, ?, ?, ?, ?, ?, ?)"

        db.query(
            queryString,
            [car.platonixID, car.plateNumber, car.carRegistrationStatus, car.carColor, car.carMarker, car.carModel, car.carCityLocation],

            (err, result) => {
                if (err) {callback(err)};

                const insertId = (<OkPacket> result).insertId;
                callback(null, insertId);
            }
        );
}