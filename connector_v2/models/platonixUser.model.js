const sql = require('./db');

// constructor
const PlatonixUser = function(platonixUser) {
    this.platonixUser = platonixUser.platonixUser;
    this.platonixPass = platonixUser.platonixPass;
  };
  


PlatonixUser.findById = (id, result) => {
    sql.query(`SELECT * FROM platonixAppUser WHERE userID = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("user found : ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found car with the id
      result({ kind: "not_found" }, null);
    });
  };

  
PlatonixUser.getAllUser = (platonixUser, result) => {
    let query = "SELECT * FROM platonixAppUser";
  
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
  