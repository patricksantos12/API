module.exports = app => {
    const platonixUser = require("../controllers/platonixUser.controller");

    var router = require("express").Router();

    // create new user
    // router.post("/create", platonixUser.create);

    // get all users
    router.get("/search/all", platonixUser.findAllUsers);

    // update users

    // login

    app.use('/api/v1/platonix/user', router);
}