var mysql = require("mysql2");


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "7999Ch@ndu",
    database: "ankit"
})
module.exports = con; 