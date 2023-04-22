module.exports = app => {
    const platonix = require("../controllers/platonix.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/addVehicle/", platonix.create);
  
    // Retrieve all platonix
    router.get("/search/all/", platonix.findAll);
  
    // Retrieve all published platonix
    router.get("/search/status/registered", platonix.findAllRegistered);
  
    // Retrieve all published platonix
    router.get("/search/status/unregistered", platonix.findAllUnRegistered);

    // Retrieve a single Tutorial with id
    router.get("/search/id/:id", platonix.findOne);

    // Retrieve a single Tutorial with id
    router.get("/search/plateno/:plateNumber", platonix.findPlateNo);
  
    // // Update a Tutorial with id
    // router.put("/:id", platonix.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", platonix.delete);
  
    // // Delete all platonix
    // router.delete("/", platonix.deleteAll);
  
    app.use('/api/v1/platonix', router);
  };