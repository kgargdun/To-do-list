const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
let items = [];
let workItems = [];
//
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(requst, response) {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",

  }

  let day = today.toLocaleDateString("en-US", options);


  response.render("list", {
    listTitle: day,
    newListItems: items,
  });

});


app.post("/", function(req, res) {
console.log(req.body.button);
  let item = req.body.newItem;
  if (req.body.button === "Work list") {
    workItems.push(item);
    res.redirect("/work");

  } else {

    items.push(item);
    res.redirect("/");
  }

})

app.get("/work", function(requst, response) {

  response.render("list", {
    listTitle: "Work list",
    newListItems: workItems,
  });

});


app.get("/con", function(requst, response) {

  response.render("contact");

});




app.listen(3000, function() {
  console.log("listening at port 3000");

});
