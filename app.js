const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://admin-kaustubhgarg:3108fetcha%23@cluster0-aegjo.mongodb.net/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const itemsSchema = new mongoose.Schema({
  name: String,
})
const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({
  name: "Welcome to Do list!",
})
const defaultItems = [item1];

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
})

const List = mongoose.model("List", listSchema);






app.get("/", function(requst, response) {

  Item.find({}, function(err, results) {
    if (results.length === 0) {
      console.log("Empty");
      Item.insertMany(defaultItems, function(err) {
        if (err)
          console.log(err);
        else
          console.log("Successful");
      })
      response.redirect("/");
    } else {
      response.render("list", {
        listTitle: "Today",
        newListItems: results,
      });
    }
  })
});


app.post("/", function(req, res) {

  const listName = req.body.button;
  const item = req.body.newItem;
  const itemAdded = new Item({
    name: item,
  })

  if (req.body.button === "Today") {
    if(item=="Kaustubh")
    {
      res.render("me");
    }
    else
    {
      itemAdded.save();
      res.redirect("/");
    }

  } else {
    List.findOne({
      name: listName
    }, function(err, foundList) {
      console.log(listName);
      console.log(foundList.name);
      console.log(foundList.items);
      myArray = [];
      myArray = foundList.items;
      myArray.push(itemAdded);
      console.log(myArray);
      foundList.items = myArray;
      foundList.save();
      res.redirect("/" + listName);
    })
  }


})




app.post("/delete", function(req, res) {

  console.log(req.body);
  const idDeleted = req.body.checkbox;
  const listName = req.body.listName;
  if (listName == "Today") {
    Item.deleteOne({
      _id: idDeleted
    }, function(err) {
      if (err)
        console.log(err);

    });
    res.redirect("/");
  } else {
    List.findOneAndUpdate({
        name: listName
      }, {
        $pull: {
          items: {
            _id: idDeleted
          }
        }
      },
      {
        useFindAndModify:false,
      },

      function(err, result) {
        if (err)
          console.log(err);
      });
    res.redirect("/" + listName);

  }
})









app.get("/:customListName", function(req, res) {
  const customListName = req.params.customListName;
  List.find({
    "name": customListName
  }, function(err, results) {

    if (err)
      console.log(err)
    else {
      if (results.length === 0) {

        const list = new List({
          name: customListName,
          items: defaultItems,
        })
        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render("list", {
          listTitle: customListName,
          newListItems: results[0].items,
        });
      }
    }
  });
});



app.get("/con", function(requst, response) {

  response.render("contact");

});




app.listen(3000, function() {
  console.log("listening at port 3000");

});
