var con = require('./connection')
var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/register.html');
})

app.post('/', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var mno = req.body.mno;

    con.connect(function (error) {
        if (error) throw error;

        var sql = "INSERT INTO expenses(name, email, mno) VALUES ?";

        var value = [
            [name, email, mno]
        ];
        con.query(sql, [value], function (error, result) {
            if (error) throw error;
            res.redirect("/students")
            // res.send("expenses Register succesfuly" + result.insertId);
        });
    });
});

app.get('/students', function (req, res) {
    con.connect(function (error) {
        if (error) console.log(error);

        var sql = "select * from expenses";

        con.query(sql, function (error, result) {
            if (error) console.log(error);
            res.render(__dirname + "/students", { expenses: result })
        });
    })
})
app.listen(5000);

