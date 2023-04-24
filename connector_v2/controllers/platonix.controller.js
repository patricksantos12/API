const Platonix = require("../models/platonix.model.js");

// Create and Save a new platonix
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a platonix
  const platonix = new Platonix({
    plateNumber: req.body.plateNumber,
    carRegistrationStatus: req.body.carRegistrationStatus,
    carColor: req.body.carColor,
    carMaker: req.body.carMaker,
    carModel: req.body.carModel,
    carCityLocation: req.body.carCityLocation,
  });

  // Save platonix in the database
  Platonix.create(platonix, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding cars."
      });
    else res.send(data);
  });
};

// Retrieve all platonixs from the database (with condition).
exports.findAll = (req, res) => {
  const plateNumber = req.query.plateNumber;

  Platonix.getAll(plateNumber, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all plate numbers."
      });
    else res.send(data);
  });
};
// Find a single Car by Id
exports.findOne = (req, res) => {
    Platonix.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found car with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving car with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published platonixs
exports.findAllRegistered = (req, res) => {
  Platonix.getAllRegistered((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving registered."
      });
    else res.send(data);
  });
};

// find all published platonixs
exports.findAllUnRegistered = (req, res) => {
  Platonix.getAllUnRegistered((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving registered."
      });
    else res.send(data);
  });
};

exports.findPlateNo = (req, res) => {
  Platonix.getByPlateNo(req.params.plateNumber, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found car with plate no ${req.params.plateNumber}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving car with plate no " + req.params.plateNumber
        });
      }
    } else res.send(data);
  });
}

// Update a platonix identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Platonix.updateById(
    req.params.id,
    new Platonix(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found platonix with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating platonix with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a platonix with the specified id in the request
exports.delete = (req, res) => {
  Platonix.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found car with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete car with id " + req.params.id
        });
      }
    } else res.send({ message: `car was deleted successfully!` });
  });
};

// // Delete all platonixs from the database.
// exports.deleteAll = (req, res) => {
//   platonix.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all platonixs."
//       });
//     else res.send({ message: `All platonixs were deleted successfully!` });
//   });
// };