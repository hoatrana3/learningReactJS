var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(3000);

var nodes = ["Android", "iOS", "Windows"];

app.get("/", function(req, res) {
    res.render("home");
});

app.post("/getNodes", function (req, res) {
    res.send(nodes);
});