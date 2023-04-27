const sql = require("./db.js");

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
  });git 
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

// car maker
Platonix.getAll = (carMaker, result) => {
  let query = "SELECT * FROM platonixApp";

  if (carMaker) {
    query += ` WHERE carMaker LIKE '%${carMaker}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("car maker: ", res);
    result(null, res);
  });
};

Platonix.getAllRegistered = result => {
   {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("car registered: ", res);
    result(null, res);
  };
};

// Platonix.updateById = (id, tutorial, result) => {
//   sql.query(
//     "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
//     [tutorial.title, tutorial.description, tutorial.published, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Tutorial with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated tutorial: ", { id: id, ...tutorial });
//       result(null, { id: id, ...tutorial });
//     }
//   );
// };

// Tutorial.remove = (id, result) => {
//   sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Tutorial with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted tutorial with id: ", id);
//     result(null, res);
//   });
// };

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