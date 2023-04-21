"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const db_1 = require("../db");
const create = (car, callback) => {
    const queryString = "INSERT INTO platonixApp (platonixID, plateNumber, carRegistrationStatus, carColor, carMaker, carModel, carCityLocation) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db_1.db.query(queryString, [car.plateNumber, car.carRegistrationStatus, car.carColor, car.carMarker, car.carModel, car.carCityLocation], (err, result) => {
        if (err) {
            callback(err);
        }
        ;
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
