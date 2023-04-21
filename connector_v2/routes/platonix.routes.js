module.exports = app => {
    const platonix = require("../controllers/platonix.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", platonix.create);
  
    // Retrieve all platonix
    router.get("/", platonix.findAll);
  
    // Retrieve all published platonix
    router.get("/registered", platonix.findAllRegistered);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", platonix.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", platonix.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", platonix.delete);
  
    // // Delete all platonix
    // router.delete("/", platonix.deleteAll);
  
    app.use('/api/v1/platonix', router);
  };