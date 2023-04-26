const PlatonixUser = require('../models/platonixUser.model');

// Retrieve all platonixs user from the database (with condition).
exports.findAllUsers = (req, res) => {
    const platonixUser = req.query.platonixUser;
  
    platonixUser.getAllUser(platonixUser, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving all  users."
        });
      else res.send(data);
    });
  };