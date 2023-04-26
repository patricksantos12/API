module.exports = app => {
    const platonix = require("../controllers/platonix.controller.js");
  
    var router = require("express").Router();
  
    // Create a new platonix
    router.post("/addVehicle/", platonix.create);
  
    // Retrieve all platonix
    router.get("/search/all/", platonix.findAll);
  
    // Retrieve all published platonix
    router.get("/search/status/registered", platonix.findAllRegistered);
  
    // Retrieve all published platonix
    router.get("/search/status/unregistered", platonix.findAllUnRegistered);

    // Retrieve a single platonix with id
    router.get("/search/id/:id", platonix.findOne);

    // Retrieve a single platonix with id
    router.get("/search/plateno/:plateNumber", platonix.findPlateNo);
  
    // // Update a platonix with id
    router.put("/update/:id", platonix.update);
  
    // Delete a platonix with id
    router.delete("/remove/:id", platonix.delete);
  
    // // Delete all platonix
    // router.delete("/", platonix.deleteAll);
  
    app.use('/api/v1/platonix/vehicle', router);
  };