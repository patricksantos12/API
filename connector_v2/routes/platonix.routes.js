module.exports = app => {
    const platonix = require("../controllers/platonix.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/addVehicle/", platonix.create);
  
    // Retrieve all platonix
    router.get("/search/", platonix.findAll);
  
    // Retrieve all published platonix
    router.get("/search/registered", platonix.findAllRegistered);
  
    // Retrieve all published platonix
    router.get("/search/unregistered", platonix.findAllUnRegistered);

    // Retrieve a single Tutorial with id
    router.get("/search/:id", platonix.findOne);

    // router.get("/search/:carMaker", platonix.findSpecific);
  
    // // Update a Tutorial with id
    // router.put("/:id", platonix.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", platonix.delete);
  
    // // Delete all platonix
    // router.delete("/", platonix.deleteAll);
  
    app.use('/api/v1/platonix', router);
  };