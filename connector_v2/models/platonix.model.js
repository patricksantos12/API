const sql = require("./db");

// constructor
const Platonix = function(platonix) {
  this.plateNumber = platonix.plateNumber;
  this.carRegistrationStatus = platonix.carRegistrationStatus;
  this.carColor = platonix.carColor;
  this.carMaker = platonix.carMaker;
  this.carModel = platonix.carModel;
  this.carCityLocation = platonix.carCityLocation;
};

Platonix.create = (newCar, result) => {
  sql.query("INSERT INTO platonixApp SET ?", newCar, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("car created: ", { id: res.insertId, ...newCar });
    result(null, { id: res.insertId, ...newCar });
  });
};

Platonix.findById = (id, result) => {
  sql.query(`SELECT * FROM platonixApp WHERE platonixID = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("car found : ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found car with the id
    result({ kind: "not_found" }, null);
  });
};

// platenumber
Platonix.getByPlateNo = (plateNumber, result) => {
  sql.query(`SELECT * FROM platonixApp WHERE plateNumber = "${plateNumber}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("car found : ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found car with the plateNumber
    result({ kind: "not_found" }, null);
  });
};

// Search
Platonix.getAll = (carMaker, result) => {
  let query = "SELECT * FROM platonixApp";

  // if (carMaker) {
  //   query += ` WHERE carMaker LIKE '%${carMaker}%'`;
  // }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("err: ", res);
    result(null, res);
  });
};

Platonix.getAllRegistered = result => {
  sql.query("SELECT * from platonixApp where `carRegistrationStatus` like 'REGISTERED'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("car registered: ", res);
    result(null, res);
  });
};

Platonix.getAllUnRegistered = result => {
  sql.query("SELECT * from platonixApp where `carRegistrationStatus` like 'UNREGISTERED'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("car registered: ", res);
    result(null, res);
  });
};

Platonix.updateById = (platonixID, platonix, result) => {
  sql.query(
    "UPDATE platonixApp SET plateNumber = ?, carRegistrationStatus = ?, carColor = ?, carMaker = ?, carModel = ?, carCityLocation = ? WHERE platonixID = ?",
    [platonix.plateNumber, platonix.carRegistrationStatus, platonix.carColor, platonix.carMaker, platonix.carModel, platonix.carCityLocation, platonixID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found cars with the platonixID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated car: ", { id: platonixID, ...platonix });
      result(null, { id: platonixID, ...platonix });
    }
  );
};

Platonix.remove = (platonixID, result) => {
  sql.query("DELETE FROM platonixApp WHERE id = ?", platonixID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted cars with id: ", platonixID);
    result(null, res);
  });
};

// Tutorial.removeAll = result => {
//   sql.query("DELETE FROM tutorials", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} tutorials`);
//     result(null, res);
//   });
// };

module.exports = Platonix;